import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useMarketStats } from '../../../services/graph/hooks'
import SaleRow from './SaleRow'
import MarketGlobalStats from './Globals'

export default function MarketStats(): JSX.Element {
    const { i18n } = useLingui()

    const [offset, setOffset] = useState(0)

    const stats = useMarketStats(offset, { refreshInterval: 1_000 })

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
        if (bottom) {
            setOffset(offset + 20)
        }
    }

    return (
        <div className="w-full z-10">
            <div className="text-center mt-10">
                <h1 className="text-4xl uppercase">{i18n._(t`market statistics`)}</h1>
                <h2 className="text-lg mt-2">{i18n._(t`Real time information for Rarity Market`)}</h2>
            </div>
            <div style={{ width: '500px', fontFamily: 'Work Sans' }} className="mx-auto my-5">
                <MarketGlobalStats />
            </div>
            <div
                style={{ width: '1000px', height: '500px' }}
                className="mx-auto m-5 bg-item-background border-2 rounded-3xl scrollbar-hide overflow-y-scroll"
                onScroll={handleScroll}
            >
                <div className="sticky w-full top-0 z-20 bg-market-table-top font-bold flex flex-nowrap items-center px-2 py-5">
                    <div style={{ width: '10%' }} className="text-center">
                        <h2>{i18n._(t`ID No.`)}</h2>
                    </div>
                    <div style={{ width: '15%' }} className="text-center">
                        <h2>{i18n._(t`SELLER`)}</h2>
                    </div>
                    <div style={{ width: '15%' }} className="text-center">
                        <h2>{i18n._(t`BUYER`)}</h2>
                    </div>
                    <div style={{ width: '15%' }} className="text-center">
                        <h2>{i18n._(t`TRANSACTION`)}</h2>
                    </div>
                    <div style={{ width: '15%' }} className="text-center">
                        <h2>{i18n._(t`PRICE`)}</h2>
                    </div>
                    <div style={{ width: '15%' }} className="text-center">
                        <h2>{i18n._(t`FEES`)}</h2>
                    </div>
                    <div style={{ width: '15%' }} className="text-center">
                        <h2>{i18n._(t`TIME`)}</h2>
                    </div>
                </div>
                {stats &&
                    stats.sales.map((s, i) => {
                        return <SaleRow key={s.id} data={s} row_i={i} />
                    })}
            </div>
        </div>
    )
}
