// Copyright (c) 2025-2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
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
            '/ledger-api': {
                target: 'http://localhost:2975',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/ledger-api/, ''),
            },
        },
    },
})
