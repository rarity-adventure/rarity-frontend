import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import toast from 'react-hot-toast'
import useRarityGold from '../../../hooks/useRarityGold'
import { utils } from 'ethers'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import SummonerSelector from '../../SummonerSelector'

interface TransferGoldModalProps {
    open: boolean
    closeFunction: () => void
    id: number
    summoners: SummonerFullData[]
}

export default function TransferGoldModal({ open, closeFunction, id, summoners }: TransferGoldModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { transferFrom } = useRarityGold()

    const [transferTo, setTransferTo] = useState<number>(0)
    const [transferAmount, setTransferAmount] = useState<string>('0')

    async function transferConfirm() {
        await toast.promise(transferFrom(id, id, transferTo, transferAmount), {
            loading: <b>{i18n._(t`Transferring GOLD`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
        closeFunction()
    }

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`transfer gold`)} onClose={closeFunction} />
                <div className="text-center text-white p-4 pb-4 gap-5">
                    <h2>{i18n._(t`Amount to transfer`)}</h2>
                </div>
                <div className="text-center text-white p-2 pb-2 gap-5">
                    <input
                        className="p-2 text-background-end rounded-lg text-center"
                        onChange={(v) => setTransferAmount(v.target.value)}
                    />
                </div>
                <div className="text-center text-white p-2 pb-2 gap-5">
                    <h2>{i18n._(t`ID of the receiver summoner`)}</h2>
                </div>
                <div className="mx-auto text-center text-white w-48 text-center">
                    <SummonerSelector summoners={summoners} select={(s) => setTransferTo(s.id)} />
                </div>
                <div className="text-center text-white p-4 pb-8 gap-5">
                    <input
                        className="p-2 text-background-end rounded-lg text-center"
                        value={transferTo}
                        onChange={(v) => setTransferTo(v.target.value !== '' ? parseInt(v.target.value) : 0)}
                    />
                </div>
                <div className="flex flex-row justify-center pb-8">
                    <div className=" text-white  mx-4">
                        {transferTo ? (
                            <button
                                className="bg-red hover:bg-red-hovered border-white border-2 rounded-lg uppercase px-2 py-1"
                                onClick={() => transferConfirm()}
                            >
                                <h2>{i18n._(t`confirm`)}</h2>
                            </button>
                        ) : (
                            <button className="bg-red opacity-50 hover:bg-red-hovered border-white border-2 rounded-lg uppercase px-2 py-1">
                                <h2>{i18n._(t`confirm`)}</h2>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </HeadlessUIModal>
    )
}
