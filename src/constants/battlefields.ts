import { ChainId } from '../constants'
import harpers from '../assets/factions/harpers.png'

export const BATTLEFIELDS: {
    [chainId: number]: { [key: string]: { name: string; address: string; image: any; description: string } }
} = {
    [ChainId.MAINNET]: {
        hill: {
            name: 'Battle on the hill',
            address: '0xfAb923AE679F32fad29C1D4dEBDCcFc2C8823d7a',
            image: harpers,
            description:
                "A simple battle where only summoners attributes and skills matter. Summoners's skills, modified by their attributes, are added up to give the faction its power.",
        },
    },
}
