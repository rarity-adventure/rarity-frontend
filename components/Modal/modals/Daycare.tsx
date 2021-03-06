import Modal from '../Modal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useState, useEffect, useCallback } from 'react'
import { useLingui } from '@lingui/react'
import { RARITY_ADVENTURE_TIME } from '../../../constants'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import useRarityDaycare from '../../../hooks/useRarityDaycare'
import useRarity from '../../../hooks/useRarity'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { sendToast } from '../../../functions/toast'

interface TransferModalProps {
    open: boolean
    closeFunction: () => void
    summoners: SummonerFullData[]
}

export default function DaycareModal({ open, closeFunction, summoners }: TransferModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const { registerDaycare } = useRarityDaycare()

    const { isApprovedForAll, setApprovalForAll } = useRarity()

    const [days, setDays] = useState(0)

    const [adventureTimeApproval, setAdventureTimeApproval] = useState(false)

    const fetch_approval = useCallback(async () => {
        const approved = await isApprovedForAll(account, RARITY_ADVENTURE_TIME)
        setAdventureTimeApproval(approved)
    }, [account, isApprovedForAll])

    useEffect(() => {
        fetch_approval()
    }, [fetch_approval])

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`summoner daily care`)} onClose={closeFunction} />
                <div className="text-center text-white p-4 pb-2 gap-5">
                    <h2>{i18n._(t`The daily care is a community run system to take care of your summoners`)}</h2>
                </div>
                <div className="text-center text-white p-4 pb-2 gap-5">
                    <h2>{i18n._(t`The service has a fee of 0.1 FTM for each summoner for each day.`)}</h2>
                </div>
                <div className="text-center text-white p-4 pb-2 gap-5">
                    <h2>{i18n._(t`How many days do you want to register your summoner/s?`)}</h2>
                </div>
                {adventureTimeApproval ? (
                    <>
                        <div className="text-center text-white p-4 pb-4 gap-5">
                            <input
                                type="number"
                                className="p-2 text-background-end text-center"
                                onChange={(v) => setDays(parseInt(v.target.value))}
                            />
                        </div>
                        <div className="flex flex-row justify-center pb-8">
                            <div className="bg-background-middle hover:bg-background-start text-white border-white border-2 rounded-lg mx-4">
                                <button
                                    className="w-full uppercase px-2 py-1"
                                    onClick={async () =>
                                        await sendToast(
                                            registerDaycare(
                                                summoners.map((s) => s.id),
                                                days
                                            ),
                                            i18n._(t`Registering summoner`)
                                        )
                                    }
                                >
                                    <h2>{i18n._(t`register summoner`)}</h2>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-white p-4 pb-16 gap-5">
                        <button
                            onClick={() =>
                                sendToast(
                                    setApprovalForAll(RARITY_ADVENTURE_TIME),
                                    i18n._(t`Approving adventure time contract`)
                                ).then(() => setAdventureTimeApproval(true))
                            }
                            className="bg-green border-white border-2 p-2 uppercase rounded-lg mt-4"
                        >
                            {i18n._(t`approve adventure time`)}
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    )
}
