import { useLingui } from '@lingui/react'
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { useMarketStats } from '../../../services/graph/hooks'
import SaleRow from './SaleRow'
import MarketGlobalStats from './Globals'

export default function MarketStats(): JSX.Element {
    const { i18n } = useLingui()

    const [offset, setOffset] = useState(0)

    const stats = useMarketStats(offset)

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
        if (bottom) {
            if (sales.length >= 20) {
                setOffset(offset + 20)
            }
        }
    }

    const [sales, setSales] = useState([])

    useEffect(() => {
        if (!stats) return
        if (offset === 0) {
            setSales(stats.sales)
        } else {
            setSales(sales.concat(stats.sales))
        }
    }, [stats, offset])

    return (
        <div className="w-full mx-2 z-10">
            <div className="text-center mt-10">
                <h1 className="text-4xl uppercase">{i18n._(t`market statistics`)}</h1>
                <h2 className="text-lg mt-2">{i18n._(t`Real time information for Rarity Market`)}</h2>
            </div>
            <div style={{ fontFamily: 'Work Sans' }} className="mx-auto mx-2 w-3/4 lg:w-1/2 my-5">
                <MarketGlobalStats />
            </div>
            <div
                style={{ height: '500px' }}
                className="mx-10 bg-item-background border-2 rounded-3xl scrollbar-hide overflow-y-scroll"
                onScroll={handleScroll}
            >
                <div
                    style={{ minWidth: '1000px' }}
                    className="sticky w-full top-0 z-20 bg-market-table-top font-bold flex flex-nowrap items-center px-2 py-5"
                >
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
                {sales &&
                    sales.map((s, i) => {
                        return <SaleRow key={s.id} data={s} row_i={i} />
                    })}
            </div>
        </div>
    )
}
