// Local, self-custody wallet client.
//
// This app talks directly to a Canton participant's Ledger API (no Wallet
// Gateway server in between). Keys are generated in the browser and held in
// localStorage; the SDK instance and ledger provider are process-wide
// singletons keyed off the loaded network config.

import { pino } from 'pino'
import * as walletSdk from '@canton-network/wallet-sdk'
import { AuthTokenProvider } from '@canton-network/core-wallet-auth'
import type { LedgerTypes } from '@canton-network/core-ledger-client-types'
import type { PortfolioConfig } from './schemas'

const logger = pino({ name: 'magicmoney-wallet', level: 'info' })

const STORAGE_KEY = 'magicmoney.wallet.v1'

export type LocalWallet = {
    partyId: string
    publicKey: string
    privateKey: string
    hint: string
}

export const loadStoredWallet = (): LocalWallet | null => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try {
        return JSON.parse(raw) as LocalWallet
    } catch {
        return null
    }
}

const saveWallet = (wallet: LocalWallet) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wallet))
}

// Deletes the locally-held key. There is no recovery for a self-custody
// wallet once this is called and the party is unreachable again.
export const forgetStoredWallet = () => {
    localStorage.removeItem(STORAGE_KEY)
}

const deriveScanApiUrl = (registryUrl: string): URL => {
    const url = new URL(registryUrl)
    url.pathname = '/api/scan'
    url.search = ''
    url.hash = ''
    return url
}

const createSdk = (config: PortfolioConfig) => {
    const sdkOptions = {
        ledgerProvider: getLedgerProvider(),
        token: {
            validatorUrl: config.token.validatorUrl,
            auth: config.auth as walletSdk.TokenProviderConfig,
            registries: config.token.registries.map((r) => r.url),
        },
        amulet: {
            validatorUrl: config.amulet.validatorUrl,
            scanApiUrl: deriveScanApiUrl(config.amulet.registry),
            auth: config.auth as walletSdk.TokenProviderConfig,
            registryUrl: config.amulet.registry,
        },
    } as const
    return walletSdk.SDK.create<LedgerTypes, typeof sdkOptions>(sdkOptions)
}

let currentConfig: PortfolioConfig | undefined
let ledgerProviderSingleton: walletSdk.LedgerProvider | undefined
let sdkPromise: ReturnType<typeof createSdk> | undefined

export const configureWalletClient = (config: PortfolioConfig) => {
    if (currentConfig === config) return
    currentConfig = config
    ledgerProviderSingleton = undefined
    sdkPromise = undefined
}

export const getAccessTokenProvider = (): AuthTokenProvider => {
    if (!currentConfig) throw new Error('Wallet client is not configured')
    return new AuthTokenProvider(
        currentConfig.auth as walletSdk.TokenProviderConfig,
        logger
    )
}

export const getLedgerProvider = (): walletSdk.LedgerProvider => {
    if (!currentConfig) throw new Error('Wallet client is not configured')
    if (!ledgerProviderSingleton) {
        ledgerProviderSingleton = new walletSdk.LedgerProvider({
            baseUrl: new URL(
                currentConfig.ledgerApi.baseUrl,
                window.location.origin
            ),
            accessTokenProvider: getAccessTokenProvider(),
        })
    }
    return ledgerProviderSingleton
}

export const getWalletSdk = async () => {
    if (!currentConfig) throw new Error('Wallet client is not configured')
    if (!sdkPromise) {
        sdkPromise = createSdk(currentConfig)
    }
    return sdkPromise
}

export const createWallet = async (hint: string): Promise<LocalWallet> => {
    const sdk = await getWalletSdk()
    const keys = sdk.keys.generate()
    const party = await sdk.party.external
        .create(keys.publicKey, { partyHint: hint })
        .sign(keys.privateKey)
        .execute()

    const wallet: LocalWallet = {
        partyId: party.partyId,
        publicKey: keys.publicKey,
        privateKey: keys.privateKey,
        hint,
    }
    saveWallet(wallet)
    return wallet
}

// Looks up the active local wallet internally rather than taking it as a
// parameter: every flow in this app (transfer, allocation, tap, ...) acts as
// the signed-in user's own party, so actAs[0] is always the stored wallet.
export const submitCommand = async ({
    commands,
    actAs,
    disclosedContracts = [],
}: {
    commands: unknown[]
    actAs: string[]
    disclosedContracts?: readonly unknown[]
}) => {
    const wallet = loadStoredWallet()
    if (!wallet) throw new Error('No wallet is connected')
    const partyId = actAs[0]
    if (partyId !== wallet.partyId) {
        throw new Error(
            `Cannot submit on behalf of ${partyId}: only the connected wallet (${wallet.partyId}) can sign`
        )
    }

    const sdk = await getWalletSdk()
    return sdk.ledger
        .prepare({
            partyId,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            commands: commands as any,
            disclosedContracts: [...disclosedContracts] as never[],
        })
        .sign(wallet.privateKey)
        .execute({ partyId })
}
