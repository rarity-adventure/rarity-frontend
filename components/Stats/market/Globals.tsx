import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import { useMarketBiggestSale, useMarketGlobalStats, useMarketLatestSale } from '../../../services/graph/hooks'
import { utils } from 'ethers'

export default function MarketGlobalStats(): JSX.Element {
    const { i18n } = useLingui()

    const globals = useMarketGlobalStats({ refreshInterval: 1_000 })

    const latest = useMarketLatestSale({ refreshInterval: 1_000 })
    const biggest = useMarketBiggestSale({ refreshInterval: 1_000 })

    console.log(latest)
    return (
        <div>
            {globals && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                        <div className="bg-item-background border-white border-2 rounded-lg p-2 px-4">
                            <div className="flex flex-row py-1 w-full text-sm uppercase">
                                <span>{i18n._(t`total volume`)}:</span>
                            </div>
                            <div className="flex flex-row-reverse w-full text-xl">
                                <span>{parseFloat(utils.formatEther(globals.globals[0].volume)).toFixed(2)} FTM</span>
                            </div>
                            <div className="flex flex-row w-full text-sm uppercase">
                                <span>{i18n._(t`trades`)}:</span>
                            </div>
                            <div className="flex flex-row-reverse w-full text-xl">
                                <span>{globals.globals[0].trades}</span>
                            </div>
                            <div className="flex flex-row  w-full text-sm uppercase">
                                <span>{i18n._(t`total fees`)}:</span>
                            </div>
                            <div className="flex flex-row-reverse w-full text-xl">
                                <span>{parseFloat(utils.formatEther(globals.globals[0].fees)).toFixed(2)} FTM</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-item-background border-white border-2 rounded-lg p-2 px-4">
                        <div className="flex flex-row py-1 w-full text-sm uppercase">
                            <span>{i18n._(t`average price`)}:</span>
                        </div>
                        <div className="flex flex-row-reverse w-full text-xl">
                            <span>
                                {(
                                    parseFloat(utils.formatEther(globals.globals[0].volume)) / globals.globals[0].trades
                                ).toFixed(2)}{' '}
                                FTM
                            </span>
                        </div>
                        <div className="flex flex-row w-full text-sm uppercase">
                            <span>{i18n._(t`highest trade`)}:</span>
                        </div>
                        {biggest && (
                            <div className="flex flex-row-reverse w-full text-xl">
                                <span>{parseFloat(utils.formatEther(biggest.sales[0].price)).toFixed(0)} FTM</span>
                            </div>
                        )}
                        <div className="flex flex-row  w-full text-sm uppercase">
                            <span>{i18n._(t`latest trade`)}:</span>
                        </div>
                        {latest && (
                            <div className="flex flex-row-reverse w-full text-sm">
                                <span>
                                    {new Date(latest.sales[0].timestamp * 1000).toLocaleDateString()}{' '}
                                    {new Date(latest.sales[0].timestamp * 1000).toLocaleTimeString()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
