import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import toast from 'react-hot-toast'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import useRarityGold from '../../../hooks/useRarityGold'
import { utils } from 'ethers'

interface TransferGoldModalProps {
    open: boolean
    closeFunction: () => void
    id: number
}

export default function TransferGoldModal({ open, closeFunction, id }: TransferGoldModalProps): JSX.Element {
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
                <div className="text-center text-white p-4 pb-8 gap-5">
                    <input
                        className="p-2 text-background-end rounded-lg text-center"
                        onChange={(v) => setTransferAmount(utils.parseEther(v.target.value).toString())}
                    />
                </div>
                <div className="text-center text-white p-4 pb-4 gap-5">
                    <h2>{i18n._(t`Write ID of the receiver summoner`)}</h2>
                </div>
                <div className="text-center text-white p-4 pb-8 gap-5">
                    <input
                        className="p-2 text-background-end rounded-lg text-center"
                        onChange={(v) => setTransferTo(parseInt(v.target.value))}
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
