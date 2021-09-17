import { useLingui } from '@lingui/react'
import React from 'react'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/classes'
import { t } from '@lingui/macro'
import { SummonerFullData } from '../../hooks/useRarityLibrary'

function SummonerSummaryCard({ summoner }: { summoner: SummonerFullData }): JSX.Element {
    const { i18n } = useLingui()

    function registerDayCare() {}

    return (
        <div className="mx-auto w-56">
            <div className="p-5 w-32 mx-auto">{CLASSES_IMAGES[summoner.base._class]}</div>

            <div className="grid grid-cols-1 rounded-2xl border-white border-2 bg-background-contrast divide-white divide-y-2">
                <div className="mx-auto p-2">
                    <span>{i18n._(CLASSES_NAMES[summoner.base._class])}</span>
                </div>
                <div className="p-2 text-xs">
                    <p>{summoner.base._name}</p>
                    <p>
                        {i18n._(t`id`)}: {summoner.id}
                    </p>
                </div>
                <div className="p-2 text-xs">
                    <div className="flex flex-row justify-between mr-2">
                        <p>{i18n._(t`level`)}</p>
                        <span> {summoner.base._level}</span>
                    </div>
                    <div className="flex flex-row justify-between mr-2">
                        <p>{i18n._(t`xp`)}</p>
                        <span> {summoner.base._xp}</span>
                    </div>
                    <div className="flex flex-row justify-between mr-2">
                        <p>{i18n._(t`gold`)}</p>
                        <span> {summoner.gold.balance}</span>
                    </div>
                </div>
                <div className="p-2 text-xs">
                    <div className="flex flex-row justify-between mr-2 items-center">
                        <p>{i18n._(t`daycare`)}</p>
                        <button onClick={() => registerDayCare()}>
                            {summoner.misc.daycare_days_paid === 0 ? (
                                <div className="px-2 py-2 items-center border-white border-2 bg-red rounded-lg">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            ) : (
                                <div className="p-1 border-white border-2 bg-green">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-row justify-between mr-2 items-center my-2">
                        <p>{i18n._(t`adventure`)}</p>
                        <button onClick={() => registerDayCare()}>
                            {summoner.misc.daycare_days_paid === 0 ? (
                                <div className="px-2 py-2 items-center border-white border-2 bg-red rounded-lg">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            ) : (
                                <div className="p-1 border-white border-2 bg-green">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-row justify-between mr-2 items-center">
                        <p>{i18n._(t`cellar`)}</p>
                        <button onClick={() => registerDayCare()}>
                            {summoner.misc.daycare_days_paid === 0 ? (
                                <div className="px-2 py-2 items-center border-white border-2 bg-red rounded-lg">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            ) : (
                                <div className="p-1 border-white border-2 bg-green">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
                <div className="p-2 text-xs w-full">
                    <p>
                        <button className="w-full my-1" onClick={() => registerDayCare()}>
                            <div className="px-2 py-2 items-center border-white border-2 bg-background-start rounded-lg">
                                TRANSFER
                            </div>
                        </button>
                    </p>
                    <p>
                        <button className="w-full my-1" onClick={() => registerDayCare()}>
                            <div className="px-2 py-2 items-center border-white border-2 bg-red rounded-lg">DELETE</div>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SummonerSummaryCard
