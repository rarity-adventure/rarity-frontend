import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import React from 'react'
import { useWalletModalToggle } from '../../state/application/hooks'

export default function Web3Connect() {
    const toggleWalletModal = useWalletModalToggle()
    const { error } = useWeb3React()

    return error ? (
        <div
            className="flex items-center justify-center px-4 py-2 font-semibold text-white border rounded bg-opacity-80 border-red bg-red hover:bg-opacity-100"
            onClick={toggleWalletModal}
        >
            <h2>{error instanceof UnsupportedChainIdError ? 'You are on the wrong network' : 'Error'}</h2>
        </div>
    ) : (
        <button
            onClick={toggleWalletModal}
            className="uppercase tracking-normal text-lg py-1 px-4 border-2 border-white rounded-2xl"
        >
            <h1>Connect wallet</h1>
        </button>
    )
}
