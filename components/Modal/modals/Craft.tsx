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
import Loader from '../../Loader'

interface CraftModalProps {
    open: boolean
    closeFunction: () => void
    success: boolean
    item: Item
    loading: boolean
}

export default function CraftResultModal({
    open,
    closeFunction,
    success,
    item,
    loading,
}: CraftModalProps): JSX.Element {
    const { i18n } = useLingui()

    return (
        <Modal isOpen={open} onDismiss={closeFunction}>
            <div className="bg-card-bottom rounded-lg border-2 border-white">
                {loading ? (
                    <>
                        <ModalHeader title={i18n._(t`CRAFTING!`)} onClose={closeFunction} />
                        <div className="text-center flex flex-row justify-center animate-spin mb-5">
                            <svg
                                className="animate-spin-slow"
                                style={{ height: 50, width: 50 }}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    stroke={'#ffffff'}
                                />
                            </svg>
                        </div>
                    </>
                ) : success ? (
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
