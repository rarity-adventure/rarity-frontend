import Fantom from '../assets/networks/fantom-network.jpg'

export enum ChainId {
    MAINNET = 250,
}

export const NETWORK_ICON = {
    [ChainId.MAINNET]: Fantom,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
    [ChainId.MAINNET]: 'Fantom',
}

export const RARITY_CONTRACTS = {
    [ChainId.MAINNET]: '0xce761d788df608bd21bdd59d6f4b54b2e27f25bb',
}

export const GOLD_CONTRACTS = {
    [ChainId.MAINNET]: '0x2069B76Afe6b734Fb65D1d099E7ec64ee9CC76B2',
}

export const ATTRIBUTES_CONTRACT = {
    [ChainId.MAINNET]: '0xB5F5AF1087A8DA62A23b08C00C6ec9af21F397a1',
}

export const MULTIADVENTURE_CONTRACT = {
    [ChainId.MAINNET]: '0x0D4C98901563ca730332e841EDBCB801fe9F2551',
}

export const DAILYCARE_CONTRACT = {
    [ChainId.MAINNET]: '0xf1bf34E46ECf465591B7a7fA9635E4C583174fa3',
}

export const SKILLS_CONTRACT = {
    [ChainId.MAINNET]: '0x51C0B29A1d84611373BA301706c6B4b72283C80F',
}

export const DUNGEONS: { [k: string]: { name: string; contract: string } } = {
    cellar: {
        name: 'The Cellar',
        contract: '0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A',
    },
}

export const RARITY_NAME_CONTRACT = {
    [ChainId.MAINNET]: '0xc73e1237a5a9ba5b0f790b6580f32d04a727dc19',
}

export const MULTICALL2_ADDRESS = '0x5f28e9fca1c34b2dd44630df26fc7aa3d3f35eb9'

export function secondsToString(d: number): string {
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    const s = Math.floor((d % 3600) % 60)
    const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : ''
    const mDisplay = m > 0 ? m + (m === 1 ? ' min, ' : ' min, ') : ''
    const sDisplay = s > 0 ? s + (s === 1 ? ' sec' : ' sec') : ''
    return hDisplay + mDisplay + sDisplay
}

export function calcAPCost(score: number): number {
    if (score <= 14) {
        return score - 8
    } else {
        return Math.floor((score - 8) ** 2 / 6)
    }
}
