// Copyright (c) 2025-2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { createContext, useContext } from 'react'
import type { LocalWallet } from '@lib/wallet-client'

export type LocalAccount = {
    partyId: string
    hint: string
    primary: boolean
}

export type ConnectionStatus = {
    connection: { isConnected: boolean }
    network: { networkId: string }
}

type Connection = {
    initialized: boolean
    status?: ConnectionStatus
    accounts: LocalAccount[]
    wallet?: LocalWallet
    error?: string

    // Creates a wallet on first use, or loads the previously-created one from
    // local storage.
    connect: (hint?: string) => void
    // Clears the in-memory session only; the key stays in local storage.
    disconnect: () => void
    // Destructive: permanently deletes the local key. There is no recovery.
    forgetWallet: () => void
}

export const ConnectionContext = createContext<Connection | undefined>(
    undefined
)

export const useConnection = () => {
    const ctx = useContext(ConnectionContext)
    if (!ctx)
        throw new Error('useConnection must be used within ConnectionContext')
    return ctx
}
