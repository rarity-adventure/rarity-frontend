import { ChainId } from '../constants'
import harpers from '../assets/factions/harpers.png'

export const BATTLEFIELDS: {
    [chainId: number]: { [key: string]: { name: string; address: string; image: any; description: string } }
} = {
    [ChainId.MAINNET]: {
        hill: {
            name: 'Battle on the hill',
            address: '0x87E36f433Eb021D4539628eb54C1d5AfCDAf87Fd',
            image: harpers,
            description:
                "A simple battle where only summoners attributes and skills matter. Summoners's skills, modified by their attributes, are added up to give the faction its power.",
        },
    },
}
