import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import { isAddress } from '../../../functions/validate'
import toast from 'react-hot-toast'
import useRarity from '../../../hooks/useRarity'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { ItemData, SummonerFullData } from '../../../hooks/useRarityLibrary'
import useRarityCrafting from '../../../hooks/useRarityCrafting'

interface TransferItemModalProps {
    open: boolean
    closeFunction: () => void
    item: ItemData
}

export default function TransferItemModal({ open, closeFunction, item }: TransferItemModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { transferFrom } = useRarityCrafting()

    const { account } = useActiveWeb3React()

    async function transferConfirm() {
        const address = typeof transferAddress.address === 'string' ? transferAddress.address : ''
        await toast.promise(transferFrom(account, address, item.token_id), {
            loading: <b>{i18n._(t`Transferring item`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
        closeFunction()
    }

    const [transferAddress, setTransferAddress] = useState<{ input: boolean; address: string | boolean }>({
        input: false,
        address: false,
    })

    function transferAddressHandler(address: string) {
        if (address === '' || !address) {
            setTransferAddress({ input: false, address: false })
        } else {
            setTransferAddress({ input: true, address: isAddress(address) })
        }
    }

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`transfer item`)} onClose={closeFunction} />
                <div className="text-center text-white p-4 pb-4 gap-5">
                    <h2>{i18n._(t`Write the address to transfer the item`)}</h2>
                </div>
                <div className="text-center text-white p-4 pb-8 gap-5">
                    <input
                        className="p-2 text-background-end rounded-lg"
                        onChange={(v) => transferAddressHandler(v.target.value)}
                    />
                </div>
                <div className="flex flex-row justify-center pb-8">
                    <div className=" text-white  mx-4">
                        {transferAddress.address ? (
                            <button
                                className="bg-red hover:bg-red-hovered border-white border-2 rounded-lg uppercase px-2 py-1"
                                onClick={() => transferConfirm()}
                            >
                                <h2>{i18n._(t`confirm`)}</h2>
                            </button>
                        ) : (
                            <>
                                {transferAddress.input && (
                                    <div className="opacity-80 bg-red-hovered text-white w-full mb-4 text-center rounded-lg text-xs">
                                        <h2 className="p-2 uppercase">{i18n._(t`invalid address`)}</h2>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </HeadlessUIModal>
    )
}
