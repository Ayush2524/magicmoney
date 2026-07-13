// Copyright (c) 2025-2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from '@tanstack/react-query'
import { getWalletSdk } from '@lib/wallet-client'
import { useConnection } from '../contexts/ConnectionContext'
import { queryKeys } from './query-keys'
import {
    WalletSDKUtilitiesPlugin,
    WalletSDKUtilitiesPluginName,
} from '@lib/utilities-wallet-sdk-plugin'

export const useWalletSdk = () => {
    const { status, wallet } = useConnection()
    const isConnected = status?.connection?.isConnected ?? false

    const walletSdkQuery = useQuery({
        queryKey: queryKeys.walletSdk.forConnection(wallet?.partyId),
        enabled: isConnected && !!wallet,
        staleTime: Infinity,
        gcTime: 0,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        retry: false,
        queryFn: async () => {
            const sdk = await getWalletSdk()

            const pluginSDK = sdk.registerPlugins({
                [WalletSDKUtilitiesPluginName]: WalletSDKUtilitiesPlugin,
            })

            return pluginSDK
        },
    })

    return {
        sdk: walletSdkQuery.data!,
        isLoading: walletSdkQuery.isLoading || walletSdkQuery.isFetching,
        error:
            walletSdkQuery.error instanceof Error
                ? walletSdkQuery.error.message
                : walletSdkQuery.error
                  ? String(walletSdkQuery.error)
                  : undefined,
        refresh: () => {
            void walletSdkQuery.refetch()
        },
    }
}
