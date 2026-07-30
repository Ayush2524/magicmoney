// Copyright (c) 2025-2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
    // Served at themagicmoney.in/wallet/ via a rewrite from the landing page.
    base: '/wallet/',
    plugins: [
        tsconfigPaths({ projects: ['tsconfig.app.json'] }),
        devtools(),
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react(),
    ],
    build: {
        commonjsOptions: {
            include: [/node_modules/],
            transformMixedEsModules: true,
        },
    },
    server: {
        port: 8082,
        proxy: {
            // The Canton participant's raw Ledger JSON API doesn't send
            // CORS headers, so browser requests to it directly are blocked.
            // Proxying it through the dev server makes requests same-origin.
            '/wallet/ledger-api': {
                target: 'http://localhost:2975',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/wallet\/ledger-api/, ''),
            },
            // The Keycloak realm's token endpoint doesn't send CORS headers
            // either, so the browser's client_credentials token POST fails
            // outright. Proxy the whole auth host through the dev server,
            // and rewrite the OIDC discovery document's absolute endpoint
            // URLs to point back at this same proxy path, so the follow-up
            // token request also stays same-origin instead of going direct.
            '/wallet/auth-proxy': {
                target: 'https://auth.3-7-148-244.sslip.io',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/wallet\/auth-proxy/, ''),
                selfHandleResponse: true,
                configure: (proxy) => {
                    proxy.on('proxyRes', (proxyRes, _req, res) => {
                        const chunks: Buffer[] = []
                        proxyRes.on('data', (chunk) => chunks.push(chunk))
                        proxyRes.on('end', () => {
                            const body = Buffer.concat(chunks).toString('utf-8')
                            const rewritten = body.replaceAll(
                                'https://auth.3-7-148-244.sslip.io',
                                '/wallet/auth-proxy'
                            )
                            Object.entries(proxyRes.headers).forEach(
                                ([key, value]) => {
                                    if (
                                        value !== undefined &&
                                        key.toLowerCase() !== 'content-length'
                                    ) {
                                        res.setHeader(key, value)
                                    }
                                }
                            )
                            res.end(rewritten)
                        })
                    })
                },
            },
        },
    },
})
