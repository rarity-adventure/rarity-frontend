import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import { classNames } from '../../../functions/classNames'
import SummonersMarketListings from './Market'
import SummonersMarketOwn from './Own'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'

enum SummonersMarketView {
    Listings,
    Own,
}

export default function SummonersMarket() {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    function buttons(): JSX.Element {
        return (
            <div className="flex flex-row gap-x-3">
                <button
                    onClick={() => setView(SummonersMarketView.Listings)}
                    className={classNames(
                        'rounded-3xl uppercase border-2 border-market-button',
                        view === SummonersMarketView.Listings ? 'opacity-50' : ''
                    )}
                >
                    <h2 className="py-1 px-3">{i18n._(t`market`)}</h2>
                </button>
                {account && (
                    <button
                        onClick={() => setView(SummonersMarketView.Own)}
                        className={classNames(
                            'rounded-3xl uppercase border-2 border-market-button',
                            view === SummonersMarketView.Own ? 'opacity-50' : ''
                        )}
                    >
                        <h2 className="py-1 px-3">{i18n._(t`my summoners`)}</h2>
                    </button>
                )}
            </div>
        )
    }

    const [view, setView] = useState(SummonersMarketView.Listings)

    return (
        <div className="w-full z-25 mt-5">
            <div className="flex flex-row items-center justify-center sm:justify-between">
                <div>
                    <h1 className="text-2xl xl:text-3xl uppercase font-bold">{i18n._(t`rarity summoners market`)}</h1>
                </div>
                <div className="hidden sm:inline-flex">{buttons()}</div>
            </div>
            <div className="mt-4 justify-center flex flex-row">
                <div className="sm:hidden">{buttons()}</div>
            </div>
            {view === SummonersMarketView.Listings && <SummonersMarketListings />}
            {view === SummonersMarketView.Own && <SummonersMarketOwn />}
        </div>
    )
}
