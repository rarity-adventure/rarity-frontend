import { AddEthereumChainParameter } from '../hooks/useSwitchOrAddChain'

export const NetworkContextName = 'NETWORK'

export enum ChainId {
    MAINNET = 250,
}

export const MULTICALL2_ADDRESS = '0x5f28e9fca1c34b2dd44630df26fc7aa3d3f35eb9'

export const RARITY_ADDRESS = '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb'

export const FANTOM_NETWORK: AddEthereumChainParameter = {
    chainId: '0xfa',
    chainName: 'Fantom Opera',
    nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18,
    },
    rpcUrls: ['https://rpc.ftm.tools/'],
    blockExplorerUrls: ['https://ftmscan.com/'],
}
