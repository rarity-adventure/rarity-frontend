import { useLingui } from '@lingui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import Loader from '../../components/Loader'
import { ItemData, SummonerFullData } from '../../hooks/useRarityLibrary'
import { useItems } from '../../state/items/hooks'
import ItemCard from '../../components/Cards/Item'
import Image from 'next/image'
import { useSummoners } from '../../state/summoners/hooks'
import SummonerSelector from '../../components/SummonerSelector'
import useRarityNames from '../../hooks/useRarityNames'
import { CLASSES_NAMES } from '../../constants/classes'
import useRarityGold from '../../hooks/useRarityGold'
import { CRAFTING_ALLOWANCE, RARITY_CRAFTING_ADDRESS, RARITY_NAMES_SUMMONER } from '../../constants'
import { BigNumber, utils } from 'ethers'
import toast from 'react-hot-toast'

export default function Names(): JSX.Element {
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
    }, [selectedSummoner])

    function approveGlobal() {
        toast
            .promise(gold_approve(selectedSummoner.id, RARITY_NAMES_SUMMONER, CRAFTING_ALLOWANCE), {
                loading: <b>{i18n._(t`Approving Names`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            })
            .then(() => setApprove(true))
    }

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

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10">
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
                                        <div className="flex flex-row items-center justify-between w-32 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                            <div className="py-1 w-2/3 text-center">
                                                <p>{selectedSummoner.gold.balance}</p>
                                            </div>
                                            <Image src="/img/coins/gold.png" width={50} height={40} />
                                        </div>
                                        <SummonerSelector summoners={summoners} select={setSelectedSummoner} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row mt-4 justify-center sm:hidden">
                            {summoners.length > 0 && selectedSummoner && (
                                <div className={'flex flex-row gap-4'}>
                                    <div className="flex flex-row items-center justify-between w-32 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                        <div className="py-1 w-2/3 text-center">
                                            <p>{selectedSummoner.gold.balance}</p>
                                        </div>
                                        <Image src="/img/coins/gold.png" width={50} height={40} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="sm:hidden">
                            <SummonerSelector summoners={summoners} select={setSelectedSummoner} />
                        </div>
                        {approve ? (
                            <div className="mt-20 text-center border-white border-4 w-1/2 mx-auto mb-20">
                                <p className="mt-5 p-5">Your summoner needs to pay 200 GOLD to get a name.</p>
                                <div className="text-left py-3 px-8">
                                    <span className="my-3 text-2xl">SUMMONER ID </span>
                                    <span className="text-2xl ml-20">: {selectedSummoner.id}</span>
                                </div>
                                <div className="text-left py-3 px-8">
                                    <span className="my-3 text-2xl">CLASS </span>
                                    <span style={{ marginLeft: '178px' }} className="text-2xl uppercase">
                                        : {CLASSES_NAMES[selectedSummoner.base._class]}
                                    </span>
                                </div>
                                <div className="text-left py-3 px-8">
                                    <span className="my-3 text-2xl">NAME </span>
                                    <span style={{ marginLeft: '197px' }} className="text-2xl">
                                        : <input className="text-center w-64 bg-item-background rounded-lg" />
                                    </span>
                                </div>
                                <div>
                                    <button
                                        className="bg-custom-selected p-2 mx-1 rounded-lg border-2 border-white text-white"
                                        onClick={() => verify()}
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-40 text-center mt-20">
                                <button
                                    onClick={() => {
                                        approveGlobal()
                                    }}
                                    className="bg-green border-2 border-white p-4 uppercase"
                                >
                                    {i18n._(t`approve names`)}
                                </button>
                            </div>
                        )}
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
