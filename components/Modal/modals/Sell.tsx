import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import toast from 'react-hot-toast'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import useRarityStarterPack from '../../../hooks/useRarityStarterPack'

interface BurnModalProps {
    open: boolean
    closeFunction: () => void
    summoner: SummonerFullData
}

export default function SellModal({ open, closeFunction, summoner }: BurnModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { sell_summoners } = useRarityStarterPack()

    async function sellConfirm() {
        await toast.promise(sell_summoners([summoner.id]), {
            loading: <b>{i18n._(t`Selling summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
        closeFunction()
    }

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`sell summoner`)} onClose={closeFunction} />
                <div className="text-center text-white p-4 pb-8 gap-5">
                    <h2>{i18n._(t`Are you sure you want to sell this summoner?`)}</h2>
                    <h2>
                        <b>{i18n._(t`This action is IRREVERSIBLE.`)}</b>
                    </h2>
                    <h2>
                        <b>{i18n._(t`All items and experience will be lost and you will receive 0.6 FTM.`)}</b>
                    </h2>
                </div>
                <div className="flex flex-row justify-center pb-8">
                    <div className="bg-background-middle hover:bg-background-start text-white border-white border-2 rounded-lg mx-4">
                        <button className="w-full uppercase px-2 py-1" onClick={closeFunction}>
                            <h2>{i18n._(t`cancel`)}</h2>
                        </button>
                    </div>
                    <div className="bg-red hover:bg-red-hovered text-white border-white border-2 rounded-lg mx-4">
                        <button className="w-full uppercase px-2 py-1" onClick={() => sellConfirm()}>
                            <h2>{i18n._(t`confirm`)}</h2>
                        </button>
                    </div>
                </div>
            </div>
        </HeadlessUIModal>
    )
}
