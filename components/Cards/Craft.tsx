import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { Item, ITEM_TYPE, ITEMS } from '../../constants/codex/items'
import ItemModal from '../Modal/modals/Item'
import Image from 'next/image'
import useRarityGold from '../../hooks/useRarityGold'
import useRarityCellar from '../../hooks/useRarityCellar'
import { CRAFTING_ALLOWANCE, RARITY_CRAFTING_SUMMONER } from '../../constants'
import toast from 'react-hot-toast'

enum View {
    GOODS,
    WEAPONS,
    ARMORS,
}

function SummonerCraftCard({ summoner }: { summoner: SummonerFullData }): JSX.Element {
    const { i18n } = useLingui()

    const [item, setItem] = useState<Item | undefined>(undefined)

    const [modal, setModal] = useState(false)

    const { gold_allowance, gold_approve } = useRarityGold()

    const { material_allowance, material_approve } = useRarityCellar()

    const [approval, setApproval] = useState({ gold: false, material: false })

    function openModal(item: Item) {
        setItem(item)
        setModal(true)
    }

    function craftModal(craft: boolean) {
        setModal(false)
        if (!craft) {
            setItem(undefined)
        }
    }

    const fetch_allowance = useCallback(async () => {
        const goldAllowance = await gold_allowance(summoner.id, RARITY_CRAFTING_SUMMONER)
        const matAllowance = await material_allowance(summoner.id, RARITY_CRAFTING_SUMMONER)
        setApproval({ gold: goldAllowance >= CRAFTING_ALLOWANCE, material: matAllowance >= CRAFTING_ALLOWANCE })
    }, [gold_allowance, material_allowance, summoner])

    useEffect(() => {
        fetch_allowance()
    }, [summoner])

    async function approveGold() {
        toast
            .promise(gold_approve(summoner.id, RARITY_CRAFTING_SUMMONER, CRAFTING_ALLOWANCE), {
                loading: <b>{i18n._(t`Approving Gold`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            })
            .then(() => setApproval({ gold: true, material: approval.material }))
    }

    function approveMaterial() {
        toast
            .promise(material_approve(summoner.id, RARITY_CRAFTING_SUMMONER, CRAFTING_ALLOWANCE), {
                loading: <b>{i18n._(t`Approving Materials`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            })
            .then(() => setApproval({ gold: approval.gold, material: true }))
    }

    const [view, setView] = useState<View>(0)
    return (
        <div className="max-w-screen-md mx-auto">
            <ItemModal open={modal} closeFunction={craftModal} item={item} />
            <div className="flex flex-row w-full items-center">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-2 w-full">
                    <div className="bg-card-top col-span-3 md:p-2 p-1 bg-background-cards border-white border-2 rounded-t-2xl md:rounded-tl-2xl md:rounded-tr-none text-left">
                        <span className="ml-1.5 uppercase">
                            {i18n._(t`ID`)} {summoner.id}
                        </span>
                    </div>
                    <div className="w-full mt-3 md:mt-0 md:p-2 p-1 bg-card-button col-span-2 bg-background-cards border-white border-2 md:rounded-tr-2xl text-center">
                        <span className="uppercase">{i18n._(t`crafting`)}</span>
                    </div>
                </div>
            </div>
            <div className="border-white border-2 rounded-b-2xl my-3 bg-background-cards w-full bg-card-content">
                {!item && (
                    <>
                        <div className="flex flex-row">
                            <div className="ml-1.5 md:ml-3 text-center mt-2">
                                <button
                                    onClick={() => setView(View.GOODS)}
                                    style={{ fontSize: '0.8rem' }}
                                    className="py-1 border-2 px-4 border-white rounded-l-lg uppercase"
                                >
                                    {i18n._(t`goods`)}
                                </button>
                            </div>
                            <div className="text-center -ml-1 mt-2">
                                <button
                                    style={{ fontSize: '0.8rem' }}
                                    onClick={() => setView(View.WEAPONS)}
                                    className="py-1 border-t-2 border-b-2 px-4 border-white uppercase"
                                >
                                    {i18n._(t`weapons`)}
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <button
                                    style={{ fontSize: '0.8rem' }}
                                    onClick={() => setView(View.ARMORS)}
                                    className="py-1 border-2 px-4 border-white rounded-r-lg uppercase"
                                >
                                    armors
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 w-full px-4 py-2 divide-white divide-y-2 overflow-scroll overflow-hidden h-60 mb-2">
                            {view === View.GOODS && (
                                <div className="divide-white divide-y-2">
                                    {Object.keys(ITEMS[ITEM_TYPE.GOOD]).map((k) => {
                                        {
                                            return (
                                                <div key={k}>
                                                    <button
                                                        onClick={() => openModal(ITEMS[ITEM_TYPE.GOOD][k])}
                                                        className="uppercase p-2 text-left hover:bg-background-contrast w-full"
                                                    >
                                                        {ITEMS[ITEM_TYPE.GOOD][k].name}
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            )}
                            {view === View.WEAPONS && (
                                <div className="divide-white divide-y-2">
                                    {Object.keys(ITEMS[ITEM_TYPE.WEAPON]).map((k) => {
                                        {
                                            return (
                                                <div key={k}>
                                                    <button
                                                        onClick={() => openModal(ITEMS[ITEM_TYPE.WEAPON][k])}
                                                        className="uppercase p-2 text-left hover:bg-background-contrast w-full"
                                                    >
                                                        {ITEMS[ITEM_TYPE.WEAPON][k].name}
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            )}
                            {view === View.ARMORS && (
                                <div className="divide-white divide-y-2">
                                    {Object.keys(ITEMS[ITEM_TYPE.ARMOR]).map((k) => {
                                        {
                                            return (
                                                <div key={k}>
                                                    <button
                                                        onClick={() => openModal(ITEMS[ITEM_TYPE.ARMOR][k])}
                                                        className="uppercase p-2 text-left hover:bg-background-contrast w-full"
                                                    >
                                                        {ITEMS[ITEM_TYPE.ARMOR][k].name}
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            )}
                        </div>
                    </>
                )}
                {item && (
                    <div className="p-5">
                        <div className="flex flex-row justify-between uppercase">
                            <span className="border-b-2 border-white">{item.name}</span>
                            <div className="flex text-center flex-row items-center justify-between w-32 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                <div className="py-1 text-center w-2/3">
                                    <p>{summoner.materials.balance}</p>
                                </div>
                                <Image src="/img/material.png" width={30} height={30} />
                            </div>
                        </div>
                        <div className="uppercase mt-2">
                            <span>
                                {i18n._(t`approval`)} {i18n._(t`gold`)}
                            </span>{' '}
                            {approval.gold ? (
                                <Image src="/img/approved.png" width={15} height={15} />
                            ) : (
                                <button
                                    className="uppercase border-white border-2 rounded-lg px-2 py-1"
                                    onClick={async () => approveGold()}
                                >
                                    Approve
                                </button>
                            )}
                        </div>
                        <div className="uppercase mt-2">
                            <span>
                                {i18n._(t`approval`)} {i18n._(t`material`)}
                            </span>{' '}
                            {approval.material ? (
                                <Image src="/img/approved.png" width={15} height={15} />
                            ) : (
                                <button
                                    className="uppercase border-white border-2 rounded-lg px-2 py-1"
                                    onClick={async () => approveMaterial()}
                                >
                                    Approve
                                </button>
                            )}
                        </div>
                        <div className="overflow-scroll text-center max-h-40 mt-5 text-xs rounded-lg bg-card-top border-2 border-white">
                            <p className="p-1">GOLD: {item.cost}</p>
                            <p className="p-1">XP: </p>
                            <p className="p-1">SKILL REQ: </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SummonerCraftCard
