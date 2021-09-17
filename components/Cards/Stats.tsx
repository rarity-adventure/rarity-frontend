import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { RefreshIcon } from '@heroicons/react/outline'
import { QuestionMarkCircleIcon, PlusIcon, MinusIcon } from '@heroicons/react/solid'
import { utils } from 'ethers'
import React, { useEffect, useState } from 'react'
import HeadlessUIModal from '../Modal/HeadlessUIModal'
import ModalHeader from '../Modal/ModalHeader'
import { ATTRIBUTES } from '../../constants/codex/attributes'
import { calcAPCost } from '../../functions/calcAPCost'
import toast from 'react-hot-toast'
import useRarityGold from '../../hooks/useRarityGold'
import useRarityAttributes from '../../hooks/useRarityAttributes'
import { SummonerFullData } from '../../hooks/useRarityLibrary'

function SummonerStatsCard({ summoner }: { summoner: SummonerFullData }): JSX.Element {
    const { i18n } = useLingui()

    const { point_buy } = useRarityAttributes()

    const [attribute, setAttribute] = useState('str')
    const [modal, setModalOpen] = useState(false)

    const [additions, setAddition] = useState<{
        str: number
        dex: number
        con: number
        int: number
        wis: number
        cha: number
    }>({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 })

    const [totalAP, setTotalApp] = useState(0)

    const [assignable, setAssignable] = useState(false)

    useEffect(() => {
        const points = summoner.ability_scores.total_points - summoner.ability_scores.spent_points
        const assignable = points > 0
        setAssignable(assignable)
        setTotalApp(points)
    }, [summoner])

    function handleAddition(attr: string) {
        const addition = additions[attr] + 1
        const newState = Object.assign({}, additions, { [attr]: addition })
        const ap = calcAvailableAP(newState)
        if (ap >= 0) {
            setAddition(newState)
            setTotalApp(ap)
        }
    }

    function handleSubstraction(attr: string) {
        const addition = additions[attr] - 1
        if (addition >= 0) {
            const newState = Object.assign({}, additions, { [attr]: additions[attr] - 1 })
            const ap = calcAvailableAP(newState)
            setAddition(newState)
            setTotalApp(ap)
        }
    }

    function calcAvailableAP(state: { [k: string]: number }): number {
        let ap = summoner.ability_scores.total_points - summoner.ability_scores.spent_points
        ap -= calcAPCost(state['str'] + summoner.ability_scores.attributes._str)
        ap -= calcAPCost(state['dex'] + summoner.ability_scores.attributes._dex)
        ap -= calcAPCost(state['con'] + summoner.ability_scores.attributes._con)
        ap -= calcAPCost(state['int'] + summoner.ability_scores.attributes._int)
        ap -= calcAPCost(state['wis'] + summoner.ability_scores.attributes._wis)
        ap -= calcAPCost(state['cha'] + summoner.ability_scores.attributes._cha)
        return ap
    }

    function reset() {
        let ap = summoner.ability_scores.total_points - summoner.ability_scores.spent_points
        setAddition({ str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 })
        setTotalApp(ap)
    }

    const { claim } = useRarityGold()

    async function claimGold() {
        await toast.promise(claim(summoner.id), {
            loading: <b>{i18n._(t`Claiming gold`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function assignPoints() {
        await toast.promise(
            point_buy(
                summoner.id,
                additions['str'] + summoner.ability_scores.attributes._str,
                additions['dex'] + summoner.ability_scores.attributes._dex,
                additions['con'] + summoner.ability_scores.attributes._con,
                additions['int'] + summoner.ability_scores.attributes._int,
                additions['wis'] + summoner.ability_scores.attributes._wis,
                additions['cha'] + summoner.ability_scores.attributes._cha
            ),
            {
                loading: <b>{i18n._(t`Assigning points`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            }
        )
    }

    return (
        <div className="max-w-screen-md mx-auto z-20">
            <div className="flex flex-row w-full items-center">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-2 w-full">
                    <div className="bg-card-top col-span-2 md:p-2 p-1 bg-background-cards border-white border-2 rounded-t-2xl text-left">
                        <span className="ml-1.5">
                            {i18n._(t`ID`)}: {summoner.id}
                        </span>
                    </div>
                </div>
            </div>
            <div className="border-white border-2 my-3 bg-background-cards w-full bg-card-content">
                <div className="flex flex-row w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 mt-2">
                        <div>
                            <span className="uppercase">{i18n._(t`level`)}</span>
                            <span className="text-transparent -ml-1 md:ml-2">&nbsp;</span>:
                            <span className="ml-1.5">{summoner.base._level.toString()}</span>
                        </div>
                        <div>
                            <span className="uppercase">{i18n._(t`ap`)}</span>
                            <span className="text-transparent ml-8 md:ml-8">&nbsp;</span>:
                            <span className="ml-1.5">{totalAP.toString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 md:mt-2">
                        <div>
                            <span className="uppercase">{i18n._(t`xp`)}</span>
                            <span className="text-transparent ml-8 md:ml-11">&nbsp;</span>:
                            <span className="ml-1.5">{summoner.base._xp}</span>
                        </div>
                        <div>
                            <span className="uppercase">{i18n._(t`gold`)}</span>
                            <span className="text-transparent ml-2 md:ml-2">&nbsp;</span>:
                            <span className="ml-1.5">{summoner.gold.balance}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full my-4">
                    <span className="w-full mx-10 border-white border-b-2" />
                </div>
                <div className="flex flex-row w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 mt-2">
                        <div className="flex flex-row justify-start items-center">
                            <div className="mr-1 mt-1 -ml-2 opacity-50">
                                <button
                                    onClick={() => {
                                        setAttribute('str')
                                        setModalOpen(true)
                                    }}
                                >
                                    <QuestionMarkCircleIcon width={18} />
                                </button>
                            </div>
                            <div>
                                <span className="uppercase">{i18n._(t`str`)}</span>
                                <span className="text-transparent ml-2 md:ml-5">&nbsp;</span>:
                                <span className="ml-1.5">
                                    {summoner.ability_scores.attributes._str + additions['str']}
                                </span>
                            </div>
                            <div className="absolute flex flex-row justify-between ml-52">
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleSubstraction('str')}
                                    >
                                        <MinusIcon width={18} />
                                    </button>
                                </div>
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleAddition('str')}
                                    >
                                        <PlusIcon width={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-center">
                            <div className="mr-1 mt-1 -ml-2 opacity-50">
                                <button
                                    onClick={() => {
                                        setAttribute('int')
                                        setModalOpen(true)
                                    }}
                                >
                                    <QuestionMarkCircleIcon width={18} />
                                </button>
                            </div>
                            <div>
                                <span className="uppercase">{i18n._(t`int`)}</span>
                                <span className="text-transparent ml-3 md:ml-3">&nbsp;</span>:
                                <span className="ml-1.5">
                                    {summoner.ability_scores.attributes._int + additions['int']}
                                </span>
                            </div>
                            <div className="absolute flex flex-row justify-between ml-52">
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleSubstraction('int')}
                                    >
                                        <MinusIcon width={18} />
                                    </button>
                                </div>
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleAddition('int')}
                                    >
                                        <PlusIcon width={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 md:mt-2">
                        <div className="flex flex-row justify-start items-center">
                            <div className="mr-1 mt-1 -ml-2 opacity-50">
                                <button
                                    onClick={() => {
                                        setAttribute('dex')
                                        setModalOpen(true)
                                    }}
                                >
                                    <QuestionMarkCircleIcon width={18} />
                                </button>
                            </div>
                            <div>
                                <span className="uppercase">{i18n._(t`dex`)}</span>
                                <span className="text-transparent ml-2 md:ml-5">&nbsp;</span>:
                                <span className="ml-1.5">
                                    {summoner.ability_scores.attributes._dex + additions['dex']}
                                </span>
                            </div>
                            <div className="absolute flex flex-row justify-between ml-52">
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleSubstraction('dex')}
                                    >
                                        <MinusIcon width={18} />
                                    </button>
                                </div>
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleAddition('dex')}
                                    >
                                        <PlusIcon width={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-center">
                            <div className="mr-1 mt-1 -ml-2 opacity-50">
                                <button
                                    onClick={() => {
                                        setAttribute('wis')
                                        setModalOpen(true)
                                    }}
                                >
                                    <QuestionMarkCircleIcon width={18} />
                                </button>
                            </div>
                            <div>
                                <span className="uppercase">{i18n._(t`wis`)}</span>
                                <span className="text-transparent ml-3 md:ml-3">&nbsp;</span>:
                                <span className="ml-1.5">
                                    {summoner.ability_scores.attributes._wis + additions['wis']}
                                </span>
                            </div>
                            <div className="absolute flex flex-row justify-between ml-52">
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleSubstraction('wis')}
                                    >
                                        <MinusIcon width={18} />
                                    </button>
                                </div>
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleAddition('wis')}
                                    >
                                        <PlusIcon width={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-full pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 md:mt-2">
                        <div className="flex flex-row justify-start items-center">
                            <div className="mr-1 mt-1 -ml-2 opacity-50">
                                <button
                                    onClick={() => {
                                        setAttribute('con')
                                        setModalOpen(true)
                                    }}
                                >
                                    <QuestionMarkCircleIcon width={18} />
                                </button>
                            </div>
                            <div>
                                <span className="uppercase">{i18n._(t`con`)}</span>
                                <span className="text-transparent ml-2 md:ml-5">&nbsp;</span>:
                                <span className="ml-1.5">
                                    {summoner.ability_scores.attributes._con + additions['con']}
                                </span>
                            </div>
                            <div className="absolute flex flex-row justify-between ml-52">
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleSubstraction('con')}
                                    >
                                        <MinusIcon width={18} />
                                    </button>
                                </div>
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleAddition('con')}
                                    >
                                        <PlusIcon width={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-center">
                            <div className="mr-1 mt-1 -ml-2 opacity-50">
                                <button
                                    onClick={() => {
                                        setAttribute('cha')
                                        setModalOpen(true)
                                    }}
                                >
                                    <QuestionMarkCircleIcon width={18} />
                                </button>
                            </div>
                            <div>
                                <span className="uppercase">{i18n._(t`cha`)}</span>
                                <span className="text-transparent ml-2 md:ml-2">&nbsp;</span>:
                                <span className="ml-1.5">
                                    {summoner.ability_scores.attributes._cha + additions['cha']}
                                </span>
                            </div>
                            <div className="absolute flex flex-row justify-between ml-52">
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleSubstraction('cha')}
                                    >
                                        <MinusIcon width={18} />
                                    </button>
                                </div>
                                <div className="mt-1">
                                    <button
                                        className="text-white rounded-full hover:bg-white hover:bg-opacity-5"
                                        onClick={() => handleAddition('cha')}
                                    >
                                        <PlusIcon width={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full">
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-2 w-full">
                    <div className="hover:bg-card-content text-lg hover:text-grey bg-card-bottom w-full bg-red bg-background-cards border-white border-2 md:rounded-b-2xl mb-3 md:mb-0 text-left">
                        <button className="w-full md:p-1" onClick={() => reset()}>
                            <div className="flex flex-row p-1 justify-center items-center">
                                <RefreshIcon width={30} />
                            </div>
                        </button>
                    </div>
                    {summoner.gold.claimable > 0 ? (
                        <div className="hover:bg-card-content text-lg hover:text-grey bg-card-bottom col-span-3 bg-background-cards border-white border-2 mb-3 md:mb-0 md:rounded-bl-2xl text-center">
                            <button className="w-full p-2" onClick={() => claimGold()}>
                                <span className="uppercase">{i18n._(t`claim gold`)}</span>
                            </button>
                        </div>
                    ) : (
                        <div className="bg-card-content cursor-not-allowed text-lg text-grey bg-card-bottom col-span-3 bg-background-cards border-white border-2 mb-3 md:mb-0 md:rounded-bl-2xl text-center">
                            <button className="w-full p-2">
                                <span className="uppercase">{i18n._(t`claim gold`)}</span>
                            </button>
                        </div>
                    )}

                    {totalAP === 0 && assignable ? (
                        <div className="hover:bg-card-content text-lg hover:text-grey col-span-2 bg-card-bottom bg-background-cards border-2 rounded-b-2xl md:rounded-br-2xl text-center border-white">
                            <button className="w-full p-2" onClick={() => assignPoints()}>
                                <span className="uppercase">{i18n._(t`assign points`)}</span>
                            </button>
                        </div>
                    ) : (
                        <div className="bg-card-content text-grey text-lg cursor-not-allowed col-span-2 bg-card-bottom bg-background-cards border-2 rounded-b-2xl md:rounded-br-2xl text-center border-white">
                            <button className="w-full p-2">
                                <span className="uppercase">{i18n._(t`assign points`)}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <HeadlessUIModal isOpen={modal} onDismiss={() => setModalOpen(false)}>
                <div className="bg-background-end rounded-lg border-2 border-white">
                    <ModalHeader title={i18n._(ATTRIBUTES[attribute].name)} onClose={() => setModalOpen(false)} />
                    <div className="text-justify text-white p-4 pb-8 gap-5">
                        <h2>{i18n._(ATTRIBUTES[attribute].description)}</h2>
                    </div>
                    <div className="flex flex-row justify-center pb-8">
                        <a
                            className="uppercase border-white border-2 border-round text-white p-2 rounded-lg"
                            target="_blank"
                            rel="noreferrer"
                            href={ATTRIBUTES[attribute].url}
                        >
                            <h2>{i18n._(t`read more`)}</h2>
                        </a>
                    </div>
                </div>
            </HeadlessUIModal>
        </div>
    )
}

export default SummonerStatsCard
