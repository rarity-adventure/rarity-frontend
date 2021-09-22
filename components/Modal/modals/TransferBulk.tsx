import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import CoinSelector from '../../CoinSelector'
import { CoinData } from '../../../constants'
import SummonerSelector from '../../SummonerSelector'

interface TransferModalProps {
    open: boolean
    closeFunction: () => void
    summoners: SummonerFullData[]
}

export default function TransferBulkModal({ open, closeFunction, summoners }: TransferModalProps): JSX.Element {
    const { i18n } = useLingui()

    const [coin, setCoin] = useState<CoinData | undefined>(undefined)

    const [filteredSummoners, setFilteredSummoners] = useState<SummonerFullData[]>([])

    useEffect(() => {
        if (coin) {
            setFilteredSummoners(summoners.filter((s) => s[coin.name.toLowerCase()].balance !== 0))
        }
    }, [coin])

    const [receiver, setReceiver] = useState<SummonerFullData | undefined>(undefined)

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`bulk transfer`)} onClose={closeFunction} />
                <CoinSelector select={setCoin} selected={coin} />
                <SummonerSelector summoners={summoners} select={setReceiver} />
                {coin && receiver ? (
                    <div className="w-full">
                        <div className="grid grid-cols-1 w-full p-4 overflow-scroll overflow-hidden h-72 mb-2 bg-card-button mb-16 rounded-xl border-white border-2">
                            {filteredSummoners.map((k) => {
                                return (
                                    <div key={k.id} className="my-2">
                                        <div className="flex flex-row justify-between text-white uppercase p-1 px-3 text-left w-full border-black border-opacity-30 border shadow">
                                            <div>{k.id}</div>
                                            <button className="text-xs uppercase bg-green border-white border-2 rounded-lg p-1">
                                                Transfer: {k[coin.name.toLowerCase()].balance} {coin.name.toUpperCase()}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="h-48" />
                )}
            </div>
        </HeadlessUIModal>
    )
}
