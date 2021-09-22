import { useLingui } from '@lingui/react'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { t } from '@lingui/macro'
import useRarityStarterPack from '../../hooks/useRarityStarterPack'

export default function Pack(): JSX.Element {
    const { i18n } = useLingui()

    const { buy_pack, packs_available, packs_opened } = useRarityStarterPack()

    const [packsAvailable, setPacksAvailable] = useState<number>(0)

    const fetch_packs_available = useCallback(async () => {
        const packs = await packs_available()
        setPacksAvailable(packs)
    }, [packs_available, setPacksAvailable])

    useEffect(() => {
        fetch_packs_available()
    }, [fetch_packs_available])

    const [packsOpened, setPacksOpened] = useState<number>(0)

    const fetch_packs_opened = useCallback(async () => {
        const opened = await packs_opened()
        setPacksOpened(opened)
    }, [packs_opened, setPacksOpened])

    useEffect(() => {
        fetch_packs_opened()
    }, [fetch_packs_opened])

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 px-5 pt-5 w-full gap-y-5">
                    <div className="mx-auto">
                        <Image
                            src="/img/pack.png"
                            width={386}
                            height={386}
                            alt="rarity starter pack"
                            className="mt-4"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <h1 className="text-3xl font-bold text-center md:text-left">
                            {i18n._(t`RARITY STARTER PACK`)}
                        </h1>
                        <p className="text-center md:text-left">
                            {i18n._(t`KICKSTART YOUR JOURNEY WITH THE RARITY STARTER PACK!`)}
                        </p>
                        <p className="text-center md:text-left">{i18n._(t`EACH PACK INCLUDES:`)}</p>
                        <div className="p-3 border-white border-2 rounded-3xl mt-4 bg-card-button text-xs md:text-sm">
                            <ul>
                                <li>
                                    * {i18n._(t`A LEVEL 2 SUMMONER FOR EACH OF THE 11 CLASSES (TOTAL 11 CHARACTERS)`)}
                                </li>
                                <li>* {i18n._(t`11,000 GOLD (1,000 PER SUMMONER)`)}</li>
                                <li>* {i18n._(t`300 CRAFTING MATERIALS`)}</li>
                                <li>* {i18n._(t`GREATSWORD + BREASTPLATE`)}</li>
                                <li>* {i18n._(t`LONGBOW + STUDDED LEATHER`)}</li>
                                <li>* {i18n._(t`LONGSWORD + LIGHT STEEL SHIELD`)}</li>
                                <li>
                                    * {i18n._(t`A RARITY GAME SUPPORTER NFT BADGE (LIMITED TO THE FIRST 1000 PACKS)`)}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <div className="p-3 border-white border-2 rounded-3xl mt-4 bg-card-button text-xs md:text-sm">
                            <p>{i18n._(t`EQUIPMENT`)}</p>
                            <p>* {i18n._(t`THREE GREAT EQUIPMENT COMBINATIONS TO BE PREPARED FOR THE WILDERNESS.`)}</p>
                            <p>{i18n._(t`MATERIAL`)}</p>
                            <p>* {i18n._(t`CRAFT YOUR OWN EXOTIC GEAR WITH CRAFTING MATERIALS.`)}</p>
                            <p>{i18n._(t`GOLD`)}</p>
                            <p>{i18n._(t`* IMMEDIATELY BUY A NAME FOR ALL OF YOUR SUMMONER WITH GOLD.`)}</p>
                        </div>
                    </div>
                    <div className="mx-auto text-center">
                        <p>{i18n._(t`GET YOUR SUPPORTER NFT BADGE`)}</p>
                        <Image
                            src="/img/badge.png"
                            width={200}
                            height={200}
                            alt="rarity supporter badge"
                            className="mt-4"
                        />
                        <p>{i18n._(t`LIMITED TO THE FIRST 1,000 PACKS`)}</p>
                    </div>
                    {/*<div className="col-span-1 text-center">
                        <div className="flex flex-row justify-center">
                            <div className="text-2xl w-56 font-bold bg-card-bottom rounded-2xl border-white border-2 p-5">
                                {i18n._(t`PACKS SOLD`)}
                            </div>
                        </div>
                    </div>*/}
                    {packsAvailable > 0 ? (
                        <div className="col-span-1 md:col-span-3 text-center">
                            <div className="flex flex-row justify-center">
                                <button
                                    onClick={async () => await buy_pack()}
                                    className="text-2xl w-56 font-bold bg-green rounded-2xl border-white border-2 p-5"
                                >
                                    {i18n._(t`BUY FOR 35 FTM`)}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="col-span-1 md:col-span-3 text-center">
                            <div className="flex flex-row justify-center">
                                <button className="opacity-50 cursor-not-allowed text-2xl w-56 font-bold bg-green rounded-2xl border-white border-2 p-5">
                                    {i18n._(t`BUY FOR 35 FTM`)}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="col-span-1 md:col-span-3 text-center mb-20">
                        <div className="flex flex-row justify-center">
                            <div className="text-lg font-bold rounded-2xl border-white border-2 p-3">
                                {i18n._(t`PACKS AVAILABLE`)}: {packsAvailable}
                            </div>
                        </div>
                        <div className="flex flex-row justify-center mt-5">
                            <div className="text-lg font-bold rounded-2xl border-white border-2 p-3">
                                {i18n._(t`PACKS OPENED`)}: {packsOpened}
                            </div>
                        </div>
                    </div>
                    <div className="text-xs lg:text-sm col-span-1 md:col-span-3">
                        {i18n._(t`*RARITY STARTER PACKS ARE A COMMUNITY-RUN PROJECT TO HELP ONBOARD NEW PLAYERS.`)}
                    </div>
                </div>
            </div>
        </div>
    )
}
