import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useListedCount, useListedSummoners } from '../../services/graph/hooks'
import { CLASSES_HEADS, CLASSES_NAMES } from '../../constants/classes'
import MarketFeatsModal from '../../components/Modal/modals/MarketFeats'
import MarketSkillsModal from '../../components/Modal/modals/MarketSkills'

function SummonerRow({
    summoner,
    skillsModalFunc,
    featsModalFunc,
}: {
    summoner
    skillsModalFunc: (summoner: number) => void
    featsModalFunc: (summoner: number) => void
}): JSX.Element {
    const { i18n } = useLingui()

    return (
        <div style={{ width: '1478px' }} className="flex justify-left flex-nowrap items-center p-5">
            <div style={{ width: '125px' }} className="text-center">
                <span>{summoner.summoner}</span>
            </div>
            <div style={{ width: '125px' }} className="text-center">
                <div>{CLASSES_HEADS[summoner.class]}</div>
                <p className="uppercase">{CLASSES_NAMES[summoner.class]}</p>
            </div>
            <div style={{ width: '80px' }} className="text-center">
                <span>{summoner.price_approx}</span> FTM
            </div>
            <div style={{ width: '80px' }} className="text-center">
                <span>{summoner.level}</span>
            </div>
            <div style={{ width: '80px' }} className="text-center">
                <span>{summoner.xp}</span>
            </div>
            <div style={{ width: '250px' }} className="text-center">
                <div className="py-1 px-2 bg-card-top rounded-3xl border-2 border-white mx-6">
                    <div className="relative py-1 px-2">
                        <div className="flex flex-row justify-between h-7 items-center">
                            <h1 className="absolute left-3">STR: </h1>
                            <h1 className="absolute left-14">{summoner.str}</h1>
                            <h1 className="absolute right-8">INT: </h1>
                            <h1 className="absolute right-3">{summoner.int}</h1>
                        </div>
                        <div className="flex flex-row justify-between h-7 py-1">
                            <h1 className="absolute left-3">DEX: </h1>
                            <h1 className="absolute left-14">{summoner.dex}</h1>
                            <h1 className="absolute right-8">WIS: </h1>
                            <h1 className="absolute right-3">{summoner.wis}</h1>
                        </div>
                        <div className="flex flex-row justify-between h-7 py-1">
                            <h1 className="absolute left-3">CON: </h1>
                            <h1 className="absolute left-14">{summoner.con}</h1>
                            <h1 className="absolute right-8">CHA: </h1>
                            <h1 className="absolute right-3">{summoner.cha}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '130px' }} className="text-center">
                <span>{summoner.gold_approx}</span>
            </div>
            <div style={{ width: '130px' }} className="text-center">
                <span>{summoner.unclaimed_gold_approx}</span>
            </div>
            <div style={{ width: '100px' }} className="text-center">
                <span>{summoner.cellar}</span>
            </div>
            <div style={{ width: '150px' }} className="text-center">
                <button
                    onClick={() => skillsModalFunc(summoner)}
                    className="uppercase border-2 border-white px-1 py-1.5 rounded-lg text-xs bg-card-top"
                >
                    {i18n._(t`view more`)}
                </button>
            </div>
            <div style={{ width: '150px' }} className="text-center">
                <button
                    onClick={() => featsModalFunc(summoner)}
                    className="uppercase border-2 border-white px-1 py-1.5 rounded-lg text-xs bg-card-top"
                >
                    {i18n._(t`view more`)}
                </button>
            </div>
            <div style={{ width: '150px' }} className="text-center">
                <button className="uppercase border-2 border-white px-3 py-1.5 rounded-lg text-sm bg-green">
                    {i18n._(t`buy`)}
                </button>
            </div>
        </div>
    )
}

export default function Market(): JSX.Element {
    const { i18n } = useLingui()

    const listed = useListedCount({ refreshInterval: 5_000 })

    const [limit, setLimit] = useState(50)

    const s = useListedSummoners( { refreshInterval: 5_000 })

    const [skillsModal, setSkillsModal] = useState({ open: false, summoner: 0 })
    const [featsModal, setFeatsModal] = useState({ open: false, summoner: 0 })

    function openSkillsModal(summoner: number) {
        setSkillsModal({ open: true, summoner })
    }

    function openFeatsModal(summoner: number) {
        setFeatsModal({ open: true, summoner })
    }

    function closeSkills() {
        setSkillsModal({ open: false, summoner: 0 })
    }

    function closeFeats() {
        setFeatsModal({ open: false, summoner: 0 })
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setLimit(limit+50)
        }
    }

    function buttons(): JSX.Element {
        return (
            <div className="flex flex-row gap-x-3">
                <button className="rounded-3xl uppercase border-2 border-market-button">
                    <h2 className="py-1 px-3">{i18n._(t`market`)}</h2>
                </button>
                <button className="rounded-3xl uppercase border-2 border-market-button">
                    <h2 className="py-1 px-3">{i18n._(t`my listing`)}</h2>
                </button>
            </div>
        )
    }

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-2xl xl:text-3xl uppercase font-bold">
                            {i18n._(t`rarity summoners market`)}
                        </h1>
                    </div>
                    {buttons()}
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-md">{i18n._(t`List and Buy your summoners`)}</h3>
                </div>
                <div className="flex flex-row items-center justify-between mt-10">
                    <div>
                        <h1 className="text-xl font-bold">{i18n._(t`Filter With Tags:`)}</h1>
                    </div>
                    <div>
                        <span className="uppercase">
                            {i18n._(t`listed summoners:`)} {listed}
                        </span>
                    </div>
                </div>
                <div className="m-10 bg-item-background border-2 rounded-3xl overflow-y-scroll h-screen" onScroll={handleScroll}>
                    <MarketFeatsModal
                        open={featsModal.open}
                        closeFunction={closeFeats}
                        summoner={featsModal.summoner}
                    />
                    <MarketSkillsModal
                        open={skillsModal.open}
                        closeFunction={closeSkills}
                        summoner={skillsModal.summoner}
                    />
                    <div>
                        <div
                            style={{ width: '1478px' }}
                            className="bg-card-bottom bg-market-table-top font-bold flex flex-nowrap items-center p-5"
                        >
                            <div style={{ width: '125px' }} className="text-center">
                                <h2>{i18n._(t`ID No.`)}</h2>
                            </div>
                            <div style={{ width: '125px' }} className="text-center">
                                <h2>{i18n._(t`CLASS`)}</h2>
                            </div>
                            <div style={{ width: '80px' }} className="text-center">
                                <h2>{i18n._(t`PRICE.`)}</h2>
                            </div>
                            <div style={{ width: '80px' }} className="text-center">
                                <h2>{i18n._(t`LEVEL`)}</h2>
                            </div>
                            <div style={{ width: '80px' }} className="text-center">
                                <h2>{i18n._(t`XP`)}</h2>
                            </div>
                            <div style={{ width: '250px' }} className="text-center">
                                <h2>{i18n._(t`ATTRIBUTES`)}</h2>
                            </div>
                            <div style={{ width: '130px' }} className="text-center">
                                <h2>{i18n._(t`CLAIMED GOLD`)}</h2>
                            </div>
                            <div style={{ width: '130px' }} className="text-center">
                                <h2>{i18n._(t`UNCLAIMED GOLD`)}</h2>
                            </div>
                            <div style={{ width: '100px' }} className="text-center">
                                <h2>{i18n._(t`MATERIAL`)}</h2>
                            </div>
                            <div style={{ width: '150px' }} className="text-center">
                                <h2>{i18n._(t`SKILLS`)}</h2>
                            </div>
                            <div style={{ width: '150px' }} className="text-center">
                                <h2>{i18n._(t`FEAT`)}</h2>
                            </div>
                            <div style={{ width: '150px' }} className="text-center">
                                <h2>{i18n._(t`ACTION`)}</h2>
                            </div>
                        </div>
                        {s &&
                            s.map((s) => {
                                return (
                                    <SummonerRow
                                        summoner={s}
                                        key={s.id}
                                        featsModalFunc={openFeatsModal}
                                        skillsModalFunc={openSkillsModal}
                                    />
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}
