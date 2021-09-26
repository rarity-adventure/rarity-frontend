import HeadlessUIModal from '../HeadlessUIModal'
import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import { useListedSummonerFeats } from '../../../services/graph/hooks'

interface MarketFeatsModalProps {
    open: boolean
    closeFunction: () => void
    summoner: number
}

export default function MarketFeatsModal({ open, closeFunction, summoner }: MarketFeatsModalProps): JSX.Element {
    const { i18n } = useLingui()

    const feats = useListedSummonerFeats(summoner)

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <div style={{ width: '150px' }} className="text-center">
                    <button
                        onClick={closeFunction}
                        className="uppercase border-2 border-white px-1 py-1.5 rounded-lg text-xs bg-card-top"
                    >
                        {i18n._(t`close`)}
                    </button>
                </div>
            </div>
        </HeadlessUIModal>
    )
}
