import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
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
import useRarityCrafting from '../../hooks/useRarityCrafting'
import ReactTooltip from 'react-tooltip'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'

function ItemCard({
    userItem,
    tokenURIFunc,
    tokenURIModal,
    itemTransferFunc,
    itemTransferModal,
    itemInfoFunc,
    itemInfoModal,
}: {
    userItem: ItemData
    tokenURIFunc
    tokenURIModal
    itemTransferFunc
    itemTransferModal
    itemInfoFunc
    itemInfoModal
}): JSX.Element {
    const { i18n } = useLingui()

    const [item, setItem] = useState<Item>()

    useEffect(() => {
        setItem(ITEMS[userItem.base_type][userItem.item_type])
    }, [userItem])

    const [uri, setUri] = useState<any>(undefined)

    const { tokenURI } = useRarityCrafting()

    const fetch_uri = useCallback(async () => {
        const uri = await tokenURI(userItem.token_id)
        if (uri) {
            const encoded = uri.split(',')
            const json = JSON.parse(atob(encoded[1]))
            setUri(json.image)
        }
    }, [tokenURI, setUri, userItem])

    useEffect(() => {
        fetch_uri()
    }, [userItem, fetch_uri])

    function openTokenURI() {
        tokenURIModal(true)
        tokenURIFunc({ item: userItem.token_id, uri: uri })
    }

    function openItemTransfer() {
        itemTransferModal(true)
        itemTransferFunc(userItem)
    }

    function openItemInfo() {
        itemInfoModal(true)
        itemInfoFunc({ item: item, itemType: userItem.base_type })
    }

    return (
        <div className="mx-auto w-64 md:w-64 lg:w-48 xl:w-64">
            {item && (
                <div className="grid grid-cols-1 rounded-2xl border-white border-2 bg-background-contrast divide-white divide-y-2">
                    <div className="flex flex-row justify-between p-2 text-xs">
                        <p className="uppercase">
                            {i18n._(t`id`)}: {userItem.token_id}
                        </p>
                        <QuestionMarkCircleIcon
                            data-tip
                            data-for={'item-info-' + userItem.token_id}
                            width={20}
                            className={'ml-1'}
                        />
                        <ReactTooltip id={'item-info-' + userItem.token_id} aria-haspopup="true" className="opaque">
                            {item.description && (
                                <>
                                    <h1 className="text-md uppercase">{i18n._(t`item description`)}</h1>
                                    <br />
                                    <h2 className="w-60">{item.description}</h2>
                                    <br />
                                </>
                            )}
                            <h1 className="text-md uppercase">{i18n._(t`item info`)}</h1>
                            <br />
                            <div style={{ fontFamily: 'Work Sans' }}>
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
                        </ReactTooltip>
                    </div>
                    <div className="px-3 text-white pb-5">
                        <div className="text-center">
                            <button onClick={() => openTokenURI()} className="border-white border-b-2 ">
                                <p className="mt-3 text-center">{item.name}</p>
                            </button>
                        </div>
                        <div className="text-center mt-5">
                            <button
                                className="uppercase bg-green p-2 border-2 border-white rounded-lg text-xs"
                                onClick={() => openItemInfo()}
                            >
                                {i18n._(t`info`)}
                            </button>
                        </div>
                        <div className="text-center mt-5">
                            <button
                                className="uppercase bg-red p-2 border-2 border-white rounded-lg text-xs"
                                onClick={() => openItemTransfer()}
                            >
                                {i18n._(t`transfer`)}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemCard
