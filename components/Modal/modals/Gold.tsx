import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import toast from 'react-hot-toast'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import { chunkArrayByNumber } from '../../../functions/array'
import useRarityHelper from '../../../hooks/useRarityHelper'

interface GoldModalProps {
    open: boolean
    closeFunction: () => void
    summoners: SummonerFullData[]
}

export default function GoldModal({ open, closeFunction, summoners }: GoldModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { claim_gold, is_approved } = useRarityHelper()

    async function submit() {
        const chunks = chunkArrayByNumber(summoners, 100)
        for (let i = 0; i < chunks.length; i++) {
            const chunk_summoners = chunks[i].map((s) => {
                return s.id
            })
            const approvals = await is_approved(chunk_summoners)
            const summoners_approve = []
            for (let j = 0; j < approvals.length; j++) {
                if (!approvals[j]) {
                    summoners_approve.push(chunk_summoners[j])
                }
            }
            await toast.promise(claim_gold(chunk_summoners, summoners_approve), {
                loading: (
                    <b>
                        {i18n._(t`Sending chunk:`)} {i + 1} of {chunks.length}{' '}
                    </b>
                ),
                success: <b>{i18n._(t`Success`)}</b>,
                error: <b>{i18n._(t`Failed`)}</b>,
            })
        }
    }

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`claim gold summoners`)} onClose={closeFunction} />
                <div className="text-center text-white p-4 pb-8 gap-5">
                    {summoners.length > 0 ? (
                        <div>
                            <h2>
                                {i18n._(t`You have`)} {summoners.length} {i18n._(t`summoners available to claim gold.`)}{' '}
                            </h2>
                            <h2 className="mt-1">{i18n._(t`We will send 1 transaction for each 100 summoners`)}</h2>
                            <button
                                onClick={() => submit()}
                                className="bg-green border-white border-2 p-2 uppercase rounded-lg mt-4"
                            >
                                {i18n._(t`claim gold`)}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2>{i18n._(t`No summoners available to claim gold`)} </h2>
                        </div>
                    )}
                </div>
            </div>
        </HeadlessUIModal>
    )
}
