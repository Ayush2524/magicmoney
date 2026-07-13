// Copyright (c) 2025-2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    HttpUrl,
    PartyId,
    PARTY_ID_ERROR_MESSAGE,
} from '@canton-network/core-types'
import { z } from 'zod'

const optionalStringSchema = () => z.string().trim().optional()

export const optionalPartyIdSchema = z
    .string()
    .trim()
    .refine(
        (value) => value === '' || PartyId.safeParse(value).success,
        PARTY_ID_ERROR_MESSAGE
    )
    .transform((value) => (value === '' ? undefined : value))
    .optional()

export const optionalPartyIdInputSchema = z
    .string()
    .trim()
    .refine(
        (value) => value === '' || PartyId.safeParse(value).success,
        PARTY_ID_ERROR_MESSAGE
    )

export const registryConfigSchema = z
    .object({
        name: optionalStringSchema(),
        partyId: optionalPartyIdSchema,
        url: HttpUrl,
    })
    .strict()

// Auth for the direct ledger connection (no Wallet Gateway in between).
// Kept as a loose passthrough rather than a full discriminated union so we
// don't have to keep this in lockstep with @canton-network/core-wallet-auth's
// TokenProviderConfig type; it's cast to that type where used.
export const tokenProviderConfigSchema = z.looseObject({
    method: z.enum(['static', 'self_signed', 'client_credentials']),
})

export const portfolioConfigSchema = z
    .object({
        ledgerApi: z
            .object({
                // Absolute URL, or a path relative to the app's own origin
                // (e.g. "/ledger-api" via a dev-server/reverse-proxy rewrite
                // — needed because the raw Ledger JSON API doesn't send CORS
                // headers, so cross-origin browser requests to it fail).
                baseUrl: z.string().min(1),
            })
            .strict(),
        auth: tokenProviderConfigSchema,
        amulet: z
            .object({
                validatorUrl: HttpUrl,
                registry: HttpUrl,
            })
            .strict(),
        token: z
            .object({
                validatorUrl: HttpUrl,
                registries: z.array(registryConfigSchema),
            })
            .strict(),
    })
    .strict()

export const registryFormSchema = z.object({
    partyId: optionalPartyIdInputSchema,
    registryUrl: HttpUrl,
})

export type PortfolioRegistryConfig = z.infer<typeof registryConfigSchema>
export type PortfolioConfig = z.infer<typeof portfolioConfigSchema>
export type RegistryFormData = z.infer<typeof registryFormSchema>
