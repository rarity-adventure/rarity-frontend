import { useLingui } from '@lingui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { ChevronLeft, ChevronRight } from 'react-feather'
import useRarityGold from '../../hooks/useRarityGold'
import { useSummoners } from '../../state/summoners/hooks'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { CRAFTING_ALLOWANCE, RARITY_NAMES_SUMMONER } from '../../constants'
import useRarityNames from '../../hooks/useRarityNames'
import Loader from '../Loader'
import SummonerSelector from '../Selectors/Summoners'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/codex/classes'

export default function NamesMarket(): JSX.Element {
    const { i18n } = useLingui()

    const s = useSummoners()

    const { gold_allowance, gold_approve } = useRarityGold()

    const [summoners, setSummoners] = useState<SummonerFullData[]>(s)

    useEffect(() => {
        setSummoners(s)
    }, [s])

    const [selectedSummoner, setSelectedSummoner] = useState<SummonerFullData | undefined>(undefined)

    useEffect(() => {
        if (summoners.length > 0 && !selectedSummoner) {
            setSelectedSummoner(summoners[0])
        }
    }, [summoners, selectedSummoner])

    const [approve, setApprove] = useState<boolean>(false)

    const fetch_allowance = useCallback(async () => {
        const allowed = await gold_allowance(selectedSummoner.id, RARITY_NAMES_SUMMONER)
        if (allowed >= CRAFTING_ALLOWANCE) {
            setApprove(true)
        }
    }, [gold_allowance, selectedSummoner])

    useEffect(() => {
        if (selectedSummoner) {
            fetch_allowance()
        }
    }, [selectedSummoner, fetch_allowance])


    const { claim, validate_name, is_name_claimed } = useRarityNames()

    const [claimName, setClaimName] = useState('')

    const [verifyStatus, setVerify] = useState('')
    const [verifying, setVerifying] = useState(false)

    async function verify() {
        setVerifying(true)
        const calls = []
        calls.push(validate_name(claimName))
        calls.push(is_name_claimed(claimName))
        const responses = await Promise.all(calls)
        setVerify(responses[0] && !responses[1] ? 'Valid' : !responses[0] ? 'Invalid' : 'Unavailable')
        setVerifying(false)
    }

    function selectPrevSummoner() {
        const currIndex = summoners.map((s) => s.id).indexOf(selectedSummoner.id)
        if (currIndex !== 0) {
            setSelectedSummoner(summoners[currIndex - 1])
        }
    }

    function selectNextSummoner() {
        const currIndex = summoners.map((s) => s.id).indexOf(selectedSummoner.id)
        if (currIndex < summoners.length - 1) {
            setSelectedSummoner(summoners[currIndex + 1])
        }
    }

    return (
        <div className="w-full z-25">
            <div className="m-10 z-10">
                {summoners.length > 0 ? (
                    <>
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <h1 className="text-2xl xl:text-3xl uppercase font-bold">
                                    {i18n._(t`rarity name shop`)}
                                </h1>
                            </div>
                            <div className="hidden sm:inline-flex">
                                {summoners.length > 0 && selectedSummoner && (
                                    <div className={'flex flex-row gap-4'}>
                                        <SummonerSelector summoners={summoners} select={setSelectedSummoner} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="sm:hidden">
                            <SummonerSelector summoners={summoners} select={setSelectedSummoner} />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 m-8 mt-20">
                            <div className="border-white border-2 bg-card-bottom p-2 rounded-lg px-8">
                                <p className="my-2">{i18n._(t`Get a rarity name for your summoner`)}</p>
                                <p className="my-2">{i18n._(t`Claiming a name will cost your summoner 200 GOLD`)}</p>
                                <p className="my-2">{i18n._(t`All names are unique and one-of-a-kind`)}</p>
                                <p className="my-2">{i18n._(t`For names your can only:`)}</p>
                                <ul>
                                    <li>
                                        <p className="my-2">* {i18n._(t`Use up to 25 characters`)}</p>
                                    </li>
                                    <li>
                                        <p className="my-2">* {i18n._(t`A-Z lower and uppercase`)}</p>
                                    </li>
                                    <li>
                                        <p className="my-2">* {i18n._(t`Numbers 0-9`)}</p>
                                    </li>
                                    <li>
                                        <p className="my-2">* {i18n._(t`Spaces are allowed`)}</p>
                                    </li>
                                </ul>
                            </div>
                            {selectedSummoner && (
                                <div className="text-center mx-auto  mt-2">
                                    {CLASSES_IMAGES[selectedSummoner.base._class.toString()]}
                                    <div className="flex flex-row items-center text-center justify-center uppercase text-lg md:text-3xl ">
                                        <button onClick={() => selectPrevSummoner()}>
                                            <ChevronLeft />
                                        </button>{' '}
                                        <div className="w-32 md:w-60 overflow-x-hidden overflow-ellipsis">
                                            <span className="text-xs md:text-xl mx-2 overflow-hidden whitespace-nowrap">
                                                {selectedSummoner.base._name !== ''
                                                    ? selectedSummoner.base._name
                                                    : i18n._(t`unknown`)}
                                            </span>
                                        </div>{' '}
                                        <button onClick={() => selectNextSummoner()}>
                                            <ChevronRight />
                                        </button>
                                    </div>
                                    <p className="mt-4 md:text-xl uppercase border-2 border-white rounded-3xl">
                                        {i18n._(CLASSES_NAMES[selectedSummoner.base._class.toString()])}
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex my-10 justify-center">
                        <Loader size={'50px'} />
                    </div>
                )}
            </div>
        </div>
    )
}
