import { t } from '@lingui/macro'
import React, { useState, useMemo } from 'react'
import { useLingui } from '@lingui/react'
import {
    InformationCircleIcon,
    CogIcon,
    ArrowNarrowDownIcon,
    SwitchHorizontalIcon,
    QuestionMarkCircleIcon,
    PlusIcon,
} from '@heroicons/react/outline'
import { PencilIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { SKILLS } from '../../constants/codex/skills'
import { MaterialImage, GoldImage } from '../../constants/coins'

enum View {
    DEX,
    LIQUIDITY,
}

enum DexView {
    TRADE,
    WORK,
}

enum LiquidityView {
    SUPPLY,
    POSITIONS,
}

const WorkSkillsIndex = [
    1, // Appraise
    8, // Diplomacy
    24, //Profession
    28, // Sleight Of Hand
]

const MOCK_POSITIONS = new Array(8).fill({
    tokenA: 'FTM',
    tokenB: 'RGLD',
    amount: 0.123456789,
})

function SummonerDexCard({ summoner }: { summoner: SummonerFullData }): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const [view, setView] = useState(View.DEX)
    const [dexView, setDexView] = useState(DexView.TRADE)
    const [liquidityView, setLiquidityView] = useState(LiquidityView.SUPPLY)
    const [dexMaterialAmount, setDexMaterialAmount] = useState('0.00')
    const [dexGoldAmount, setDexGoldAmount] = useState('0.00')
    const [liqMaterialAmount, setLiqMaterialAmount] = useState('0.00')
    const [liqGoldAmount, setLiqGoldAmount] = useState('0.00')
    const [flipAssets, setFlipAssets] = useState(false)

    const workSkills = useMemo(() => {
        return WorkSkillsIndex.map((i) => SKILLS[i])
    }, [])
    const workSkillsMod = useMemo(() => {
        return workSkills.reduce((accum, skill) => accum + summoner.skills.skills[skill.id], 0)
    }, [summoner, workSkills])

    return (
        <div className="h-full flex flex-col max-w-screen-md mx-auto">
            <div className="flex flex-row w-full items-center">
                <div className="relative grid grid-cols-1 md:grid-cols-12 md:gap-2 w-full">
                    <div className="bg-card-top col-span-7 md:p-2 p-1 border-white border-2 rounded-t-2xl text-left">
                        <span className="ml-1.5 uppercase">
                            {i18n._(t`ID`)} {summoner.id}
                        </span>
                    </div>
                    <div className="relative col-span-5 mt-3 md:mt-0">
                        <button
                            className={`relative h-full w-3/6 md:p-2 p-1 text-center border-white border-2 rounded-tl-2xl rounded-r-2xl uppercase ${
                                view === View.DEX ? 'z-20 bg-card-top' : 'z-10 bg-card-button text-grey'
                            }`}
                            onClick={() => setView(View.DEX)}
                        >
                            {i18n._(t`dex`)}
                        </button>
                        <button
                            className={`absolute h-full md:p-2 p-1 w-4/6 top-0 right-0 text-center border-white border-2 rounded-l-2xl rounded-tr-2xl uppercase ${
                                view === View.LIQUIDITY ? 'z-20 bg-card-top' : 'z-10 bg-card-button text-grey'
                            }`}
                            onClick={() => setView(View.LIQUIDITY)}
                        >
                            {i18n._(t`liquidity`)}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-full border-white border-2 rounded-b-2xl my-3 w-full bg-card-content">
                {view === View.DEX && (
                    <>
                        <div className="w-full flex py-4 pl-10 pr-32 justify-between">
                            <div className="w-40 relative">
                                <button
                                    className={`relative w-3/5 border-white border rounded-2xl uppercase px-4 text-center ${
                                        dexView === DexView.TRADE
                                            ? 'z-20 bg-card-content'
                                            : 'z-10 opacity-60 bg-card-button'
                                    }`}
                                    onClick={() => setDexView(DexView.TRADE)}
                                >
                                    {i18n._(t`trade`)}
                                </button>
                                <button
                                    className={`absolute w-3/5 top-0 -right-3 border-white border rounded-2xl uppercase px-4 text-center ${
                                        dexView === DexView.WORK
                                            ? 'z-20 bg-card-content'
                                            : 'z-10 opacity-60 bg-card-button'
                                    }`}
                                    onClick={() => setDexView(DexView.WORK)}
                                >
                                    {i18n._(t`work`)}
                                </button>
                            </div>
                            <div className="flex items-center justify-center">
                                <InformationCircleIcon data-tip data-for="filter-info" width={20} />
                                <CogIcon width={20} className={'ml-2'} />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center px-20 pb-5">
                            {dexView === DexView.TRADE && (
                                <div className="w-5/6 flex flex-col">
                                    <div className={`relative h-36 flex flex-col${flipAssets ? '-reverse' : ''}`}>
                                        <button className="absolute bg-background-end h-6 w-6 top-16 left-20 border border-white rounded p-1">
                                            <ArrowNarrowDownIcon onClick={() => setFlipAssets(!flipAssets)} />
                                        </button>
                                        <div className="h-1/2 py-1">
                                            <div className="flex h-full bg-background-end border border-white rounded-2xl">
                                                <div className="flex items-center justify-center h-full w-1/6">
                                                    <MaterialImage />
                                                </div>
                                                <div className="h-full w-2/6 flex flex-col items-start justify-center uppercase p-2">
                                                    <span className="text-base">{i18n._(t`material`)}</span>
                                                    <span className="text-xs">
                                                        {i18n._(t`bal`) + ': ' + summoner.materials.balance}
                                                    </span>
                                                </div>
                                                <div className="relative h-full w-3/6 p-2">
                                                    {!flipAssets && (
                                                        <button
                                                            className="absolute h-6 text-xs px-2 inset-5 border border-white rounded-2xl uppercase"
                                                            onClick={() => {
                                                                setDexMaterialAmount(
                                                                    summoner.materials.balance.toFixed(2)
                                                                )
                                                            }}
                                                        >
                                                            {i18n._(t`max`)}
                                                        </button>
                                                    )}
                                                    <input
                                                        className="h-full w-full border-2 border-white rounded-2xl bg-card-content text-right pr-2"
                                                        type="number"
                                                        step="0.01"
                                                        value={dexMaterialAmount}
                                                        placeholder="0.00"
                                                        onChange={(v) => setDexMaterialAmount(v.target.value || '0.00')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-1/2 py-1">
                                            <div className="flex h-full bg-background-end border border-white rounded-2xl">
                                                <div className="flex items-center justify-center h-full w-1/6">
                                                    <GoldImage />
                                                </div>
                                                <div className="h-full w-2/6 flex flex-col items-start justify-center uppercase p-2">
                                                    <span className="text-base">{i18n._(t`gold`)}</span>
                                                    <span className="text-xs">
                                                        {i18n._(t`bal`) + ': ' + summoner.gold.balance}
                                                    </span>
                                                </div>
                                                <div className="relative h-full w-3/6 p-2">
                                                    {flipAssets && (
                                                        <button
                                                            className="absolute h-6 text-xs px-2 inset-5 border border-white rounded-2xl uppercase"
                                                            onClick={() => {
                                                                setDexGoldAmount(summoner.gold.balance.toFixed(2))
                                                            }}
                                                        >
                                                            {i18n._(t`max`)}
                                                        </button>
                                                    )}
                                                    <input
                                                        className="h-full w-full border-2 border-white rounded-2xl bg-card-content text-right pr-2"
                                                        type="number"
                                                        step="0.01"
                                                        value={dexGoldAmount}
                                                        placeholder="0.00"
                                                        onChange={(v) => setDexGoldAmount(v.target.value || '0.00')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm capitalize">
                                        <div className="flex justify-between h-1/5">
                                            <span>{i18n._(t`price`)}</span>
                                            <div className="flex">
                                                <span className="work-sans mr-1">
                                                    {i18n._(t`1234567890 GOLD = 1 FTM`)}
                                                </span>
                                                <button className="w-4 rounded-full">
                                                    <SwitchHorizontalIcon />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between h-1/5">
                                            <button className="flex capitalize">
                                                {i18n._(t`slippage`)}
                                                <PencilIcon width={16} />
                                            </button>
                                            <span className="work-sans">{i18n._(t`0.5%`)}</span>
                                        </div>
                                        <div className="flex justify-between h-1/5">
                                            <div className="flex">
                                                {i18n._(t`minimum received`)}
                                                <QuestionMarkCircleIcon width={16} />
                                            </div>
                                            <span className="work-sans">{i18n._(t`123456789 FTM`)}</span>
                                        </div>
                                        <div className="flex justify-between h-1/5">
                                            <div className="flex">
                                                {i18n._(t`price impacted`)}
                                                <QuestionMarkCircleIcon width={16} />
                                            </div>
                                            <span className="work-sans">{i18n._(t`0.5%`)}</span>
                                        </div>
                                        <div className="flex justify-between h-1/5">
                                            <div className="flex">
                                                {i18n._(t`fees`)}
                                                <QuestionMarkCircleIcon width={16} />
                                            </div>
                                            <span className="work-sans">{i18n._(t`1 FTM`)}</span>
                                        </div>
                                    </div>
                                    <div className="h-12 pt-2 p-1">
                                        <button className="w-full h-full rounded-full uppercase bg-green border-2 border-white">
                                            {i18n._(t`swap`)}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {dexView === DexView.WORK && (
                                <div className="w-4/6 h-full flex flex-col border-2 border-white bg-background-end rounded-2xl">
                                    <div className="uppercase rounded-full border border-white m-2 p-1 w-20 text-sm text-center bg-card-content">
                                        {i18n._(t`skills`)}
                                    </div>
                                    <div className="h-full">
                                        <div className="text-sm px-4 pb-2">
                                            {workSkills.map((skill) => {
                                                return (
                                                    <div
                                                        key={`work-skill-${skill.id}`}
                                                        className="flex justify-between items-center p-1"
                                                    >
                                                        <div className="flex justify-center items-center">
                                                            <Image
                                                                src={`/img/skills/${skill.id}.png`}
                                                                width={24}
                                                                height={24}
                                                                alt={skill.name}
                                                            />
                                                            <span className="ml-2">{i18n._(skill.name)}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <InformationCircleIcon width={16} />
                                                            <span className="ml-16">
                                                                {i18n._(t`lvl`) +
                                                                    ': ' +
                                                                    summoner.skills.skills[skill.id]}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="w-full bg-item-background border-t-2 border-b-2 border-dotted border-white uppercase p-4">
                                            <div className="flex justify-between px-2">
                                                <span>{i18n._(t`work skills`)}</span>
                                                <span>{'+' + workSkillsMod}</span>
                                            </div>
                                            <div className="flex justify-between px-2">
                                                <span>{i18n._(t`liquidity`)}</span>
                                                <span>{(200).toFixed(3)}</span>
                                            </div>
                                        </div>
                                        <div className="w-full border-b-2 border-dotted border-white capitalize px-4 py-2 text-sm">
                                            <div className="flex justify-between px-2">
                                                <span>{i18n._(t`daily rewards`)}</span>
                                                <span>{'+123456 Mithril'}</span>
                                            </div>
                                        </div>
                                        <div className="w-full capitalize text-xs flex text-center p-4">
                                            <div className="flex flex-col flex-grow">
                                                <span className="mb-2">{i18n._(t`work`)}</span>
                                                <span>{'123456789'}</span>
                                            </div>
                                            <div className="w-16 relative flex items-center justify-center">
                                                <div className="relative">
                                                    <Image
                                                        src={`/trading-post-icon-1.png`}
                                                        width={40}
                                                        height={40}
                                                        alt={'trading-post-icon-1'}
                                                    />
                                                    <div className="absolute inset-2">
                                                        <Image
                                                            src={`/trading-post-icon-2.png`}
                                                            width={18}
                                                            height={24}
                                                            alt={'trading-post-icon-2'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col flex-grow">
                                                <span className="mb-2">{i18n._(t`liquidity`)}</span>
                                                <span>{'123456789'}</span>
                                            </div>
                                        </div>
                                        <div className="px-16 py-2">
                                            <button className="w-full h-full rounded-full capitalize bg-green border-2 border-white">
                                                {i18n._(t`send to trading post`)}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
                {view === View.LIQUIDITY && (
                    <>
                        <div className="w-full flex py-4 pl-10 pr-32 justify-between">
                            <div className="w-72 relative">
                                <button
                                    className={`relative w-3/6 border-white border rounded-2xl uppercase text-center ${
                                        liquidityView === LiquidityView.SUPPLY
                                            ? 'z-20 bg-card-content'
                                            : 'z-10 opacity-60 bg-card-button'
                                    }`}
                                    onClick={() => setLiquidityView(LiquidityView.SUPPLY)}
                                >
                                    {i18n._(t`supply`)}
                                </button>
                                <button
                                    className={`absolute w-4/6 top-0 -right-3 border-white border rounded-2xl uppercase pr-4 text-right ${
                                        liquidityView === LiquidityView.POSITIONS
                                            ? 'z-20 bg-card-content'
                                            : 'z-10 opacity-60 bg-card-button'
                                    }`}
                                    onClick={() => setLiquidityView(LiquidityView.POSITIONS)}
                                >
                                    {i18n._(t`my positions`)}
                                </button>
                            </div>
                            <div className="flex items-center justify-center">
                                <InformationCircleIcon data-tip data-for="filter-info" width={20} />
                                <CogIcon width={20} className={'ml-2'} />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center px-20 pb-5">
                            {liquidityView === LiquidityView.SUPPLY && (
                                <div className="w-5/6 flex flex-col">
                                    <div className={`relative h-36 flex flex-col${flipAssets ? '-reverse' : ''}`}>
                                        <div className="absolute bg-background-end h-6 w-6 top-16 left-20 border border-white rounded p-1">
                                            <PlusIcon />
                                        </div>
                                        <div className="h-1/2 py-1">
                                            <div className="flex h-full bg-background-end border border-white rounded-2xl">
                                                <div className="flex items-center justify-center h-full w-1/6">
                                                    <MaterialImage />
                                                </div>
                                                <div className="h-full w-2/6 flex flex-col items-start justify-center uppercase p-2">
                                                    <span className="text-base">{i18n._(t`material`)}</span>
                                                    <span className="text-xs">
                                                        {i18n._(t`bal`) + ': ' + summoner.materials.balance}
                                                    </span>
                                                </div>
                                                <div className="relative h-full w-3/6 p-2">
                                                    <button
                                                        className="absolute h-6 text-xs px-2 inset-5 border border-white rounded-2xl uppercase"
                                                        onClick={() => {
                                                            setLiqMaterialAmount(summoner.materials.balance.toFixed(2))
                                                        }}
                                                    >
                                                        {i18n._(t`max`)}
                                                    </button>
                                                    <input
                                                        className="h-full w-full border-2 border-white rounded-2xl bg-card-content text-right pr-2"
                                                        type="number"
                                                        step="0.01"
                                                        value={liqMaterialAmount}
                                                        placeholder="0.00"
                                                        onChange={(v) => setLiqMaterialAmount(v.target.value || '0.00')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-1/2 py-1">
                                            <div className="flex h-full bg-background-end border border-white rounded-2xl">
                                                <div className="flex items-center justify-center h-full w-1/6">
                                                    <GoldImage />
                                                </div>
                                                <div className="h-full w-2/6 flex flex-col items-start justify-center uppercase p-2">
                                                    <span className="text-base">{i18n._(t`gold`)}</span>
                                                    <span className="text-xs">
                                                        {i18n._(t`bal`) + ': ' + summoner.gold.balance}
                                                    </span>
                                                </div>
                                                <div className="relative h-full w-3/6 p-2">
                                                    <button
                                                        className="absolute h-6 text-xs px-2 inset-5 border border-white rounded-2xl uppercase"
                                                        onClick={() => {
                                                            setLiqGoldAmount(summoner.gold.balance.toFixed(2))
                                                        }}
                                                    >
                                                        {i18n._(t`max`)}
                                                    </button>
                                                    <input
                                                        className="h-full w-full border-2 border-white rounded-2xl bg-card-content text-right pr-2"
                                                        type="number"
                                                        step="0.01"
                                                        value={liqGoldAmount}
                                                        placeholder="0.00"
                                                        onChange={(v) => setLiqGoldAmount(v.target.value || '0.00')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm capitalize">
                                        <div className="flex justify-between h-1/5">
                                            <button className="flex capitalize">
                                                {i18n._(t`slippage`)}
                                                <PencilIcon width={16} />
                                            </button>
                                            <span className="work-sans">{i18n._(t`0.5%`)}</span>
                                        </div>
                                        <div className="flex justify-between h-1/5">
                                            <span>{i18n._(t`1 FTM = 123456789 GOLD`)}</span>
                                        </div>
                                        <div className="flex justify-between h-1/5">
                                            <span>{i18n._(t`1 GOLD = 123456789 FTM`)}</span>
                                        </div>
                                        <div className="flex justify-between h-1/5">
                                            <span>{i18n._(t`Share of pool`)}</span>
                                            <span>{i18n._(t`0.5%`)}</span>
                                        </div>
                                        <div className="flex justify-between h-1/5">
                                            <span>{i18n._(t`LP token`)}</span>
                                            <span>{i18n._(t`+`)}</span>
                                        </div>
                                    </div>
                                    <div className="h-12 pt-2 p-1">
                                        <button className="w-full h-full rounded-full uppercase bg-green border-2 border-white">
                                            {i18n._(t`supply`)}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {liquidityView === LiquidityView.POSITIONS && (
                                <div
                                    className={`w-5/6 h-64 border-2 border-white rounded-2xl bg-background-end px-4 overflow-auto ${
                                        MOCK_POSITIONS.length > 4 ? 'border-r-0 rounded-r-none' : ''
                                    }`}
                                >
                                    {MOCK_POSITIONS.map((pos, i) => (
                                        <>
                                            {i !== 0 && <hr className="border-t border-white" />}
                                            <button
                                                key={`pos-${i}`}
                                                className="w-full flex items-center justify-between hover:opacity-80 py-4 text-sm"
                                            >
                                                <div className="flex items-center">
                                                    <Image
                                                        src={`/img/coins/${pos.tokenA.toLowerCase()}.png`}
                                                        width={24}
                                                        height={24}
                                                        alt={pos.tokenA}
                                                    />
                                                    <Image
                                                        src={`/img/coins/${pos.tokenB.toLowerCase()}.png`}
                                                        width={24}
                                                        height={24}
                                                        alt={pos.tokenA}
                                                    />
                                                    <span className="ml-2">{`${pos.tokenA}-${pos.tokenB}`}</span>
                                                </div>
                                                <div>{pos.amount}</div>
                                            </button>
                                        </>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SummonerDexCard
