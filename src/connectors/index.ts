import { InjectedConnector } from '@web3-react/injected-connector'
import { LatticeConnector } from '@web3-react/lattice-connector'
import { NetworkConnector } from './NetworkConnector'
import { PortisConnector } from '@web3-react/portis-connector'
import { TorusConnector } from '@web3-react/torus-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ChainId } from '../constants'

const RPC = {
    [ChainId.MAINNET]: 'https://rpcapi.fantom.network',
}

export const network = new NetworkConnector({
    defaultChainId: 250,
    urls: RPC,
})

export const injected = new InjectedConnector({
    supportedChainIds: [
        250, // fantom
    ],
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
    rpc: {
        [ChainId.MAINNET]: RPC[ChainId.MAINNET],
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000,
})

// mainnet only
export const lattice = new LatticeConnector({
    chainId: 1,
    url: RPC[ChainId.MAINNET],
    appName: 'SushiSwap',
})

// mainnet only
export const portis = new PortisConnector({
    dAppId: process.env.REACT_APP_PORTIS_ID ?? '',
    networks: [1],
})

// mainnet only
export const walletlink = new WalletLinkConnector({
    url: RPC[ChainId.MAINNET],
    appName: 'SushiSwap',
    appLogoUrl: 'https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png',
})

// mainnet only
export const torus = new TorusConnector({
    chainId: 1,
})

export interface WalletInfo {
    connector?: AbstractConnector
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
    INJECTED: {
        connector: injected,
        name: 'Injected',
        iconName: 'arrow-right.svg',
        description: 'Injected web3 provider.',
        href: null,
        color: '#010101',
        primary: true,
    },
    METAMASK: {
        connector: injected,
        name: 'MetaMask',
        iconName: 'metamask.png',
        description: 'Easy-to-use browser extension.',
        href: null,
        color: '#E8831D',
    },
    WALLET_CONNECT: {
        connector: walletconnect,
        name: 'WalletConnect',
        iconName: 'walletConnectIcon.svg',
        description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
        href: null,
        color: '#4196FC',
        mobile: true,
    },
    LATTICE: {
        connector: lattice,
        name: 'Lattice',
        iconName: 'gridPlusWallet.png',
        description: 'Connect to GridPlus Wallet.',
        href: null,
        color: '#40a9ff',
        mobile: true,
    },
    WALLET_LINK: {
        connector: walletlink,
        name: 'Coinbase Wallet',
        iconName: 'coinbaseWalletIcon.svg',
        description: 'Use Coinbase Wallet app on mobile device',
        href: null,
        color: '#315CF5',
    },
    COINBASE_LINK: {
        name: 'Open in Coinbase Wallet',
        iconName: 'coinbaseWalletIcon.svg',
        description: 'Open in Coinbase Wallet app.',
        href: 'https://go.cb-w.com',
        color: '#315CF5',
        mobile: true,
        mobileOnly: true,
    },
    Portis: {
        connector: portis,
        name: 'Portis',
        iconName: 'portisIcon.png',
        description: 'Login using Portis hosted wallet',
        href: null,
        color: '#4A6C9B',
        mobile: true,
    },
    Torus: {
        connector: torus,
        name: 'Torus',
        iconName: 'torusIcon.png',
        description: 'Login using Torus hosted wallet',
        href: null,
        color: '#315CF5',
        mobile: true,
    },
}

export const NetworkContextName = 'NETWORK'
