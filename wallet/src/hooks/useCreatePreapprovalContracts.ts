// Copyright (c) 2025-2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { useMutation } from '@tanstack/react-query'
import type { AssetBody } from '@canton-network/wallet-sdk'
import type { PartyId } from '@canton-network/core-types'
import { submitCommand } from '@lib/wallet-client'
import { WalletSDKUtilitiesPluginName } from '@lib/utilities-wallet-sdk-plugin'
import { useWalletSdk } from '@hooks/useWalletSdk'

type WalletSdkWithUtilities = ReturnType<typeof useWalletSdk>['sdk']

type CreatePreapprovalContractsInput = {
    sdk: WalletSdkWithUtilities
    receiver: PartyId
    operator: PartyId
    instrumentAdmin: PartyId
    assets: AssetBody[]
}

export type CreatePreapprovalContractsArgs = Omit<
    CreatePreapprovalContractsInput,
    'sdk'
>

const createPreapprovalContracts = async ({
    sdk,
    receiver,
    operator,
    instrumentAdmin,
    assets,
}: CreatePreapprovalContractsInput): Promise<void> => {
    const [preapprovalCommand, disclosedContracts] = sdk[
        WalletSDKUtilitiesPluginName
    ].preapprovalTransfer.create({
        receiver,
        operator,
        instrumentAdmin,
        instrumentAllowances: assets.map((asset) => ({
            id: asset.id,
        })),
    })

    await submitCommand({
        commands: [preapprovalCommand],
        actAs: [receiver],
        disclosedContracts,
    })
}

export const useCreatePreapprovalContracts = () => {
    const { sdk } = useWalletSdk()

    return useMutation({
        mutationFn: (args: CreatePreapprovalContractsArgs) => {
            if (!sdk) {
                throw new Error('Wallet SDK is not ready')
            }

            return createPreapprovalContracts({
                sdk,
                ...args,
            })
        },
    })
}
