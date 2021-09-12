import Image from 'next/image'
import React from 'react'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'

function Web3Network(): JSX.Element | null {
    const { chainId } = useActiveWeb3React()

    if (!chainId) return null

    return (
        <div className="flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
            <div className="grid items-center grid-flow-col px-3 py-2 space-x-2 text-sm rounded-lg pointer-events-auto auto-cols-max bg-dark-1000 text-secondary">
                <Image
                    src="/images/networks/fantom-network.jpg"
                    alt="Fantom Network"
                    className="rounded-md"
                    width="22px"
                    height="22px"
                />
                <div className="text-primary">FTM</div>
            </div>
        </div>
    )
}

export default Web3Network
