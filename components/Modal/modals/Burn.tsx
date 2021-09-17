import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import toast from 'react-hot-toast'
import useRarity from '../../../hooks/useRarity'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { BURN_ADDRESS } from '../../../constants'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'

interface BurnModalProps {
    open: boolean
    closeFunction: () => void
    summoner: SummonerFullData
}

export default function BurnModal({ open, closeFunction, summoner }: BurnModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { transferFrom } = useRarity()

    const { account } = useActiveWeb3React()

    async function deleteConfirm() {
        await toast.promise(transferFrom(account, BURN_ADDRESS, summoner.id), {
            loading: <b>{i18n._(t`Deleting summoner`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
        closeFunction()
    }

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`delete summoner`)} onClose={closeFunction} />
                <div className="text-center text-white p-4 pb-8 gap-5">
                    <h2>{i18n._(t`Are you sure you want to delete this summoner?`)}</h2>
                    <h2>
                        <b>{i18n._(t`This action is IRREVERSIBLE.`)}</b>
                    </h2>
                    <h2>
                        <b>{i18n._(t`All items and experience will be lost.`)}</b>
                    </h2>
                </div>
                <div className="flex flex-row justify-center pb-8">
                    <div className="bg-background-middle hover:bg-background-start text-white border-white border-2 rounded-lg mx-4">
                        <button className="w-full uppercase px-2 py-1" onClick={closeFunction}>
                            <h2>{i18n._(t`cancel`)}</h2>
                        </button>
                    </div>
                    <div className="bg-red hover:bg-red-hovered text-white border-white border-2 rounded-lg mx-4">
                        <button className="w-full uppercase px-2 py-1" onClick={() => deleteConfirm()}>
                            <h2>{i18n._(t`confirm`)}</h2>
                        </button>
                    </div>
                </div>
            </div>
        </HeadlessUIModal>
    )
}
