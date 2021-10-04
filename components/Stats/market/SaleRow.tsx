import React from 'react'
import { formatDateAgo, shortenAddress, shortenString } from '../../../functions/format'
import { utils } from 'ethers'

export default function SaleRow({ data, row_i }: { data; row_i }): JSX.Element {
    const colorClass = row_i % 2 == 0 ? 'bg-transparent' : 'bg-background-contrast-dark'

    return (
        <div
            style={{ width: '1000px', fontFamily: 'Work Sans', height: '50px' }}
            className={`flex w-full justify-left flex-nowrap items-center p-0 ${colorClass}`}
        >
            <div style={{ width: '10%' }} className="text-center">
                <div>{data.summoner}</div>
            </div>
            <div style={{ width: '15%' }} className="text-center">
                <a href={'https://ftmscan.com/address/' + data.seller} target="_blank" rel="noreferrer">
                    <b>
                        <span>{shortenAddress(data.seller)}</span>
                    </b>
                </a>
            </div>
            <div style={{ width: '15%' }} className="text-center">
                <a href={'https://ftmscan.com/address/' + data.buyer} target="_blank" rel="noreferrer">
                    <b>
                        <span>{shortenAddress(data.buyer)}</span>
                    </b>
                </a>
            </div>
            <div style={{ width: '15%' }} className="text-center">
                <a href={'https://ftmscan.com/tx/' + data.txid} target="_blank" rel="noreferrer">
                    <b>
                        <span>{shortenString(data.txid, 15)}</span>
                    </b>
                </a>
            </div>
            <div style={{ width: '15%' }} className="text-center">
                <span>{utils.formatEther(data.price)} FTM</span>
            </div>
            <div style={{ width: '15%' }} className="text-center">
                <span>{utils.formatEther(data.fee)} FTM</span>
            </div>
            <div style={{ width: '15%' }} className="text-center">
                <span>{formatDateAgo(new Date(data.timestamp * 1000))}</span>
            </div>
        </div>
    )
}
