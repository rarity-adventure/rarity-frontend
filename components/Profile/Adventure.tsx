import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import { secondsRender } from '../../functions/secondsToText'
import useRarityHelper from '../../hooks/useRarityHelper'
import toast, { Toaster } from 'react-hot-toast'
import { RARITY_HELPER_ADDRESS } from '../../constants'
import useRarity from '../../hooks/useRarity'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { SummonerFullData } from '../../hooks/useRarityLibrary'

interface SkillProfileProps {
    summoner: SummonerFullData
}

function AdventureProfile({ summoner }: SkillProfileProps): JSX.Element {
    const { i18n } = useLingui()

    const { adventure, cellar } = useRarityHelper()

    const { account } = useActiveWeb3React()

    const { isApprovedForAll, setApprovalForAll } = useRarity()

    async function cellarSend() {
        await toast.promise(cellar([summoner.id], [summoner.id]), {
            loading: <b>{i18n._(t`Sending summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function adventureSend() {
        await toast.promise(adventure([summoner.id]), {
            loading: <b>{i18n._(t`Sending summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function approveHelper() {
        await toast.promise(setApprovalForAll(RARITY_HELPER_ADDRESS), {
            loading: <b>{i18n._(t`Approving helper contract`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    const [helperApproval, setHelperApproval] = useState(false)

    const fetch_approval = useCallback(async () => {
        const approved = await isApprovedForAll(account, RARITY_HELPER_ADDRESS)
        setHelperApproval(approved)
    }, [])

    useEffect(() => {
        if (!account) return
        fetch_approval()
    }, [isApprovedForAll, account])

    return (
        <div className="max-w-screen-md mx-auto">
            <Toaster containerClassName="z-30" />
            <div className="flex flex-row w-full items-center">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-2 w-full">
                    <div className="bg-card-top col-span-3 md:p-2 p-1 bg-background-cards border-white border-2 rounded-t-2xl md:rounded-tl-2xl md:rounded-tr-none text-left">
                        <span className="ml-1.5 uppercase">
                            {i18n._(t`ID`)}: {parseInt(summoner.id, 16)}
                        </span>
                    </div>
                    <div className="w-full mt-3 md:mt-0 md:p-2 p-1 bg-card-button col-span-2 bg-background-cards border-white border-2 md:rounded-tr-2xl text-center">
                        <span className="uppercase">{i18n._(t`adventure`)}</span>
                    </div>
                </div>
            </div>
            <div className="border-white border-2 rounded-b-2xl my-3 bg-background-cards w-full bg-card-content">
                <div className="grid grid-cols-1 w-full px-2 md:mt-1 divide-white divide-y-2 overflow-scroll overflow-hidden h-60">
                    <div className="uppercase">
                        <div className="flex flex-row mt-2 justify-between p-4">
                            <span>{i18n._(t`adventure`)}</span>
                            {parseInt(summoner.base._log.toString()) * 1000 < Date.now() ? (
                                helperApproval ? (
                                    <button
                                        className="uppercase text-xs p-2 bg-background-end border-white rounded-lg border-2"
                                        onClick={() => adventureSend()}
                                    >
                                        {i18n._(t`go for adventure`)}
                                    </button>
                                ) : (
                                    <button
                                        className="uppercase text-xs p-2 bg-background-end border-white rounded-lg border-2"
                                        onClick={() => approveHelper()}
                                    >
                                        {i18n._(t`approve`)}
                                    </button>
                                )
                            ) : (
                                <button className="uppercase text-xs bg-red p-2 cursor-not-allowed bg-background-end border-white rounded-lg border-2">
                                    {secondsRender(
                                        (parseInt(summoner.base._log.toString()) * 1000 - Date.now()) / 1000
                                    )}
                                </button>
                            )}
                        </div>
                        <h1 className="text-center text-xl">{i18n._(t`Dungeons`)}</h1>
                        <div className="flex flex-row mt-2 justify-between p-4">
                            <span>{i18n._(t`The Cellar`)}</span>
                            {parseInt(summoner.materials.log.toString()) * 1000 < Date.now() ? (
                                summoner.materials.scout.toString() === '0' ? (
                                    <button className="uppercase text-xs bg-red cursor-not-allowed p-2 bg-background-end border-white rounded-lg border-2">
                                        {i18n._(t`You wont get anything`)}
                                    </button>
                                ) : (
                                    <button
                                        className="uppercase text-xs p-2 bg-background-end border-white rounded-lg border-2"
                                        onClick={() => cellarSend()}
                                    >
                                        {i18n._(t`go to the cellar`)}
                                    </button>
                                )
                            ) : (
                                <button className="uppercase text-xs p-2 bg-red cursor-not-allowed border-white rounded-lg border-2">
                                    {secondsRender(
                                        (parseInt(summoner.materials.log.toString()) * 1000 - Date.now()) / 1000
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdventureProfile
