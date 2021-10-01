import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import toast from 'react-hot-toast'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import useRarity from '../../../hooks/useRarity'
import useRarityHelper from '../../../hooks/useRarityHelper'
import { RARITY_HELPER_ADDRESS } from '../../../constants'
import { chunkArrayByNumber } from '../../../functions/array'
import Modal from '../Modal'
import ModalHeader from '../ModalHeader'

interface BulkActionModalProps {
    action: BulkAction
    open: boolean
    closeFunction: () => void
    summoners: SummonerFullData[]
}

export enum BulkAction {
    ADVENTURE = 1,
    LEVELUP,
    GOLD,
    DUNGEON,
}

export default function BulkActionModal({ open, closeFunction, summoners, action }: BulkActionModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const { isApprovedForAll, setApprovalForAll } = useRarity()
    const { adventure, adventure_donate } = useRarityHelper()

    const [approved, setApproved] = useState(false)

    const fetch_approval = useCallback(async () => {
        const approved = await isApprovedForAll(account, RARITY_HELPER_ADDRESS)
        setApproved(approved)
    }, [account, isApprovedForAll])

    useEffect(() => {
        fetch_approval()
    }, [summoners, fetch_approval])

    async function submit(tip: boolean) {
        const chunks = chunkArrayByNumber(summoners, 200)
        for (let i = 0; i < chunks.length; i++) {
            if (tip && i === 0) {
                await toast.promise(
                    adventure_donate(
                        chunks[i].map((s) => {
                            return s.id
                        })
                    ),
                    {
                        loading: (
                            <b>
                                {i18n._(t`Sending chunk:`)} {i + 1} of {chunks.length}{' '}
                            </b>
                        ),
                        success: <b>{i18n._(t`Success`)}</b>,
                        error: <b>{i18n._(t`Failed`)}</b>,
                    }
                )
            } else {
                await toast.promise(
                    adventure(
                        chunks[i].map((s) => {
                            return s.id
                        })
                    ),
                    {
                        loading: (
                            <b>
                                {i18n._(t`Sending chunk:`)} {i + 1} of {chunks.length}{' '}
                            </b>
                        ),
                        success: <b>{i18n._(t`Success`)}</b>,
                        error: <b>{i18n._(t`Failed`)}</b>,
                    }
                )
            }
        }
    }

    async function approveHelper() {
        toast
            .promise(setApprovalForAll(RARITY_HELPER_ADDRESS), {
                loading: <b>{i18n._(t`Approving helper contract`)}</b>,
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            })
            .then(() => setApproved(true))
    }

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`adventure summoners`)} onClose={closeFunction} />
                <div className="text-center text-white p-4 pb-8 gap-5">
                    {summoners.length > 0 ? (
                        <div>
                            <h2>
                                {i18n._(t`You have`)} {summoners.length}{' '}
                                {i18n._(t`summoners available to send for adventure.`)}{' '}
                            </h2>
                            {summoners.length >= 200 && (
                                <h2 className="mt-1">{i18n._(t`We will send 1 transaction for each 200 summoners`)}</h2>
                            )}
                            {approved ? (
                                <>
                                    {summoners.length >= 10 && (
                                        <div>
                                            <button
                                                onClick={() => submit(true)}
                                                className="bg-green border-white border-2 p-2 uppercase rounded-lg mt-4"
                                            >
                                                {i18n._(t`send with 0.1 FTM tip for devs`)}
                                            </button>
                                        </div>
                                    )}
                                    <div>
                                        <button
                                            onClick={() => submit(false)}
                                            className="bg-green border-white border-2 p-2 uppercase rounded-lg mt-4"
                                        >
                                            {i18n._(t`send summoners`)}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <button
                                    onClick={() => approveHelper()}
                                    className="bg-green border-white border-2 p-2 uppercase rounded-lg mt-4"
                                >
                                    {i18n._(t`approve helper`)}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h2>{i18n._(t`No summoners available for adventure  `)} </h2>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}
