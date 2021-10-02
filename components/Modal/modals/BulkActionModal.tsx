import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLingui } from '@lingui/react'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import useRarity from '../../../hooks/useRarity'
import useRarityHelper from '../../../hooks/useRarityHelper'
import { RARITY_HELPER_ADDRESS } from '../../../constants'
import Modal from '../Modal'
import ModalHeader from '../ModalHeader'
import { chunkArrayByNumber } from '../../../functions/chunkArray'
import { sendToast } from '../../../functions/toast'
import { calcXPForNextLevel } from '../../../functions/calcXPForNextLevel'

interface BulkActionModalProps {
    a: BulkAction
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

export default function BulkActionModal({ open, closeFunction, summoners, a }: BulkActionModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const { isApprovedForAll, setApprovalForAll } = useRarity()
    const {
        adventure,
        adventure_donate,
        level_up,
        level_up_donate,
        claim_gold,
        claim_gold_donate,
        cellar,
        cellar_donate,
    } = useRarityHelper()

    const [approved, setApproved] = useState(false)

    const fetch_approval = useCallback(async () => {
        const approved = await isApprovedForAll(account, RARITY_HELPER_ADDRESS)
        setApproved(approved)
    }, [account, isApprovedForAll])

    useEffect(() => {
        fetch_approval()
    }, [summoners, fetch_approval])

    async function submit(tip: boolean) {
        const chunks = chunkArrayByNumber(filter_summoners(summoners), 200)
        for (let i = 0; i < chunks.length; i++) {
            if (tip && i === 0) {
                await sendToast(
                    bulk_action_donate(
                        chunks[i].map((s) => {
                            return s.id
                        })
                    ),
                    i18n._(t`Sending chunk:`) + ' ' + (i + 1).toString() + ' of ' + chunks.length
                )
            } else {
                await sendToast(
                    bulk_action(
                        chunks[i].map((s) => {
                            return s.id
                        })
                    ),
                    i18n._(t`Sending chunk:`) + ' ' + (i + 1).toString() + ' of ' + chunks.length
                )
            }
        }
    }

    const [action, setAction] = useState(0)

    useEffect(() => {
        setAction(a)
    }, [a])

    const filter_summoners = useCallback(
        (summoners: SummonerFullData[]): SummonerFullData[] => {
            switch (action) {
                case BulkAction.ADVENTURE:
                    return summoners.filter((s) => s.base._log * 1000 < Date.now())
                case BulkAction.LEVELUP:
                    return summoners.filter((s) => s.base._xp >= calcXPForNextLevel(s.base._level))
                case BulkAction.DUNGEON:
                    return summoners.filter((s) => s.gold.claimable > 0)
                case BulkAction.GOLD:
                    return summoners.filter((s) => s.materials.log * 1000 < Date.now() && s.materials.scout !== 0)
                default:
                    return []
            }
        },
        [action]
    )

    const title = useMemo(() => {
        switch (action) {
            case BulkAction.ADVENTURE:
                return 'adventure summoners'
            case BulkAction.LEVELUP:
                return 'level-up summoners'
            case BulkAction.DUNGEON:
                return 'dungeon summoners'
            case BulkAction.GOLD:
                return 'claiming gold'
        }
    }, [action])

    const bulk_action = useMemo(() => {
        switch (action) {
            case BulkAction.ADVENTURE:
                return adventure
            case BulkAction.LEVELUP:
                return level_up
            case BulkAction.DUNGEON:
                return cellar
            case BulkAction.GOLD:
                return claim_gold
        }
    }, [action, adventure, cellar, claim_gold, level_up])

    const bulk_action_donate = useMemo(() => {
        switch (action) {
            case BulkAction.ADVENTURE:
                return adventure_donate
            case BulkAction.LEVELUP:
                return level_up_donate
            case BulkAction.DUNGEON:
                return cellar_donate
            case BulkAction.GOLD:
                return claim_gold_donate
        }
    }, [action, adventure_donate, level_up_donate, cellar_donate, claim_gold_donate])

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                {title && <ModalHeader title={i18n._(title)} onClose={closeFunction} />}
                <div className="text-center text-white p-4 pb-8 gap-5">
                    {filter_summoners(summoners).length > 0 ? (
                        <div>
                            <h2>
                                {i18n._(t`You have`)} {filter_summoners(summoners).length}{' '}
                                {i18n._(t`summoners available to send for adventure.`)}{' '}
                            </h2>
                            {summoners.length >= 200 && (
                                <h2 className="mt-1">{i18n._(t`We will send 1 transaction for each 200 summoners`)}</h2>
                            )}
                            {approved ? (
                                <>
                                    {filter_summoners(summoners).length >= 10 && (
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
                                    onClick={() =>
                                        sendToast(
                                            setApprovalForAll(RARITY_HELPER_ADDRESS),
                                            i18n._(t`Approving helper contract`)
                                        ).then(() => setApproved(true))
                                    }
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
