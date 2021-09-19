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

interface ItemModalProps {
    open: boolean
    closeFunction: (craft: boolean) => void
    item: Item
    itemType: ITEM_TYPE
    checkOnly: boolean
}

export default function ItemModal({ open, closeFunction, item, itemType, checkOnly }: ItemModalProps): JSX.Element {
    const { i18n } = useLingui()

    return (
        <Modal isOpen={open} onDismiss={() => (checkOnly ? closeFunction(false) : closeFunction(true))}>
            <div className="bg-card-bottom rounded-lg border-2 border-white">
                <ModalHeader
                    title={i18n._(t`Equipment Info`)}
                    onClose={() => (checkOnly ? closeFunction(false) : closeFunction(true))}
                />
                {item && (
                    <div className="px-3 text-white pb-5 ">
                        <p>{item.name}</p>
                        <p>COST: {utils.formatUnits(item.cost.toString(), 'ether')} GOLD</p>
                        {item.proficiency ||
                        item.weight ||
                        item.spell_failure ||
                        item.damage_type ||
                        item.critical ||
                        item.damage ||
                        item.encumbrance ||
                        item.armor_bonus ||
                        item.max_dex_bonus ||
                        item.penalty ? (
                            <div className="overflow-scroll max-h-40 mt-5 text-xs rounded-lg bg-card-top border-2 border-white">
                                <div className="py-2 px-2">
                                    <p>Weight: {item.weight}</p>
                                    {item.proficiency ? (
                                        itemType === ITEM_TYPE.WEAPON ? (
                                            <p>Proficiency: {WEAPON_PROFICIENCY[item.proficiency]}</p>
                                        ) : (
                                            <p>Proficiency: {ARMOR_PROFICIENCY[item.proficiency]}</p>
                                        )
                                    ) : (
                                        <div />
                                    )}
                                    {item.damage_type ? <p>Damage: {WEAPON_DAMAGE_TYPE[item.damage_type]}</p> : <div />}
                                    {item.encumbrance ? (
                                        <p>Encumbrance: {WEAPON_ENCUMBRANCE[item.encumbrance]}</p>
                                    ) : (
                                        <div />
                                    )}
                                    {item.spell_failure ? <p>Spell Failure: {item.spell_failure}</p> : <div />}
                                    {item.damage ? <p>Damage: {item.damage}</p> : <div />}
                                    {item.critical ? <p>Critical: {item.critical}</p> : <div />}
                                    {item.armor_bonus ? <p>Armor Bonus: {item.armor_bonus}</p> : <div />}
                                    {item.max_dex_bonus ? <p>Max DEX Bonus: {item.max_dex_bonus}</p> : <div />}
                                    {item.penalty ? <p>Penalty: {item.penalty}</p> : <div />}
                                    {item.critical_modifier ? <p>Critical Mod: {item.critical_modifier}</p> : <div />}
                                    {item.range_increment ? <p>Range Increment: {item.range_increment}</p> : <div />}
                                </div>
                            </div>
                        ) : (
                            <div />
                        )}

                        {item.description && (
                            <div className="overflow-scroll max-h-40 mt-5 text-xs rounded-lg bg-card-top border-2 border-white">
                                <p className="p-1">{item.description}</p>
                            </div>
                        )}
                        {checkOnly ? (
                            <button
                                onClick={() => closeFunction(true)}
                                className="bg-green text-center w-full rounded-2xl border-white border-2 mt-4 uppercase p-2"
                            >
                                {i18n._(t`Start Craft`)}
                            </button>
                        ) : (
                            <div />
                        )}
                    </div>
                )}
            </div>
        </Modal>
    )
}
