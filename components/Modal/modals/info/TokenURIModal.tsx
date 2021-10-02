import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import Image from 'next/image'
import Modal from '../../Modal'
import ModalHeader from '../../ModalHeader'

interface TokenURIModalProps {
    open: boolean
    closeFunction: () => void
    id: number
    uri: any
}

export default function TokenURIModal({ open, closeFunction, uri, id }: TokenURIModalProps): JSX.Element {
    const { i18n } = useLingui()

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-card-bottom rounded-lg text-white border-2 border-white w-full text-center pb-4 border-white border-2 ">
                <ModalHeader title={i18n._(t`ID`) + ':' + id} onClose={closeFunction} />
                <Image
                    className={'mx-auto rounded-lg break-normal'}
                    src={uri}
                    height={300}
                    width={300}
                    alt={'tokenURI'}
                />
            </div>
        </Modal>
    )
}
