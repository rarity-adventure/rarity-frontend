import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import { SummonerFullData } from '../../../../hooks/useRarityLibrary'
import useRarityCellar from '../../../../hooks/useRarityCellar'
import Modal from '../../Modal'
import ModalHeader from '../../ModalHeader'
import SummonerSelector from '../../../Selectors/Summoners'
import { sendToast } from '../../../../functions/toast'
import useRarityGold from '../../../../hooks/useRarityGold'

interface TransferCoinModalProps {
    open: boolean
    coin: string
    closeFunction: () => void
    id: number
    summoners: SummonerFullData[]
}

export default function TransferCoinModal({
    open,
    closeFunction,
    id,
    summoners,
    coin,
}: TransferCoinModalProps): JSX.Element {
    const { i18n } = useLingui()

    const gold = useRarityGold()
    const material = useRarityCellar()

    const transfers: { [k: string]: (executor: number, from: number, to: number, amount: string) => Promise<void> } = {
        gold: gold.transferFrom,
        materials: material.transferFrom,
    }

    const [transferTo, setTransferTo] = useState<number>(0)
    const [transferAmount, setTransferAmount] = useState<string>('0')

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`transfer`) + ' ' + coin.toUpperCase()} onClose={closeFunction} />
                <div className="text-center text-white p-4 pb-4 gap-5">
                    <h2>{i18n._(t`Amount to transfer`)}</h2>
                </div>
                <div className="text-center text-white p-4 pb-8 gap-5">
                    <input
                        className="p-2 text-background-end rounded-lg text-center"
                        onChange={(v) => setTransferAmount(v.target.value)}
                    />
                </div>
                <div className="text-center text-white p-4 pb-4 gap-5">
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
                                onClick={async () =>
                                    await sendToast(
                                        transfers[coin.toLowerCase()](id, id, transferTo, transferAmount),
                                        i18n._(t`Transferring`) + ' ' + coin.toUpperCase()
                                    )
                                }
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
        </Modal>
    )
}
