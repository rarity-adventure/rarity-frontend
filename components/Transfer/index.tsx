import { useLingui } from '@lingui/react'
import React, { useEffect, useState } from 'react'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { t } from '@lingui/macro'
import TransferBulkModal from '../Modal/modals/TransferBulk'

interface BulkTransferProps {
    s: SummonerFullData[]
}

export default function BulkTransfer({ s }: BulkTransferProps): JSX.Element {
    const { i18n } = useLingui()

    const [modal, setModal] = useState(false)

    function close() {
        setModal(false)
    }

    const [summoners, setSummoners] = useState<SummonerFullData[]>(s)

    useEffect(() => {
        setSummoners(s)
    }, [s])

    return (
        <div>
            {summoners.length > 0 && (
                <div className="flex flex-row justify-center uppercase">
                    <TransferBulkModal open={modal} closeFunction={close} summoners={summoners} />
                    <button onClick={() => setModal(true)} className="uppercase p-2">
                        {i18n._(t`bulk transfer`)}
                    </button>
                </div>
            )}
        </div>
    )
}
