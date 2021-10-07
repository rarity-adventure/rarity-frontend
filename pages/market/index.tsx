import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import NamesMarket from '../../components/Market/names'
import SummonersMarket from '../../components/Market/summoners'
import { classNames } from '../../functions/classNames'
import { t } from '@lingui/macro'

enum MarketView {
    Summoners,
    Names,
}

export default function Market(): JSX.Element {
    const { i18n } = useLingui()

    const [view, setView] = useState(MarketView.Summoners)

    return (
        <div className="w-full z-25">
            <div className="m-2 md:m-10 z-10">
                <div className="flex flex-row justify-center sm:justify-start">
                    <button
                        onClick={() => setView(MarketView.Summoners)}
                        className={classNames(
                            'bg-card-content uppercase border-2 p-1 rounded-l-2xl w-32',
                            view !== MarketView.Summoners ? 'opacity-50' : ''
                        )}
                    >
                        {i18n._(t`Summoners`)}
                    </button>
                    <button
                        onClick={() => setView(MarketView.Names)}
                        className={classNames(
                            'bg-card-content uppercase border-2 p-1 w-32 rounded-r-2xl',
                            view !== MarketView.Names ? 'opacity-50' : ''
                        )}
                    >
                        {i18n._(t`Names`)}
                    </button>
                </div>
                <div>
                    {view === MarketView.Summoners && <SummonersMarket />}
                    {view === MarketView.Names && <NamesMarket />}
                </div>
            </div>
        </div>
    )
}
