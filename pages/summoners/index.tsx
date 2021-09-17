import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useSummoners } from '../../state/summoners/hooks'
import { calcXPForNextLevel } from '../../functions/calcXPForNextLevel'
import Filter from '../../components/Filter'
import SummonerSummaryCard from '../../components/Cards/Summary'
import { BigNumber } from 'ethers'

export default function Summoners(): JSX.Element {
    const { i18n } = useLingui()

    // const summoners = useSummoners()

    const summoners = [
        {
            id: 123123,
            base: {
                _class: BigNumber.from(1),
                _level: BigNumber.from(1),
                _log: BigNumber.from(Date.now() - 1),
                _name: 'Legolas',
                _xp: BigNumber.from(100),
            },
            gold: {
                balance: BigNumber.from(100000),
                claimable: BigNumber.from(0),
                claimed: BigNumber.from(1000),
            },
            materials: {
                log: BigNumber.from(Date.now() - 1),
                balance: BigNumber.from(100000),
                scout: BigNumber.from(0),
            },
        },
        {
            id: 123123,
            base: {
                _class: BigNumber.from(1),
                _level: BigNumber.from(1),
                _log: BigNumber.from(Date.now() - 1),
                _name: 'Legolas',
                _xp: BigNumber.from(100),
            },
            gold: {
                balance: BigNumber.from(100000),
                claimable: BigNumber.from(0),
                claimed: BigNumber.from(1000),
            },
            materials: {
                log: BigNumber.from(Date.now() - 1),
                balance: BigNumber.from(100000),
                scout: BigNumber.from(0),
            },
        },
        {
            id: 123123,
            base: {
                _class: BigNumber.from(1),
                _level: BigNumber.from(1),
                _log: BigNumber.from(Date.now() - 1),
                _name: 'TTTTTTTTTTTTTTTTTTTTTTTTT',
                _xp: BigNumber.from(100),
            },
            gold: {
                balance: BigNumber.from(100000),
                claimable: BigNumber.from(0),
                claimed: BigNumber.from(1000),
            },
            materials: {
                log: BigNumber.from(Date.now() - 1),
                balance: BigNumber.from(100000),
                scout: BigNumber.from(0),
            },
        },
        {
            id: 123123,
            base: {
                _class: BigNumber.from(1),
                _level: BigNumber.from(1),
                _log: BigNumber.from(Date.now() - 1),
                _name: 'Legolas',
                _xp: BigNumber.from(100),
            },
            gold: {
                balance: BigNumber.from(100000),
                claimable: BigNumber.from(0),
                claimed: BigNumber.from(1000),
            },
            materials: {
                log: BigNumber.from(Date.now() - 1),
                balance: BigNumber.from(100000),
                scout: BigNumber.from(0),
            },
        },
    ]

    const adventure = summoners.filter((s) => parseInt(s.base._log.toString()) > Date.now())
    const level = summoners.filter(
        (s) => parseInt(s.base._xp.toString()) >= calcXPForNextLevel(parseInt(s.base._level.toString()))
    )
    const claim = summoners.filter((s) => parseInt(s.gold.claimable.toString()) > 0)
    const dungeon = summoners.filter(
        (s) => parseInt(s.materials.log.toString()) > Date.now() && parseInt(s.materials.scout.toString()) > 0
    )

    const [parsedSummoners, setParsedSummoners] = useState(summoners)

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10 uppercase">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-2xl xl:text-3xl">{i18n._(t`summoners`)}</h1>
                    </div>
                    <div className="w-48">
                        {/*
                        <Filter summoners={summoners} filteredSummoners={setParsedSummoners} />
*/}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 items-center gap-2 xl:gap-5">
                    <div className="mx-2 text-center uppercase">
                        <p>{i18n._(t`adventure`)}</p>
                        {adventure.length > 0 ? (
                            <button className="uppercase bg-red border-2 mt-2 border-white rounded-lg text-xs p-2">
                                {i18n._(t`send`)} {adventure.length} {i18n._(t`summoners`)}
                            </button>
                        ) : (
                            <button className="opacity-50 cursor-not-allowed uppercase border-2 mt-2 border-white rounded-lg text-xs p-2">
                                {i18n._(t`no summoners available`)}
                            </button>
                        )}
                    </div>
                    <div className="mx-2 text-center uppercase">
                        <p>{i18n._(t`claim gold`)}</p>
                        {claim.length > 0 ? (
                            <button className="uppercase bg-red border-2 mt-2 border-white rounded-lg text-xs p-2">
                                {i18n._(t`send`)} {claim.length} {i18n._(t`summoners`)}
                            </button>
                        ) : (
                            <button className="opacity-50 cursor-not-allowed uppercase border-2 mt-2 border-white rounded-lg text-xs p-2">
                                {i18n._(t`no summoners available`)}
                            </button>
                        )}
                    </div>
                    <div className="mx-2 text-center uppercase">
                        <p>{i18n._(t`level-up`)}</p>
                        {level.length > 0 ? (
                            <button className="uppercase bg-red border-2 mt-2 border-white rounded-lg text-xs p-2">
                                {i18n._(t`send`)} {level.length} {i18n._(t`summoners`)}
                            </button>
                        ) : (
                            <button className="opacity-50 cursor-not-allowed uppercase border-2 mt-2 border-white rounded-lg text-xs p-2">
                                {i18n._(t`no summoners available`)}
                            </button>
                        )}
                    </div>
                    <div className="mx-2 text-center uppercase">
                        <p>{i18n._(t`cellar`)}</p>
                        {dungeon.length > 0 ? (
                            <button className="uppercase bg-red border-2 mt-2 border-white rounded-lg text-xs p-2">
                                {i18n._(t`send`)} {dungeon.length} {i18n._(t`summoners`)}
                            </button>
                        ) : (
                            <button className="opacity-50 cursor-not-allowed uppercase border-2 mt-2 border-white rounded-lg text-xs p-2">
                                {i18n._(t`no summoners available`)}
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 items-center gap-2 xl:gap-5">
                    {summoners.map((s) => {
                        return <SummonerSummaryCard summoner={s} />
                    })}
                </div>
            </div>
        </div>
    )
}
