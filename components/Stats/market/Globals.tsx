import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import { useMarketGlobalStats } from '../../../services/graph/hooks'
import { utils } from 'ethers'

export default function MarketGlobalStats(): JSX.Element {
    const { i18n } = useLingui()

    const globals = useMarketGlobalStats({ refreshInterval: 1_000 })

    return (
        <div>
            <div className="bg-market-table-top border-white border-2 text-center text-sm lg:text-xl rounded-t-xl p-2">
                <span>{i18n._(t`Global Market Statistics`)}</span>
            </div>
            {globals && (
                <div className="bg-item-background border-white border-l-2 border-r-2 border-b-2 rounded-b-lg p-2 px-4">
                    <div className="flex flex-row py-1 w-full text-sm uppercase">
                        <span>{i18n._(t`total volume`)}:</span>
                    </div>
                    <div className="flex flex-row-reverse w-full text-xl">
                        <span>{utils.formatEther(globals.globals[0].volume)} FTM</span>
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
                        <span>{utils.formatEther(globals.globals[0].fees)} FTM</span>
                    </div>
                </div>
            )}
        </div>
    )
}
