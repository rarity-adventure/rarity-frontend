import harpers from '../assets/factions/harpers.png'
import gauntlet from '../assets/factions/gauntlet.png'
import enclave from '../assets/factions/enclave.png'
import alliance from '../assets/factions/alliance.png'
import zhentarim from '../assets/factions/zhentarim.png'

export const FACTIONS: { [k: string]: { name: string; image: any } } = {
    '1': { name: 'The Harpers', image: harpers },
    '2': { name: 'The Order Of The Gauntlet', image: gauntlet },
    '3': { name: 'The Emerald Enclave', image: enclave },
    '4': { name: 'The Lords\' Alliance', image: alliance },
    '5': { name: 'The Zhentarim', image: zhentarim },
}
