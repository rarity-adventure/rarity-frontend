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
    item: Item
}

export default function CraftResultModal({ open, closeFunction, success, item }: CraftModalProps): JSX.Element {
    const { i18n } = useLingui()

    return (
        <Modal isOpen={open} onDismiss={() => closeFunction(false)}>
            <div className="bg-card-bottom rounded-lg border-2 border-white">
                {success ? (
                    <>
                        <ModalHeader title={i18n._(t`CONGRATULATIONS!`)} onClose={() => closeFunction(false)} />
                        <div className="text-center">
                            <p className="text-center">{i18n._(t`You have successfully crafted`)}</p>
                            <p className="text-center">{item.name}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <ModalHeader title={i18n._(t`OH NO...`)} onClose={() => closeFunction(false)} />
                        <div className="text-center">
                            <p>{i18n._(t`Crafting failed`)}</p>
                            <p>{i18n._(t`Please try again`)}</p>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}
