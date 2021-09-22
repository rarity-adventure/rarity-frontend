import HeadlessUIModal from '../HeadlessUIModal'
import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useLingui } from '@lingui/react'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { SummonerFullData } from '../../../hooks/useRarityLibrary'
import CoinSelector from '../../CoinSelector'
import { CoinData } from '../../../constants'

interface TransferModalProps {
    open: boolean
    closeFunction: () => void
    summoners: SummonerFullData[]
}

export default function TransferBulkModal({ open, closeFunction, summoners }: TransferModalProps): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const [coin, setCoin] = useState<CoinData | undefined>(undefined)

    return (
        <HeadlessUIModal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-background-end rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`bulk transfer`)} onClose={closeFunction} />
                <CoinSelector select={setCoin} />
                {coin ? <div /> : <div className="h-48" />}
            </div>
        </HeadlessUIModal>
    )
}
