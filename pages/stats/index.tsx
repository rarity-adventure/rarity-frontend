import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { classNames } from '../../functions/classNames'
import { t } from '@lingui/macro'
import GlobalStats from '../../components/Stats/globals'
import MarketStats from '../../components/Stats/market'

enum StatsView {
    GLOBAL,
    MARKET,
}

export default function Market(): JSX.Element {
    const { i18n } = useLingui()

    const [view, setView] = useState(StatsView.GLOBAL)

    return (
        <div className="w-full z-25">
            <div className="m-2 md:m-10 z-10">
                <div className="flex flex-row justify-center sm:justify-start">
                    <button
                        onClick={() => setView(StatsView.GLOBAL)}
                        className={classNames(
                            'bg-card-content uppercase border-2 p-1 rounded-l-2xl w-32',
                            view !== StatsView.GLOBAL ? 'opacity-50' : ''
                        )}
                    >
                        {i18n._(t`GLOBAL`)}
                    </button>
                    <button
                        onClick={() => setView(StatsView.MARKET)}
                        className={classNames(
                            'bg-card-content uppercase border-2 p-1 w-32 rounded-r-2xl',
                            view !== StatsView.MARKET ? 'opacity-50' : ''
                        )}
                    >
                        {i18n._(t`MARKET`)}
                    </button>
                </div>
                <div>{view === StatsView.GLOBAL && <GlobalStats />}</div>
                <div>{view === StatsView.MARKET && <MarketStats />}</div>
            </div>
        </div>
    )
}
