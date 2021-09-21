import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '../entities/NetworkConnector'
import RPC from './rpc'
import { ChainId } from '../constants'

export const network = new NetworkConnector({
    defaultChainId: 137,
    urls: RPC,
})

const supportedChainIds = Object.values(ChainId) as number[]

export const injected = new InjectedConnector({
    supportedChainIds,
})

export interface WalletInfo {
    connector?: (() => Promise<AbstractConnector>) | AbstractConnector
    name: string
    iconName: string
    description: string
    href: string | null
    color: string
    primary?: true
    mobile?: true
    mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    METAMASK: {
        connector: injected,
        name: 'MetaMask',
        iconName: 'metamask.png',
        description: 'Easy-to-use browser extension.',
        href: null,
        color: '#E8831D',
    },
    WALLET_CONNECT: {
        connector: async () => {
            const WalletConnectConnector = (await import('@web3-react/walletconnect-connector')).WalletConnectConnector
            return new WalletConnectConnector({
                rpc: RPC,
                bridge: 'https://bridge.walletconnect.org',
                qrcode: true,
                supportedChainIds: [
                    137, // Matic
                ],
            })
        },
        name: 'WalletConnect',
        iconName: 'wallet-connect.svg',
        description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
        href: null,
        color: '#4196FC',
        mobile: true,
    },
}
