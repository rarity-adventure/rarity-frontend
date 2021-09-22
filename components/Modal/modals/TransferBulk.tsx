import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import CoinSelector from '../../CoinSelector'
import { CoinData } from '../../../constants'
import SummonerSelector from '../../SummonerSelector'
import { CLASSES_NAMES } from '../../../constants/classes'
import Loader from '../../Loader'
import useRarityGold from '../../../hooks/useRarityGold'
import useRarityCellar from '../../../hooks/useRarityCellar'
import toast from 'react-hot-toast'

function SummonerTransferRow({
    summoner,
    coin,
    receiver,
}: {
    summoner: SummonerFullData
    coin: CoinData
    receiver: SummonerFullData
}): JSX.Element {
    const { i18n } = useLingui()

    const [sending, setSending] = useState(false)

    const gold = useRarityGold()
    const material = useRarityCellar()

    const transfers: { [k: string]: (executor: number, from: number, to: number, amount: string) => Promise<void> } = {
        gold: gold.transferFrom,
        materials: material.transferFrom,
    }

    const [balance, setBalance] = useState<number>(summoner[coin.name.toLowerCase()].balance)

    async function send() {
        setSending(true)
        const func = transfers[coin.name.toLowerCase()]
        toast
            .promise(
                func(summoner.id, summoner.id, receiver.id, summoner[coin.name.toLowerCase()].balance.toString()),
                {
                    loading: <b>{i18n._(t`Transferring ` + ' ' + coin.name.toUpperCase())}</b>,
                    success: <b>{i18n._(t`Success`)}</b>,
                    error: <b>{i18n._(t`Failed`)}</b>,
                }
            )
            .then(() => {
                setSending(false)
                setBalance(0)
            })
    }

    return (
        <div className="flex flex-row justify-between text-white uppercase p-2 items-center px-3 text-left w-full border-black border-opacity-30 border shadow">
            <div>
                {' '}
                {summoner.base._name !== ''
                    ? summoner.base._name
                    : summoner.id.toString() +
                      ' ' +
                      i18n._(t`level`) +
                      ' ' +
                      summoner.base._level +
                      ' ' +
                      i18n._(CLASSES_NAMES[summoner.base._class.toString()])}
            </div>
            {balance ? (
                sending ? (
                    <div>
                        <Loader />
                    </div>
                ) : (
                    <button
                        onClick={async () => await send()}
                        className="text-xs uppercase bg-green border-white border-2 rounded-lg p-1"
                    >
                        {summoner[coin.name.toLowerCase()].balance} {coin.name.toUpperCase()}
                    </button>
                )
            ) : (
                <button className="opacity-50 text-xs uppercase bg-green border-white border-2 rounded-lg p-1">
                    0 {coin.name.toUpperCase()}
                </button>
            )}
            {}
        </div>
    )
}

interface TransferModalProps {
    open: boolean
    closeFunction: () => void
    summoners: SummonerFullData[]
}

export default function TransferBulkModal({ open, closeFunction, summoners }: TransferModalProps): JSX.Element {
    const { i18n } = useLingui()

    const [coin, setCoin] = useState<CoinData | undefined>(undefined)

    const [filteredSummoners, setFilteredSummoners] = useState<SummonerFullData[]>([])

    const [receiver, setReceiver] = useState<SummonerFullData | undefined>(undefined)

    useEffect(() => {
        if (coin && receiver) {
            setFilteredSummoners(
                summoners.filter((s) => s[coin.name.toLowerCase()].balance !== 0 && s.id !== receiver.id)
            )
        }
    }, [coin, receiver])

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`bulk transfer`)} onClose={closeFunction} />
                <div className="mx-auto text-center text-white text-center">
                    <CoinSelector select={setCoin} selected={coin} />
                </div>
                <div className="mx-auto text-center text-white w-48 text-center mb-2">
                    <SummonerSelector summoners={summoners} select={setReceiver} />
                </div>
                <div className="w-full md:w-2/3 mx-auto mb-5">
                    {receiver && (
                        <div className="bg-green py-2 px-10 text-center uppercase text-white rounded-lg border-white border-2">
                            Receiver:{' '}
                            {receiver.base._name !== ''
                                ? receiver.base._name
                                : receiver.id.toString() +
                                  ' ' +
                                  i18n._(t`level`) +
                                  ' ' +
                                  receiver.base._level +
                                  ' ' +
                                  i18n._(CLASSES_NAMES[receiver.base._class.toString()])}
                        </div>
                    )}
                </div>
                {coin && receiver ? (
                    <div className="w-full p-5">
                        <div className="grid grid-cols-1 w-full p-4 overflow-scroll overflow-hidden h-72 mb-2 bg-card-button mb-16 rounded-xl border-white border-2">
                            {filteredSummoners.map((k) => {
                                return (
                                    <div key={k.id} className="my-2">
                                        <SummonerTransferRow summoner={k} coin={coin} receiver={receiver} />
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
