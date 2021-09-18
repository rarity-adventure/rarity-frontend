import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import toast from 'react-hot-toast'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { RARITY_HELPER_ADDRESS } from '../../../constants'
import { chunkArrayByNumber } from '../../../functions/array'
import useRarityHelper from '../../../hooks/useRarityHelper'
import { utils } from 'ethers'

interface DonateModalProps {
    open: boolean
    closeFunction: () => void
}

export default function DonateModal({ open, closeFunction }: DonateModalProps): JSX.Element {
    const { i18n } = useLingui()

    const [amount, setAmount] = useState('0')

    const { donate } = useRarityHelper()

    async function submit() {
        const parsedAmount = utils.parseUnits(amount.toString(), 'ether').toHexString()
        await toast.promise(donate(parsedAmount.toString()), {
            loading: <b>{i18n._(t`Donating! Thanks!`)}</b>,
            success: <b>{i18n._(t`Success`)}</b>,
            error: <b>{i18n._(t`Failed`)}</b>,
        })
    }

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`donate`)} onClose={closeFunction} />
                <div className="text-center text-white p-2 pb-4 gap-5">
                    <h2>{i18n._(t`Thanks for your donations!`)}</h2>
                </div>
                <div className="text-center text-white pb-8 gap-5">
                    <h2>{i18n._(t`Set an amount (in FTM)`)}</h2>
                    <input
                        type="number"
                        className="p-2 mt-2 text-background-end rounded-lg text-center"
                        onChange={(v) => setAmount(v.target.value)}
                    />
                </div>
                <div className="text-center text-white pb-8 gap-5">
                    {amount !== '0' ? (
                        <button
                            className="text-white bg-green border-white border-2 rounded-lg uppercase px-2 py-1"
                            onClick={() => submit()}
                        >
                            <h2>{i18n._(t`donate`)}</h2>
                        </button>
                    ) : (
                        <button
                            className="opacity-50 text-white bg-green border-white border-2 rounded-lg uppercase px-2 py-1"
                            onClick={() => submit()}
                        >
                            <h2>{i18n._(t`donate`)}</h2>
                        </button>
                    )}
                </div>
            </div>
        </HeadlessUIModal>
    )
}
