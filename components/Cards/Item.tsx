import { t } from '@lingui/macro'
import React, { useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import { ItemData } from '../../hooks/useRarityLibrary'
import {
    ARMOR_PROFICIENCY,
    Item,
    ITEM_TYPE,
    ITEMS,
    WEAPON_DAMAGE_TYPE,
    WEAPON_ENCUMBRANCE,
    WEAPON_PROFICIENCY,
} from '../../constants/codex/items'
import TokenURIModal from '../Modal/modals/TokenURIModal'
import TransferItemModal from '../Modal/modals/TransferItem'

function ItemCard({ userItem }: { userItem: ItemData }): JSX.Element {
    const { i18n } = useLingui()

    const [item, setItem] = useState<Item>()

    useEffect(() => {
        setItem(ITEMS[userItem.base_type][userItem.item_type])
    }, [userItem])

    const [uriModal, setUriModal] = useState(false)

    function close() {
        setUriModal(false)
    }

    const [transferModal, setTransferModal] = useState(false)

    function closeTransfer() {
        setTransferModal(false)
    }

    return (
        <div className="mx-auto w-64 md:w-64 lg:w-48 xl:w-64">
            <TokenURIModal open={uriModal} closeFunction={close} id={userItem.token_id} />
            <TransferItemModal open={transferModal} closeFunction={closeTransfer} item={userItem} />
            <div className="grid grid-cols-1 rounded-2xl border-white border-2 bg-background-contrast divide-white divide-y-2">
                <div className="p-2 text-xs">
                    <p className="uppercase">
                        {i18n._(t`id`)}: {userItem.token_id}
                    </p>
                </div>
                {item && (
                    <div className="px-3 text-white pb-5 h-96">
                        <div className="text-center">
                            <button onClick={() => setUriModal(true)} className="border-white border-b-2 ">
                                <p className="mt-3 text-center">{item.name}</p>
                            </button>
                        </div>
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
                            <div className="overflow-scroll h-32 mt-5 text-xs rounded-lg bg-card-top border-2 border-white">
                                <div className="py-2 px-2">
                                    <p>Weight: {item.weight}</p>
                                    {item.proficiency ? (
                                        userItem.base_type === ITEM_TYPE.WEAPON ? (
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
                                    {item.damage ? <p>Damage: 1d{item.damage}</p> : <div />}
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
                    </div>
                )}
                <div className="p-2 text-xs justify-center text-center">
                    <button
                        className="uppercase bg-red p-2 border-2 border-white rounded-lg"
                        onClick={() => setTransferModal(true)}
                    >
                        {i18n._(t`transfer`)}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
