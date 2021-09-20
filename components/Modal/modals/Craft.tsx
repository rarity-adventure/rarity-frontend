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
    closeFunction: () => void
    success: boolean
    item: Item
}

export default function CraftResultModal({ open, closeFunction, success, item }: CraftModalProps): JSX.Element {
    const { i18n } = useLingui()

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-card-bottom rounded-lg border-2 border-white">
                {success ? (
                    <>
                        <ModalHeader title={i18n._(t`CONGRATULATIONS!`)} onClose={closeFunction} />
                        <div className="text-center p-2 mb-3 -mt-1 text-white">
                            <p className="text-center">{i18n._(t`You have successfully crafted`)}</p>
                            <p className="text-center uppercase mt-2">{item.name}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <ModalHeader title={i18n._(t`OH NO...`)} onClose={closeFunction} />
                        <div className="text-center p-2 mb-3 -mt-1 text-white">
                            <p>{i18n._(t`Your summoner messed up. `)}</p>
                            <p>{i18n._(t`Better luck next time!`)}</p>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}
