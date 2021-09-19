import ModalHeader from '../ModalHeader'
import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import { utils } from 'ethers'
import Modal from '../index'
import { Item } from '../../../constants/codex/items'

interface DonateModalProps {
    open: boolean
    closeFunction: (craft: boolean) => void
    item: Item
}

export default function ItemModal({ open, closeFunction, item }: DonateModalProps): JSX.Element {
    const { i18n } = useLingui()

    return (
        <Modal isOpen={open} onDismiss={() => closeFunction(false)}>
            <div className="bg-card-bottom rounded-lg border-2 border-white">
                <ModalHeader title={i18n._(t`Equipment Info`)} onClose={() => closeFunction(false)} />
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 py-2 px-2 gap-2 ">
                                    <p>Weight: {item.weight}</p>
                                    {item.proficiency && <p>Proficiency: {item.proficiency}</p>}
                                    {item.spell_failure && <p>Spell Failure: {item.spell_failure}</p>}
                                    {item.damage_type && <p>Damage Type: {item.damage_type}</p>}
                                    {item.critical && <p>Critical: {item.critical}</p>}
                                    {item.damage && <p>Damage: {item.damage}</p>}
                                    {item.encumbrance && <p>Encumbrance: {item.encumbrance}</p>}
                                    {item.armor_bonus && <p>Armor Bonus: {item.armor_bonus}</p>}
                                    {item.max_dex_bonus && <p>Max DEX Bonus: {item.max_dex_bonus}</p>}
                                    {item.penalty && <p>Penalty: {item.penalty}</p>}
                                    <p>Critical Mod: {item.critical_modifier}</p>
                                    <p>Range Increment: {item.range_increment}</p>
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
                        <button
                            onClick={() => closeFunction(true)}
                            className="bg-green text-center w-full rounded-2xl border-white border-2 mt-4 uppercase p-2"
                        >
                            Confirm Craft
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    )
}
