import { NetworkContextName } from '../../constants'
import { createWeb3ReactRoot } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

const Web3ReactRoot = createWeb3ReactRoot(NetworkContextName)

function Web3ProviderNetwork({
    children,
    getLibrary,
}: {
    children: JSX.Element
    getLibrary: (provider?: any, connector?: Required<Web3ReactContextInterface>['connector']) => any
}) {
    return <Web3ReactRoot getLibrary={getLibrary}>{children}</Web3ReactRoot>
}

export default Web3ProviderNetwork
