import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/classes'
import { t } from '@lingui/macro'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import BurnModal from '../Modal/modals/Burn'
import TransferModal from '../Modal/modals/Transfer'
import DaycareModal from '../Modal/modals/Daycare'

enum Modals {
    TRANSFER = 1,
    DELETE,
    DAYCARE,
}

function SummonerSummaryCard({
    summoner,
    summoners,
}: {
    summoner: SummonerFullData
    summoners: SummonerFullData[]
}): JSX.Element {
    const { i18n } = useLingui()

    const [modalOpen, setModalOpen] = useState<Modals>(0)

    function closeModals() {
        setModalOpen(0)
    }

    return (
        <div className="mx-auto w-56">
            <BurnModal open={modalOpen === Modals.DELETE} closeFunction={closeModals} summoner={summoner} />
            <TransferModal open={modalOpen === Modals.TRANSFER} closeFunction={closeModals} summoner={summoner} />
            <DaycareModal
                open={modalOpen === Modals.DAYCARE}
                closeFunction={closeModals}
                summoner={summoner}
                summoners={summoners}
            />
            <div className="p-5 w-32 mx-auto">{CLASSES_IMAGES[summoner.base._class]}</div>

            <div className="grid grid-cols-1 rounded-2xl border-white border-2 bg-background-contrast divide-white divide-y-2">
                <div className="mx-auto p-2">
                    <span>{i18n._(CLASSES_NAMES[summoner.base._class])}</span>
                </div>
                <div className="p-2 text-xs">
                    <p>{summoner.base._name}</p>
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
                </div>
                <div className="p-2 text-xs">
                    <div className="flex flex-row justify-between mr-2 items-center">
                        <p>{i18n._(t`daycare`)}</p>
                        <button onClick={() => setModalOpen(Modals.DAYCARE)}>
                            {summoner.misc.daycare_days_paid === 0 ? (
                                <div className="px-2 py-2 text-center items-center border-white border-2 bg-red rounded-lg">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            ) : (
                                <div className="px-2 py-2 text-center items-center border-white border-2 bg-green rounded-lg">
                                    {summoner.misc.daycare_days_paid}
                                </div>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-row justify-between mr-2 items-center my-2">
                        <p>{i18n._(t`adventure`)}</p>
                        <button></button>
                    </div>
                    <div className="flex flex-row justify-between mr-2 items-center">
                        <p>{i18n._(t`cellar`)}</p>
                        <button></button>
                    </div>
                </div>
                <div className="p-2 text-xs w-full">
                    <p>
                        <button className="w-full my-1" onClick={() => setModalOpen(Modals.TRANSFER)}>
                            <div className="px-2 py-2 items-center border-white border-2 bg-background-start rounded-lg">
                                TRANSFER
                            </div>
                        </button>
                    </p>
                    <p>
                        <button className="w-full my-1" onClick={() => setModalOpen(Modals.DELETE)}>
                            <div className="px-2 py-2 items-center border-white border-2 bg-red rounded-lg">DELETE</div>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SummonerSummaryCard
