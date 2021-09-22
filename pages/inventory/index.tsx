import { useLingui } from '@lingui/react'
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { ItemData, SummonerFullData } from '../../hooks/useRarityLibrary'
import { useItems, useItemsLoading } from '../../state/items/hooks'
import ItemCard from '../../components/Cards/Item'
import Image from 'next/image'
import { useSummoners } from '../../state/summoners/hooks'
import Loader from '../../components/Loader'
import BulkTransfer from '../../components/Transfer'

export default function Inventory(): JSX.Element {
    const { i18n } = useLingui()

    const it = useItems()

    const loading = useItemsLoading()

    const s = useSummoners()

    const [items, setItems] = useState<ItemData[]>(it)
    const [summoners, setSummoners] = useState<SummonerFullData[]>(s)

    useEffect(() => {
        setItems(it)
    }, [it])

    useEffect(() => {
        setSummoners(s)
    }, [s])

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10">
                {loading ? (
                    <div className="flex my-10 justify-center">
                        <Loader size={'50'} />
                    </div>
                ) : items.length > 0 ? (
                    <>
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <h1 className="text-2xl xl:text-3xl uppercase font-bold">{i18n._(t`inventory`)}</h1>
                            </div>
                            <BulkTransfer s={summoners} />
                            <div className="hidden sm:inline-flex">
                                {summoners.length > 0 && (
                                    <div className={'flex flex-row gap-4'}>
                                        <div className="flex flex-row items-center justify-between w-32 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                            <div className="py-1 w-2/3 text-center">
                                                <p>
                                                    {summoners
                                                        .map((s) => {
                                                            return s.materials.balance
                                                        })
                                                        .reduce((a, b) => a + b)}
                                                </p>
                                            </div>
                                            <Image src="/img/coins/material.png" width={40} height={40} />
                                        </div>
                                        <div className="flex flex-row items-center justify-between w-32 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                            <div className="py-1 w-2/3 text-center">
                                                <p>
                                                    {summoners
                                                        .map((s) => {
                                                            return s.gold.balance
                                                        })
                                                        .reduce((a, b) => a + b)}
                                                </p>
                                            </div>
                                            <Image src="/img/coins/gold.png" width={50} height={40} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row mt-4 justify-center sm:hidden">
                            {summoners.length > 0 && (
                                <div className={'flex flex-row gap-4'}>
                                    <div className="flex flex-row items-center justify-between w-32 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                        <div className="py-1 w-2/3 text-center">
                                            <p>
                                                {summoners
                                                    .map((s) => {
                                                        return s.materials.balance
                                                    })
                                                    .reduce((a, b) => a + b)}
                                            </p>
                                        </div>
                                        <Image src="/img/coins/material.png" width={40} height={40} />
                                    </div>
                                    <div className="flex flex-row items-center justify-between w-32 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                        <div className="py-1 w-2/3 text-center">
                                            <p>
                                                {summoners
                                                    .map((s) => {
                                                        return s.gold.balance
                                                    })
                                                    .reduce((a, b) => a + b)}
                                            </p>
                                        </div>
                                        <Image src="/img/coins/gold.png" width={50} height={40} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="md:p-14">
                            <div className="grid grid-cols-1 rounded-lg md:grid-cols-2 lg:grid-cols-4 mt-7 items-center border-2 bg-item-background border-white gap-2 gap-y-4 p-4 xl:gap-3 max-h-screen overflow-scroll">
                                {items.map((i) => {
                                    return <ItemCard key={i.token_id} userItem={i} />
                                })}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex my-10 justify-center">
                        <div className="text-2xl uppercase">
                            <h1>{i18n._(t`no items`)}</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
