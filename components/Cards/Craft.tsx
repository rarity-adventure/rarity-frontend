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
import useRarityCrafting from '../../hooks/useRarityCrafting'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import CraftResultModal from '../Modal/modals/Craft'
import { utils, BigNumber } from 'ethers'

enum View {
    GOODS,
    WEAPONS,
    ARMORS,
}

function SummonerCraftCard({ summoner }: { summoner: SummonerFullData }): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const [item, setItem] = useState<Item | undefined>(undefined)

    const [itemID, setItemID] = useState<string | undefined>(undefined)

    const { isApprovedForAll, setApprovalForAll } = useRarity()

    const { gold_allowance, gold_approve } = useRarityGold()

    const { material_allowance, material_approve } = useRarityCellar()

    const [globalApproval, setGlobalApproval] = useState(false)
    const [approval, setApproval] = useState({ gold: false, material: false })

    const [materialUse, setMaterialUse] = useState(0)

    useEffect(() => {
        setMaterialUse(0)
    }, [summoner])

    const [modal, setModal] = useState(false)
    const [checkOnly, setCheckOnly] = useState(false)

    function openModal(item: Item, id: string, checkOnly: boolean) {
        setItem(item)
        setItemID(id)
        setModal(true)
        setCheckOnly(checkOnly)
    }

    function craftModal(craft: boolean) {
        setModal(false)
        if (!craft) {
            setItem(undefined)
            setItemID(undefined)
        }
    }

    const fetch_allowance = useCallback(async () => {
        const goldAllowance = await gold_allowance(summoner.id, RARITY_CRAFTING_SUMMONER)
        const matAllowance = await material_allowance(summoner.id, RARITY_CRAFTING_SUMMONER)
        const global = await isApprovedForAll(account, RARITY_CRAFTING_ADDRESS)
        setGlobalApproval(global)
        setApproval({
            gold: goldAllowance >= CRAFTING_ALLOWANCE,
            material: matAllowance >= CRAFTING_ALLOWANCE,
        })
    }, [gold_allowance, material_allowance, summoner, account, isApprovedForAll])

    useEffect(() => {
        fetch_allowance()
    }, [summoner, fetch_allowance])

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

    function calcSuccessRate(): string {
        const check_base = summoner.skills.skills[5] + summoner.ability_scores.modifiers._int
        const DC = getDC()
        let p = (20 - DC + check_base + Math.floor(materialUse / 10)) / 20
        p = Math.min(1, Math.max(p, 0))
        return (p * 100).toFixed(0) + '%'
    }

    function getDC(): number {
        switch (view) {
            case View.ARMORS:
                return 20 + item.armor_bonus
            case View.WEAPONS:
                return 15 + item.proficiency * 5
            case View.GOODS:
                return 20
        }
    }

    function getTypeFromView(): ITEM_TYPE {
        switch (view) {
            case View.ARMORS:
                return ITEM_TYPE.ARMOR
            case View.WEAPONS:
                return ITEM_TYPE.WEAPON
            case View.GOODS:
                return ITEM_TYPE.GOOD
        }
    }
    const [view, setView] = useState<View>(0)

    const { craft, balanceOf } = useRarityCrafting()

    const [resultModal, setResultModal] = useState(false)

    const [craftResult, setCraftResult] = useState(false)

    const [craftLoading, setCraftLoading] = useState(false)

    const delay = (ms) => new Promise((res) => setTimeout(res, ms))

    async function craftButton() {
        const currBalance = await balanceOf(account)
        toast
            .promise(craft(summoner.id, getTypeFromView(), itemID, materialUse), {
                loading: <b>{i18n._(t`Crafting`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            })
            .then(async () => {
                setResultModal(true)
                setCraftLoading(true)
                await delay(30000)
                const newBalance = await balanceOf(account)
                setCraftResult(newBalance > currBalance)
                setCraftLoading(false)
            })
    }

    function increaseMaterial() {
        const totalMat = materialUse + 10
        if (totalMat <= summoner.materials.balance) {
            setMaterialUse(totalMat)
        }
    }

    function decreaseMaterial() {
        const totalMat = materialUse - 10
        if (totalMat >= 0) {
            setMaterialUse(totalMat)
        }
    }

    function craftResultClose() {
        setResultModal(false)
        setMaterialUse(0)
    }

    return (
        <div className="max-w-screen-md mx-auto">
            <ItemModal
                open={modal}
                closeFunction={craftModal}
                item={item}
                itemType={getTypeFromView()}
                checkOnly={checkOnly}
            />
            <CraftResultModal
                open={resultModal}
                closeFunction={craftResultClose}
                success={craftResult}
                item={item}
                loading={craftLoading}
            />
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
                                    <div className="grid grid-cols-1 w-full px-4 py-2 overflow-scroll overflow-hidden h-60 mb-2">
                                        {view === View.GOODS && (
                                            <div>
                                                {Object.keys(ITEMS[ITEM_TYPE.GOOD]).map((k) => {
                                                    {
                                                        return (
                                                            <div key={k} className="my-2">
                                                                <button
                                                                    onClick={() =>
                                                                        openModal(ITEMS[ITEM_TYPE.GOOD][k], k, false)
                                                                    }
                                                                    className="uppercase p-1 px-3 text-left w-full border-black border-opacity-30 border shadow"
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
                                            <div>
                                                {Object.keys(ITEMS[ITEM_TYPE.WEAPON]).map((k) => {
                                                    {
                                                        return (
                                                            <div key={k} className="my-2">
                                                                <button
                                                                    onClick={() =>
                                                                        openModal(ITEMS[ITEM_TYPE.WEAPON][k], k, false)
                                                                    }
                                                                    className="uppercase p-1 px-3 text-left w-full border-black border-opacity-30 border shadow"
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
                                            <div>
                                                {Object.keys(ITEMS[ITEM_TYPE.ARMOR]).map((k) => {
                                                    {
                                                        return (
                                                            <div key={k} className="my-2">
                                                                <button
                                                                    onClick={() =>
                                                                        openModal(ITEMS[ITEM_TYPE.ARMOR][k], k, false)
                                                                    }
                                                                    className="uppercase p-1 px-3 text-left w-full border-black border-opacity-30 border shadow"
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
                                        <button
                                            className="border-b-2 border-white"
                                            onClick={() => openModal(item, itemID, true)}
                                        >
                                            <span>{item.name}</span>
                                        </button>
                                        <div className="flex text-center flex-row items-center justify-between w-32 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                            <div className="py-1 text-center w-2/3">
                                                <p>{summoner.materials.balance}</p>
                                            </div>
                                            <Image
                                                src="/img/coins/material.png"
                                                width={30}
                                                height={30}
                                                alt="material"
                                            />
                                        </div>
                                    </div>
                                    <div className="uppercase mt-2">
                                        <span>
                                            {i18n._(t`approval`)} {i18n._(t`gold`)}
                                        </span>{' '}
                                        {approval.gold ? (
                                            <Image src="/img/approved.png" width={15} height={15} alt="approved" />
                                        ) : (
                                            <button
                                                className="uppercase border-white border-2 rounded-lg px-2 py-1"
                                                onClick={async () => approveGold()}
                                            >
                                                {i18n._(t`Approve`)}
                                            </button>
                                        )}
                                    </div>
                                    {summoner.materials.balance > 0 ? (
                                        <div className="uppercase mt-2">
                                            <span>
                                                {i18n._(t`approval`)} {i18n._(t`material`)}
                                            </span>{' '}
                                            {approval.material ? (
                                                <Image src="/img/approved.png" width={15} height={15} alt="approved" />
                                            ) : (
                                                <button
                                                    className="uppercase border-white border-2 rounded-lg px-2 py-1"
                                                    onClick={async () => approveMaterial()}
                                                >
                                                    {i18n._(t`Approve`)}
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div />
                                    )}

                                    <div className="text-center max-h-40 mt-5 text-xs rounded-lg bg-card-top border-2 border-white">
                                        <div className="grid grid-cols-1 lg:grid-cols-3 py-3 px-2 gap-y-1 text-xs">
                                            <p className="p-1">
                                                GOLD:{' '}
                                                {summoner.gold.balance >= item.cost ? (
                                                    <span className="bg-green border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        {item.cost}/{summoner.gold.balance}
                                                    </span>
                                                ) : (
                                                    <span className="bg-red border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        {item.cost}/{summoner.gold.balance}
                                                    </span>
                                                )}
                                            </p>
                                            <p className="p-1">
                                                XP:{' '}
                                                {summoner.base._xp >= 250 ? (
                                                    <span className="bg-green border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        250/{summoner.base._xp}
                                                    </span>
                                                ) : (
                                                    <span className="bg-red border-white border-2 rounded-lg p-1">
                                                        {' '}
                                                        250/{summoner.base._xp}
                                                    </span>
                                                )}
                                            </p>
                                            <p className="p-1">
                                                SKILL CHECK:{' '}
                                                {summoner.skills.skills[5] > 0 &&
                                                summoner.skills.skills[5] + summoner.ability_scores.modifiers._int >
                                                    0 ? (
                                                    <span className="bg-green border-white border-2 rounded-lg p-1">
                                                        +
                                                        {summoner.skills.skills[5] +
                                                            summoner.ability_scores.modifiers._int}
                                                    </span>
                                                ) : (
                                                    <span className="bg-red border-white border-2 rounded-lg p-1 px-2">
                                                        {summoner.skills.skills[5] +
                                                            summoner.ability_scores.modifiers._int}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 justify-center text-center">
                                        <span> {i18n._(t`Material to use`)}</span>
                                        <div className="flex flex-row mt-2 justify-center">
                                            {materialUse === 0 ? (
                                                <button
                                                    className="text-white cursor-not-allowed opacity-50 rounded-full hover:bg-white hover:bg-opacity-5 mr-2"
                                                    onClick={() => decreaseMaterial()}
                                                >
                                                    <MinusIcon width={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    className="text-white rounded-full hover:bg-white hover:bg-opacity-5 mr-2"
                                                    onClick={() => decreaseMaterial()}
                                                >
                                                    <MinusIcon width={18} />
                                                </button>
                                            )}

                                            <p className="text-center border-white border-2 py-1 rounded-lg bg-background-contrast w-40">
                                                {materialUse}
                                            </p>
                                            {materialUse + 10 > summoner.materials.balance ? (
                                                <button
                                                    className="text-white opacity-50 cursor-not-allowed rounded-full hover:bg-white hover:bg-opacity-5 ml-2"
                                                    onClick={() => increaseMaterial()}
                                                >
                                                    <PlusIcon width={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    className="text-white rounded-full hover:bg-white hover:bg-opacity-5 ml-2"
                                                    onClick={() => increaseMaterial()}
                                                >
                                                    <PlusIcon width={18} />
                                                </button>
                                            )}
                                        </div>
                                        <p className="my-2">
                                            {' '}
                                            {i18n._(t`Success chance`)}: {calcSuccessRate()}
                                        </p>
                                    </div>

                                    <div className="flex flex-row justify-center p-2">
                                        <button
                                            onClick={() => {
                                                setItem(undefined)
                                                setItemID(undefined)
                                            }}
                                            className="bg-red px-4 mx-2 border-2 border-white p-2 uppercase rounded-lg"
                                        >
                                            {i18n._(t`cancel`)}
                                        </button>
                                        {materialUse === 0 ? (
                                            summoner.base._xp >= 250 &&
                                            summoner.gold.balance >= item.cost &&
                                            summoner.skills.skills[5] > 0 &&
                                            summoner.skills.skills[5] + summoner.ability_scores.modifiers._int > 0 &&
                                            approval.gold ? (
                                                <button
                                                    onClick={async () => await craftButton()}
                                                    className="bg-green px-4 mx-2 border-2 border-white p-2  uppercase rounded-lg"
                                                >
                                                    {i18n._(t`craft`)}
                                                </button>
                                            ) : (
                                                <button className="bg-green opacity-50 cursor-not-allowed px-4 mx-2 border-2 border-white p-2  uppercase rounded-lg">
                                                    {i18n._(t`craft`)}
                                                </button>
                                            )
                                        ) : summoner.base._xp >= 250 &&
                                          summoner.gold.balance >= item.cost &&
                                          summoner.skills.skills[5] > 0 &&
                                          summoner.skills.skills[5] + summoner.ability_scores.modifiers._int > 0 &&
                                          approval.gold &&
                                          approval.material ? (
                                            <button
                                                onClick={async () => await craftButton()}
                                                className="bg-green px-4 mx-2 border-2 border-white p-2  uppercase rounded-lg"
                                            >
                                                {i18n._(t`craft`)}
                                            </button>
                                        ) : (
                                            <button className="bg-green opacity-50 cursor-not-allowed px-4 mx-2 border-2 border-white p-2  uppercase rounded-lg">
                                                {i18n._(t`craft`)}
                                            </button>
                                        )}
                                    </div>
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
