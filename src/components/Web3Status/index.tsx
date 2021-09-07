import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import LatticeIcon from '../../assets/images/gridPlusWallet.png'
import PortisIcon from '../../assets/images/portisIcon.png'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { injected, lattice, NetworkContextName, portis, walletconnect, walletlink } from '../../connectors'
import { useWalletModalToggle } from '../../state/application/hooks'
import { shortenAddress } from '../../utils'
import WalletModal from '../WalletModal'
import Identicon from '../Identicon'

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
    if (connector === injected) {
        return <Identicon />
    } else if (connector === walletconnect) {
        return (
            <div>
                <img src={WalletConnectIcon} alt={'Wallet Connect'} />
            </div>
        )
    } else if (connector === lattice) {
        return (
            <div>
                <img src={LatticeIcon} alt={'Lattice'} />
            </div>
        )
    } else if (connector === walletlink) {
        return (
            <div>
                <img src={CoinbaseWalletIcon} alt={'Coinbase Wallet'} />
            </div>
        )
    } else if (connector === portis) {
        return (
            <div>
                <img src={PortisIcon} alt={'Portis'} />
            </div>
        )
    }
    return null
}

function Web3StatusInner() {
    const { account, connector, error } = useWeb3React()

    const toggleWalletModal = useWalletModalToggle()

    if (account) {
        return (
            <div
                id="web3-status-connected"
                className="flex items-center rounded-lg bg-dark-1000 text-sm text-secondary py-2 px-3 border-2 border-white rounded-lg p-2 m-2"
                onClick={toggleWalletModal}
            >
                <div className="mr-2">{shortenAddress(account)}</div>
                {connector && <StatusIcon connector={connector} />}
            </div>
        )
    } else if (error) {
        return (
            <button className="rounded-lg py-2 px-4 m-2 bg-custom-red" onClick={toggleWalletModal}>
                <p>{error instanceof UnsupportedChainIdError ? 'You are on the wrong network' : 'Error'}</p>
            </button>
        )
    } else {
        return (
            <button
                id="connect-wallet"
                className="border-2 border-white rounded-lg p-2 m-2"
                onClick={toggleWalletModal}
            >
                <p>Connect to a wallet</p>
            </button>
        )
    }
}

export default function Web3Status(): JSX.Element | null {
    const { active } = useWeb3React()
    const contextNetwork = useWeb3React(NetworkContextName)

    if (!contextNetwork.active && !active) {
        return null
    }

    return (
        <>
            <Web3StatusInner />
            <WalletModal />
        </>
    )
}
