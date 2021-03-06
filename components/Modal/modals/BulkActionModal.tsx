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

    async function submit(tip: boolean, action: BulkAction) {
        let chunks

        if (action === BulkAction.LEVELUP || action === BulkAction.ADVENTURE) {
            chunks = chunkArrayByNumber(filter_summoners(summoners, action), 200)
        } else {
            chunks = chunkArrayByNumber(filter_summoners(summoners, action), 100)
        }

        for (let i = 0; i < chunks.length; i++) {
            if (tip && i === 0) {
                const func = getBulkActionDonate(action)
                await sendToast(
                    func(
                        chunks[i].map((s) => {
                            return s.id
                        })
                    ),
                    i18n._(t`Sending chunk:`) + ' ' + (i + 1).toString() + ' of ' + chunks.length
                )
            } else {
                const func = getBulkAction(action)
                await sendToast(
                    func(
                        chunks[i].map((s) => {
                            return s.id
                        })
                    ),
                    i18n._(t`Sending chunk:`) + ' ' + (i + 1).toString() + ' of ' + chunks.length
                )
            }
        }
    }

    const filter_summoners = useCallback((summoners: SummonerFullData[], action: BulkAction): SummonerFullData[] => {
        switch (action) {
            case BulkAction.ADVENTURE:
                return summoners.filter((s) => s.base._log * 1000 < Date.now())
            case BulkAction.LEVELUP:
                return summoners.filter((s) => s.base._xp >= calcXPForNextLevel(s.base._level))
            case BulkAction.DUNGEON:
                return summoners.filter((s) => s.materials.log * 1000 < Date.now() && s.materials.scout !== 0)
            case BulkAction.GOLD:
                return summoners.filter((s) => s.gold.claimable > 0)
            default:
                return []
        }
    }, [])

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

    function getBulkAction(action: BulkAction) {
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
    }

    function getBulkActionDonate(action: BulkAction) {
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
    }

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                {title && <ModalHeader title={i18n._(title)} onClose={closeFunction} />}
                <div className="text-center text-white p-4 pb-8 gap-5">
                    {filter_summoners(summoners, action).length > 0 ? (
                        <div>
                            <h2>
                                {i18n._(t`You have`)} {filter_summoners(summoners, action).length}{' '}
                                {i18n._(t`summoners available.`)}{' '}
                            </h2>
                            {(action === BulkAction.ADVENTURE && summoners.length >= 200) ||
                                (action === BulkAction.LEVELUP && summoners.length >= 200 && (
                                    <h2 className="mt-1">
                                        {i18n._(t`We will send 1 transaction for each 200 summoners`)}
                                    </h2>
                                ))}
                            {(action === BulkAction.DUNGEON && summoners.length >= 100) ||
                                (action === BulkAction.GOLD && summoners.length >= 100 && (
                                    <h2 className="mt-1">
                                        {i18n._(t`We will send 1 transaction for each 100 summoners`)}
                                    </h2>
                                ))}
                            {approved ? (
                                <>
                                    <div>
                                        <button
                                            onClick={() => submit(true, action)}
                                            className="bg-green border-white border-2 p-2 uppercase rounded-lg mt-4"
                                        >
                                            {i18n._(t`send with 0.1 FTM tip for devs`)}
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => submit(false, action)}
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
