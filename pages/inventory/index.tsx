import { useLingui } from '@lingui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { ItemData, SummonerFullData } from '../../hooks/useRarityLibrary'
import { useItems, useItemsLoading } from '../../state/items/hooks'
import ItemCard from '../../components/Cards/Item'
import Image from 'next/image'
import { useSummoners } from '../../state/summoners/hooks'
import Loader from '../../components/Loader'
import BulkTransfer from '../../components/Transfer'
import useRarityStarterPack from '../../hooks/useRarityStarterPack'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import SellItemsModal from '../../components/Modal/modals/SellItems'
import { GoldImage } from '../../components/Coins/gold'
import { MaterialImage } from '../../components/Coins/material'

export default function Inventory(): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const it = useItems()

    const loading = useItemsLoading()

    const s = useSummoners()

    const { get_sellable_items_between_ids } = useRarityStarterPack()

    const [items, setItems] = useState<ItemData[]>(it)
    const [summoners, setSummoners] = useState<SummonerFullData[]>(s)
    const [sellable, setSellable] = useState<number[]>([])

    useEffect(() => {
        setItems(it)
    }, [it])

    useEffect(() => {
        setSummoners(s)
    }, [s])

    const fetch_sellable = useCallback(
        async (check: number[]) => {
            const sellable = await get_sellable_items_between_ids(account, check[0], check[check.length - 1])
            setSellable(sellable)
        },
        [account, get_sellable_items_between_ids]
    )

    useEffect(() => {
        const check = items
            .map((i) => i.token_id)
            .filter((i) => i > 1000)
            .sort()
            .reverse()
        fetch_sellable(check)
    }, [items, fetch_sellable])

    const [modal, setModal] = useState(false)

    function close() {
        setModal(false)
    }

    return (
        <div className="w-full z-25">
            <SellItemsModal open={modal} closeFunction={close} items={sellable} />
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
                                            <MaterialImage />
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
                                            <GoldImage />
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
                                        <MaterialImage />
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
                                        <GoldImage />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="md:p-14">
                            <div className="grid grid-cols-1 rounded-lg md:grid-cols-2 lg:grid-cols-4 mt-7 items-center border-2 bg-item-background border-white gap-2 gap-y-4 p-4 xl:gap-3 max-h-screen overflow-scroll">
                                {items.map((i) => {
                                    return (
                                        <ItemCard
                                            key={i.token_id}
                                            userItem={i}
                                            sellable={sellable.indexOf(i.token_id) !== -1}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        {/*
                        { sellable.length > 0 && (
*/}

                        <div className="flex flex-row items-center justify-center mb-10">
                            <button onClick={() => setModal(true)}>
                                {'>>'} {i18n._(t`You have`)} {sellable.length} {i18n._(t`items available for sale `)}{' '}
                                {'<<'}
                            </button>
                        </div>
                        {/*
                )}
*/}
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
