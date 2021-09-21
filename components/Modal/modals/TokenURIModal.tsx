import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import Modal from '../index'
import Image from 'next/image'
import useRarityCrafting from '../../../hooks/useRarityCrafting'
import Loader from '../../Loader'

interface TokenURIModalProps {
    open: boolean
    closeFunction: () => void
    id: number
}

export default function TokenURIModal({ open, closeFunction, id }: TokenURIModalProps): JSX.Element {
    const { i18n } = useLingui()

    const [uri, setUri] = useState<any>(undefined)

    const { tokenURI } = useRarityCrafting()

    const fetch_uri = useCallback(async () => {
        const uri = await tokenURI(id)
        if (uri) {
            const encoded = uri.split(',')
            const json = JSON.parse(atob(encoded[1]))
            setUri(json.image)
        }
    }, [tokenURI, setUri])

    useEffect(() => {
        fetch_uri()
    }, [id, fetch_uri])

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-card-bottom rounded-lg text-white border-2 border-white w-full text-center pb-4 border-white border-2 ">
                <ModalHeader title={i18n._(t`ID`) + ':' + id} onClose={closeFunction} />
                {uri ? (
                    <Image className={'mx-auto rounded-lg break-normal'} src={uri} height={300} width={300} />
                ) : (
                    <Loader size={'50'} />
                )}
            </div>
        </Modal>
    )
}
