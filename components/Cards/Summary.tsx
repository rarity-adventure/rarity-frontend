import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import useRarity from '../../hooks/useRarity'
import useRarityCellar from '../../hooks/useRarityCellar'
import { secondsRender } from '../../functions/secondsToText'
import { calcXPForNextLevel } from '../../functions/calcXPForNextLevel'
import { useRouter } from 'next/router'
import BurnModal from '../Modal/modals/transfers/Burn'
import TransferSummonerModal from '../Modal/modals/transfers/TransferSummoner'
import DaycareModal from '../Modal/modals/Daycare'
import { sendToast } from '../../functions/toast'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/codex/classes'

enum Modals {
    TRANSFER = 1,
    DELETE,
    DAYCARE,
}

export function SummonerSummaryCardLoader(): JSX.Element {
    return (
        <div className="mx-auto w-56">
            <div className="p-5 w-full h-6 text-center" />
            <div className="grid grid-cols-1 rounded-2xl border-white border-2 divide-white divide-y-2">
                <div className={'m-3 mx-auto bg-white opacity-70 rounded-lg uppercase h-7 w-40'} />
                <div>
                    <div className={'ml-2 m-2 bg-white opacity-70 rounded-lg mx-1 uppercase h-5 w-40'} />
                </div>
                <div>
                    <div className="flex flex-row justify-between mx-1 my-2">
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-28'} />
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-14'} />
                    </div>
                    <div className="flex flex-row justify-between mx-1 my-2">
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-32'} />
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-8'} />
                    </div>
                    <div className="flex flex-row justify-between mx-1 my-2">
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-24'} />
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-12'} />
                    </div>
                    <div className="flex flex-row justify-between mx-1 my-2">
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-36'} />
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-10'} />
                    </div>
                </div>
                <div>
                    <div className="flex flex-row justify-between mx-1 my-2">
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-10'} />
                        <div className={'bg-white opacity-70 rounded-lg mx-1 uppercase h-3 w-10'} />
                    </div>
                    <div className="flex flex-row justify-center mx-1 my-2">
                        <div className={'border-white border-2 opacity-70 rounded-lg mx-1 uppercase h-12 w-full'} />
                    </div>
                    <div className="flex flex-row justify-center mx-1 my-2">
                        <div className={'border-white border-2 opacity-70 rounded-lg mx-1 uppercase h-12 w-full'} />
                    </div>
                </div>
                <div className="p-2 text-xs w-full">
                    <div className="my-1.5 opacity-20 px-2 py-2 h-8 items-center border-white border-2 rounded-lg" />
                    <div className="my-1.5  opacity-20 px-2 py-2 h-8 items-center border-white border-2 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

function SummonerSummaryCard({ summoner, time }: { summoner: SummonerFullData; time: number }): JSX.Element {
    const { i18n } = useLingui()

    const [modalOpen, setModalOpen] = useState<Modals>(0)

    const router = useRouter()

    const { adventure, level_up } = useRarity()

    function closeModals() {
        setModalOpen(0)
    }

    const { adventure_cellar } = useRarityCellar()

    return (
        <div className="mx-auto w-56">
            <BurnModal open={modalOpen === Modals.DELETE} closeFunction={closeModals} summoner={summoner} />
            <TransferSummonerModal
                open={modalOpen === Modals.TRANSFER}
                closeFunction={closeModals}
                summoner={summoner}
            />
            <DaycareModal open={modalOpen === Modals.DAYCARE} closeFunction={closeModals} summoners={[summoner]} />
            <div
                onClick={async () => router.push('/play/' + summoner.id)}
                className="p-5 w-full text-center cursor-pointer"
            >
                {CLASSES_IMAGES[summoner.base._class]}
            </div>
            <div className="grid grid-cols-1 rounded-2xl border-white border-2 bg-background-contrast divide-white divide-y-2">
                <div onClick={async () => router.push('/play/' + summoner.id)} className="mx-auto p-2 cursor-pointer">
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
                                onClick={async () =>
                                    await sendToast(level_up(summoner.id), i18n._(t`LEVEL-UP Summoner`))
                                }
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
                                onClick={async () =>
                                    await sendToast(adventure(summoner.id), i18n._(t`Sending summoner`))
                                }
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
                                onClick={async () =>
                                    await sendToast(adventure_cellar(summoner.id), i18n._(t`Sending summoner`))
                                }
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
                    <p>
                        <button className="w-full my-1" onClick={() => setModalOpen(Modals.DELETE)}>
                            <div className="uppercase px-2 py-2 items-center border-white border-2 bg-red rounded-lg">
                                {i18n._(t`delete`)}
                            </div>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SummonerSummaryCard
