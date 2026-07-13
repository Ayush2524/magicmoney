// Copyright (c) 2025-2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react'
import {
    configureWalletClient,
    createWallet,
    loadStoredWallet,
    forgetStoredWallet as forgetStoredWalletKey,
    type LocalWallet,
} from '@lib/wallet-client'
import { clear as clearResolvedServices } from '../services/resolve'
import { usePortfolioConfig } from '@contexts/PortfolioConfigContext'
import {
    ConnectionContext,
    type ConnectionStatus,
    type LocalAccount,
} from './ConnectionContext'

const DEFAULT_HINT = 'magicmoney-user'

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const config = usePortfolioConfig()
    const [initialized, setInitialized] = useState(false)
    const [wallet, setWallet] = useState<LocalWallet | undefined>()
    const [error, setError] = useState<string | undefined>()

    useEffect(() => {
        configureWalletClient(config)
    }, [config])

    // Auto-load a previously-created wallet from local storage on mount.
    useEffect(() => {
        const stored = loadStoredWallet()
        if (stored) {
            setWallet(stored)
        }
        setInitialized(true)
    }, [])

    const connect = useCallback(
        (hint?: string) => {
            const stored = loadStoredWallet()
            if (stored) {
                clearResolvedServices()
                setWallet(stored)
                setError(undefined)
                return
            }

            createWallet(hint ?? DEFAULT_HINT)
                .then((created) => {
                    clearResolvedServices()
                    setWallet(created)
                    setError(undefined)
                })
                .catch((err: unknown) => {
                    const message =
                        err instanceof Error ? err.message : String(err)
                    setError(message)
                })
        },
        []
    )

    const disconnect = useCallback(() => {
        clearResolvedServices()
        setWallet(undefined)
        setError(undefined)
    }, [])

    const forgetWallet = useCallback(() => {
        forgetStoredWalletKey()
        clearResolvedServices()
        setWallet(undefined)
        setError(undefined)
    }, [])

    const status: ConnectionStatus | undefined = wallet
        ? {
              connection: { isConnected: true },
              network: { networkId: new URL(config.ledgerApi.baseUrl).host },
          }
        : undefined

    const accounts: LocalAccount[] = wallet
        ? [{ partyId: wallet.partyId, hint: wallet.hint, primary: true }]
        : []

    return (
        <ConnectionContext.Provider
            value={{
                initialized,
                status,
                accounts,
                wallet,
                error,
                connect,
                disconnect,
                forgetWallet,
            }}
        >
            {children}
        </ConnectionContext.Provider>
    )
}
