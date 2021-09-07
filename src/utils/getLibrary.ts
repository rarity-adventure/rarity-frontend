import { Web3Provider } from '@ethersproject/providers'
import { ExternalProvider } from '@ethersproject/providers/src.ts/web3-provider'

export default function getLibrary(provider: ExternalProvider): Web3Provider {
    const library = new Web3Provider(provider, 'any')
    library.pollingInterval = 15000
    return library
}
