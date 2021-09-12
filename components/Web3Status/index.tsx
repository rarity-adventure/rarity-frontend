import React from 'react'
import { NetworkContextName } from '../../constants'
import Web3Connect from '../Web3Connect'
import { shortenAddress } from '../../functions/format'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useWeb3React } from '@web3-react/core'
import HeadlessUIModal from '../Modal/HeadlessUIModal'

function Web3StatusInner() {
    const { account } = useWeb3React()

    const toggleWalletModal = useWalletModalToggle()

    if (account) {
        return (
            <div
                id="web3-status-connected"
                className="flex items-center px-3 py-2 text-sm rounded-lg bg-dark-1000 text-secondary"
                onClick={toggleWalletModal}
            >
                <div className="mr-2">{shortenAddress(account)}</div>
            </div>
        )
    } else {
        return <Web3Connect style={{ paddingTop: '6px', paddingBottom: '6px' }} />
    }
}

export default function Web3Status() {
    const { active } = useWeb3React()

    const contextNetwork = useWeb3React(NetworkContextName)

    if (!contextNetwork.active && !active) {
        return null
    }

    return (
        <>
            <Web3StatusInner />
        </>
    )
}
