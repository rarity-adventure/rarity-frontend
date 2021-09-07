import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { NETWORK_ICON, NETWORK_LABEL } from '../../constants'

function Web3Network(): JSX.Element | null {
    const { chainId } = useActiveWeb3React()

    if (!chainId) return null

    return (
        <div className="flex items-center rounded p-0.5 border-2 border-white rounded-lg p-1 m-1">
            <div className="grid grid-flow-col auto-cols-max items-center rounded-lg bg-dark-1000 text-sm text-secondary py-2 px-3 pointer-events-auto">
                <img
                    src={NETWORK_ICON[chainId]}
                    alt="Switch Network"
                    className="rounded-md mr-2"
                    style={{ width: 22, height: 22 }}
                />
                <div className="text-primary">{NETWORK_LABEL[chainId]}</div>
            </div>
        </div>
    )
}

export default Web3Network
