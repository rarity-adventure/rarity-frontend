import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { Item, ITEM_TYPE, ITEMS } from '../../constants/codex/items'
import ItemModal from '../Modal/modals/Item'
import Image from 'next/image'
import useRarityGold from '../../hooks/useRarityGold'
import useRarityCellar from '../../hooks/useRarityCellar'
import { CRAFTING_ALLOWANCE, RARITY_CRAFTING_ADDRESS, RARITY_CRAFTING_SUMMONER } from '../../constants'
import toast from 'react-hot-toast'
import useRarity from '../../hooks/useRarity'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { utils } from 'ethers'

enum View {
    GOODS,
    WEAPONS,
    ARMORS,
}

function SummonerCraftCard({ summoner }: { summoner: SummonerFullData }): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const [item, setItem] = useState<Item | undefined>(undefined)

    const [modal, setModal] = useState(false)

    const { isApprovedForAll, setApprovalForAll } = useRarity()

    const { gold_allowance, gold_approve } = useRarityGold()

    const { material_allowance, material_approve } = useRarityCellar()

    const [globalApproval, setGlobalApproval] = useState(false)
    const [approval, setApproval] = useState({ gold: false, material: false })

    const [materialUse, setMaterialUse] = useState(0)

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

    function materialUsageSetter(amount: string) {
        setMaterialUse(parseInt(amount))
    }

    const fetch_allowance = useCallback(async () => {
        const goldAllowance = await gold_allowance(summoner.id, RARITY_CRAFTING_SUMMONER)
        const matAllowance = await material_allowance(summoner.id, RARITY_CRAFTING_SUMMONER)
        const global = await isApprovedForAll(account, RARITY_CRAFTING_ADDRESS)
        setGlobalApproval(global)
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

    function approveGlobal() {
        toast
            .promise(setApprovalForAll(RARITY_CRAFTING_ADDRESS), {
                loading: <b>{i18n._(t`Approving Crafting!`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            })
            .then(() => setGlobalApproval(true))
    }

    const [view, setView] = useState<View>(0)
    return (
        <div className="max-w-screen-md mx-auto">
            <ItemModal open={modal} closeFunction={craftModal} item={item} />
            <>
                {' '}
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
                    {globalApproval ? (
                        <>
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
                                                                    onClick={() =>
                                                                        openModal(ITEMS[ITEM_TYPE.WEAPON][k])
                                                                    }
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
                                    <div className="text-center max-h-40 mt-5 text-xs rounded-lg bg-card-top border-2 border-white">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 p-5 gap-y-1">
                                            <p className="p-1">
                                                GOLD: {utils.formatUnits(item.cost.toString(), 'ether')}{' '}
                                                {summoner.gold.balance >=
                                                parseInt(utils.formatUnits(item.cost.toString(), 'ether')) ? (
                                                    <span className="bg-green border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        {i18n._(t`VALID`)}
                                                    </span>
                                                ) : (
                                                    <span className="bg-red border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        {i18n._(t`INVALID`)}
                                                    </span>
                                                )}
                                            </p>
                                            <p className="p-1">
                                                XP:{' '}
                                                {summoner.base._xp >= 250 ? (
                                                    <span className="bg-green border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        {i18n._(t`VALID`)}
                                                    </span>
                                                ) : (
                                                    <span className="bg-red border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        {i18n._(t`INVALID`)}
                                                    </span>
                                                )}
                                            </p>
                                            <p className="p-1">
                                                SKILL REQ:{' '}
                                                {summoner.skills.skills[5] > 0 &&
                                                summoner.skills.skills[5] + summoner.ability_scores.modifiers._int >
                                                    0 ? (
                                                    <span className="bg-green border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        {i18n._(t`VALID`)}
                                                    </span>
                                                ) : (
                                                    <span className="bg-red border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        {i18n._(t`INVALID`)}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <h2>Amount of material to use</h2>
                                    <input type="number" onChange={(v) => materialUsageSetter(v.target.value)} />
                                    <span>Chance of success: </span>
                                    <button>Craft!</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="h-40 text-center mt-20">
                            <button
                                onClick={() => {
                                    approveGlobal()
                                }}
                                className="bg-green border-2 border-white p-4 uppercase"
                            >
                                {i18n._(t`approve crafting`)}
                            </button>
                        </div>
                    )}
                </div>
            </>
        </div>
    )
}

export default SummonerCraftCard
