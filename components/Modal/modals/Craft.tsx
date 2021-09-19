import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import { utils } from 'ethers'
import Modal from '../index'
import {
    ARMOR_PROFICIENCY,
    Item,
    ITEM_TYPE,
    WEAPON_DAMAGE_TYPE,
    WEAPON_ENCUMBRANCE,
    WEAPON_PROFICIENCY,
} from '../../../constants/codex/items'

interface CraftModalProps {
    open: boolean
    closeFunction: (craft: boolean) => void
    success: boolean
}

export default function ItemModal({ open, closeFunction }: CraftModalProps): JSX.Element {
    const { i18n } = useLingui()

    return (
        <Modal isOpen={open} onDismiss={() => closeFunction(false)}>
            <div className="bg-card-bottom rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`Craft Result`)} onClose={() => closeFunction(false)} />
                <div></div>
            </div>
        </Modal>
    )
}
