import { useLingui } from '@lingui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { ChevronLeft, ChevronRight } from 'react-feather'
import useRarityGold from '../../../hooks/useRarityGold'
import { useSummoners } from '../../../state/summoners/hooks'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import { CRAFTING_ALLOWANCE, RARITY_NAMES_SUMMONER } from '../../../constants'
import useRarityNames from '../../../hooks/useRarityNames'
import Loader from '../../Loader'
import SummonerSelector from '../../Selectors/Summoners'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../../constants/codex/classes'
import { sendToast } from '../../../functions/toast'
import { classNames } from '../../../functions/classNames'

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

    const [approving, setApproving] = useState(false)
    const [allowed, setAllowed] = useState<boolean>(false)

    const fetch_allowance = useCallback(async () => {
        const allowed = await gold_allowance(selectedSummoner.id, RARITY_NAMES_SUMMONER)
        console.log(allowed)
        if (allowed >= CRAFTING_ALLOWANCE) {
            setAllowed(true)
        } else {
            setAllowed(false)
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

    function approveGold() {
        setApproving(true)
        sendToast(
            gold_approve(selectedSummoner.id, RARITY_NAMES_SUMMONER, CRAFTING_ALLOWANCE),
            i18n._(t`Approving gold`)
        )
            .then(() => {
                setAllowed(true)
                setApproving(false)
            })
            .catch(() => setApproving(false))
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 m-8 mt-10">
                            <div className="text-xs sm:text-sm border-white border-2 bg-card-button p-2 rounded-lg px-4">
                                <p className="my-2">{i18n._(t`Get a name for your summoner`)}</p>
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
                                            <ChevronLeft size="40px" />
                                        </button>{' '}
                                        <div className="w-32 md:w-60 overflow-x-hidden overflow-ellipsis">
                                            <span className="text-xs md:text-xl mx-2 overflow-hidden whitespace-nowrap">
                                                {selectedSummoner.base._name !== ''
                                                    ? selectedSummoner.base._name
                                                    : i18n._(t`unknown`)}
                                            </span>
                                        </div>{' '}
                                        <button onClick={() => selectNextSummoner()}>
                                            <ChevronRight size="40px" />
                                        </button>
                                    </div>
                                    <p className="mt-4 md:text-xl uppercase border-2 border-white rounded-3xl">
                                        {i18n._(CLASSES_NAMES[selectedSummoner.base._class.toString()])}
                                    </p>
                                </div>
                            )}
                            <div className="text-xs sm:text-sm border-white border-2 bg-card-button p-2 rounded-lg px-4">
                                {selectedSummoner && selectedSummoner.base._name === '' ? (
                                    selectedSummoner.gold.balance >= 200 ? (
                                        allowed ? (
                                            <div>
                                                <p className="my-2 uppercase">{i18n._(t`name`)}:</p>
                                                <input
                                                    className={'text-white p-1.5 text-center bg-input my-2'}
                                                    onChange={(v) => setClaimName(v.target.value)}
                                                />
                                                <p className="my-2 text-center">
                                                    {claimName === '' ? (
                                                        <button className="opacity-50 cursor-not-allowed uppercase p-2 bg-card-top border-2 rounded-lg border-white">
                                                            {i18n._(t`verify`)}
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="uppercase p-2 bg-card-top border-2 rounded-lg border-white"
                                                            onClick={() => verify()}
                                                        >
                                                            {i18n._(t`verify`)}
                                                        </button>
                                                    )}
                                                </p>
                                                {verifying ? (
                                                    <div className="text-center mt-7">
                                                        <button>
                                                            <Loader size="20px" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={classNames(
                                                            'uppercase p-2 border-2 rounded-2xl mt-5 border-white w-48 mx-auto text-center',
                                                            verifyStatus === 'Valid' ? 'bg-green' : 'bg-red'
                                                        )}
                                                    >
                                                        {verifyStatus === 'Valid' ? (
                                                            <p>{i18n._(t`available`)}</p>
                                                        ) : (
                                                            <p>{i18n._(t`unavailable`)}</p>
                                                        )}
                                                    </div>
                                                )}
                                                {verifyStatus === 'Valid' && (
                                                    <div className="text-center">
                                                        <button
                                                            onClick={() =>
                                                                sendToast(
                                                                    claim(claimName, selectedSummoner.id),
                                                                    i18n._(t`Claiming name`)
                                                                )
                                                            }
                                                            className="uppercase p-2 bg-green border-2 border-white rounded-lg mt-5"
                                                        >
                                                            {i18n._(t`claim`)}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-center mt-5">
                                                    {i18n._(t`To create a name you need to approve gold spending`)}
                                                </p>
                                                <p className="text-center my-5">
                                                    <button
                                                        onClick={() => approveGold()}
                                                        className="uppercase p-2 bg-green border-2 border-white rounded-lg"
                                                    >
                                                        {approving ? <Loader size={'20px'} /> : i18n._(t`approve`)}
                                                    </button>
                                                </p>
                                            </div>
                                        )
                                    ) : (
                                        <div>
                                            <p className="text-center mt-10">
                                                {i18n._(
                                                    t`Your summoner needs to have more than 200 gold to claim a name`
                                                )}
                                            </p>
                                        </div>
                                    )
                                ) : (
                                    <div>
                                        <p className="text-center mt-10">
                                            {i18n._(t`Your summoner already has a name`)}
                                        </p>
                                    </div>
                                )}
                            </div>
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
