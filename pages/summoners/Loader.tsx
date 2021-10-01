import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { SummonerSummaryCardLoader } from '../../components/Cards/Summary'
import React from 'react'

export function SummonersLoader(): JSX.Element {
    const { i18n } = useLingui()

    return (
        <div className="md:border-white md:border-4 p-4 md:m-10 z-10 uppercase animate-pulse">
            <>
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-2xl xl:text-3xl">{i18n._(t`summoners`)}</h1>
                    </div>
                    <div className="uppercase">
                        <h1 className="text-lg">{i18n._(t`one-click`)}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 text-xs gap-y-3">
                            <div
                                className={
                                    'p-1 mt-1 bg-background-contrast opacity-70 rounded-lg mx-1 uppercase h-6 w-24'
                                }
                            />
                            <div
                                className={
                                    'p-1 mt-1 bg-background-contrast opacity-70 rounded-lg mx-1 uppercase h-6 w-24'
                                }
                            />
                            <div
                                className={
                                    'p-1 mt-1 bg-background-contrast opacity-70 rounded-lg mx-1 uppercase h-6 w-24'
                                }
                            />
                            <div
                                className={
                                    'p-1 mt-1 bg-background-contrast opacity-70 rounded-lg mx-1 uppercase h-6 w-24'
                                }
                            />
                            <div
                                className={
                                    'p-1 mt-1 bg-background-contrast opacity-70 rounded-lg mx-1 uppercase h-6 w-24'
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end mt-5">
                    <div className={'p-1 mt-1 bg-background-contrast opacity-70 rounded-lg mx-1 uppercase h-6 w-52'} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 items-center gap-2 xl:gap-5">
                    <SummonerSummaryCardLoader />
                    <SummonerSummaryCardLoader />
                    <SummonerSummaryCardLoader />
                    <SummonerSummaryCardLoader />
                    <SummonerSummaryCardLoader />
                    <SummonerSummaryCardLoader />
                    <SummonerSummaryCardLoader />
                    <SummonerSummaryCardLoader />
                </div>
            </>
        </div>
    )
}
