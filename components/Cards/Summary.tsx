import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/classes'
import { t } from '@lingui/macro'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import BurnModal from '../Modal/modals/Burn'
import TransferModal from '../Modal/modals/Transfer'
import DaycareSingleModal from '../Modal/modals/DaycareSingle'
import useRarity from '../../hooks/useRarity'
import toast from 'react-hot-toast'
import useRarityCellar from '../../hooks/useRarityCellar'
import { secondsRender } from '../../functions/secondsToText'
import { calcXPForNextLevel } from '../../functions/calcXPForNextLevel'
import SellModal from '../Modal/modals/Sell'

enum Modals {
    TRANSFER = 1,
    DELETE,
    DAYCARE,
    SELL,
}

function SummonerSummaryCard({
    summoner,
    time,
    sellable,
}: {
    summoner: SummonerFullData
    time: number
    sellable: boolean
}): JSX.Element {
    const { i18n } = useLingui()

    const [modalOpen, setModalOpen] = useState<Modals>(0)

    const { adventure, level_up } = useRarity()

    function closeModals() {
        setModalOpen(0)
    }

    async function sendAdventure() {
        await toast.promise(adventure(summoner.id), {
            loading: <b>{i18n._(t`Sending summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    const { adventure_cellar } = useRarityCellar()

    async function sendDungeon() {
        await toast.promise(adventure_cellar(summoner.id), {
            loading: <b>{i18n._(t`Sending summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    async function sendLevelUP() {
        await toast.promise(level_up(summoner.id), {
            loading: <b>{i18n._(t`Level-UP Summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    return (
        <div className="mx-auto w-56">
            <BurnModal open={modalOpen === Modals.DELETE} closeFunction={closeModals} summoner={summoner} />
            <SellModal open={modalOpen === Modals.SELL} closeFunction={closeModals} summoner={summoner} />
            <TransferModal open={modalOpen === Modals.TRANSFER} closeFunction={closeModals} summoner={summoner} />
            <DaycareSingleModal open={modalOpen === Modals.DAYCARE} closeFunction={closeModals} summoner={summoner} />
            <div className="p-5 w-full text-center">{CLASSES_IMAGES[summoner.base._class]}</div>

            <div className="grid grid-cols-1 rounded-2xl border-white border-2 bg-background-contrast divide-white divide-y-2">
                <div className="mx-auto p-2">
                    {summoner.base._name !== '' ? (
                        <p>{summoner.base._name}</p>
                    ) : (
                        <span>{i18n._(CLASSES_NAMES[summoner.base._class])}</span>
                    )}
                </div>
                <div className="p-2 text-xs">
                    <p>
                        {i18n._(t`id`)}: {summoner.id}
                    </p>
                </div>
                <div className="p-2 text-xs">
                    <div className="flex flex-row justify-between mr-2">
                        <p>{i18n._(t`level`)}</p>
                        <span> {summoner.base._level}</span>
                    </div>
                    <div className="flex flex-row justify-between mr-2">
                        <p>{i18n._(t`xp`)}</p>
                        <span> {summoner.base._xp}</span>
                    </div>
                    <div className="flex flex-row justify-between mr-2">
                        <p>{i18n._(t`gold`)}</p>
                        <span> {summoner.gold.balance}</span>
                    </div>
                    <div className="flex flex-row justify-between mr-2">
                        <p>{i18n._(t`craft material`)}</p>
                        <span> {summoner.materials.balance}</span>
                    </div>
                    <div className="mt-2 uppercase text-center">
                        {summoner.base._xp >= calcXPForNextLevel(summoner.base._level) && (
                            <button
                                onClick={() => sendLevelUP()}
                                className="bg-green uppercase p-1.5 text-sm border-white rounded-lg border-2"
                            >
                                {i18n._(t`level-up`)}
                            </button>
                        )}
                    </div>
                </div>
                <div className="p-2 text-xs">
                    <div className="flex flex-row justify-between mr-2 items-center text-center">
                        <p>{i18n._(t`daycare`)}</p>
                        <button onClick={() => setModalOpen(Modals.DAYCARE)} className="text-center w-16">
                            {summoner.misc.daycare_days_paid === 0 ? (
                                <div className="px-2 py-2 items-center border-white border-2 bg-red rounded-lg">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            ) : (
                                <div className="py-2 px-2 py-2items-center border-white border-2 bg-green rounded-lg">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-row justify-between mr-2 items-center my-2">
                        <p>{i18n._(t`adventure`)}</p>
                    </div>
                    <div className="flex flex-row justify-center mr-2 items-center my-2 text-center">
                        {summoner.base._log * 1000 > time ? (
                            <button
                                style={{ fontSize: '0.5rem' }}
                                className="px-1.5 opacity-50 cursor-not-allowed py-1 items-center uppercase border-white border-2 bg-background-contrast rounded-lg"
                            >
                                {secondsRender((summoner.base._log * 1000 - time) / 1000)}
                            </button>
                        ) : (
                            <button
                                onClick={async () => sendAdventure()}
                                className="px-1 py-1 items-center uppercase text-xs border-white border-2 bg-green rounded-lg"
                            >
                                {i18n._(t`go to adventure!`)}
                            </button>
                        )}
                    </div>
                    <div className="flex flex-row justify-between mr-2 items-center my-2">
                        <p>{i18n._(t`dungeon`)}</p>
                    </div>
                    <div className="flex flex-row justify-center mr-2 items-center my-2 text-center">
                        {summoner.materials.scout === 0 ? (
                            <button
                                style={{ fontSize: '0.5rem' }}
                                className="px-2 opacity-50 cursor-not-allowed py-1 items-center uppercase border-white border-2 bg-background-contrast rounded-lg"
                            >
                                {i18n._(t`no rewards found`)}
                            </button>
                        ) : summoner.materials.log * 1000 < time && summoner.materials.scout !== 0 ? (
                            <button
                                onClick={async () => sendDungeon()}
                                className="px-1 py-1 items-center uppercase text-xs border-white border-2 bg-green rounded-lg"
                            >
                                {i18n._(t`go to dungeon!`)}
                            </button>
                        ) : (
                            <button
                                style={{ fontSize: '0.5rem' }}
                                className="px-2 opacity-50 cursor-not-allowed py-1 items-center uppercase border-white border-2 bg-background-contrast rounded-lg"
                            >
                                {secondsRender((summoner.materials.log * 1000 - time) / 1000)}
                            </button>
                        )}
                    </div>
                </div>
                <div className="p-2 text-xs w-full">
                    <p>
                        <button className="w-full my-1" onClick={() => setModalOpen(Modals.TRANSFER)}>
                            <div className="uppercase px-2 py-2 items-center border-white border-2 bg-background-start rounded-lg">
                                {i18n._(t`transfer`)}
                            </div>
                        </button>
                    </p>
                    {sellable ? (
                        <p>
                            <button className="w-full my-1" onClick={() => setModalOpen(Modals.SELL)}>
                                <div className="uppercase px-2 py-2 items-center border-white border-2 bg-red rounded-lg">
                                    {i18n._(t`sell for 0.6 FTM`)}
                                </div>
                            </button>
                        </p>
                    ) : (
                        <p>
                            <button className="w-full my-1" onClick={() => setModalOpen(Modals.DELETE)}>
                                <div className="uppercase px-2 py-2 items-center border-white border-2 bg-red rounded-lg">
                                    {i18n._(t`delete`)}
                                </div>
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SummonerSummaryCard
