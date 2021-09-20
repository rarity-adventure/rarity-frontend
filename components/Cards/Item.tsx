import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import { Item } from '../../hooks/useRarityLibrary'
import { ITEM_TYPE, ITEMS } from '../../constants/codex/items'

function ItemCard({ item }: { item: Item }): JSX.Element {
    const { i18n } = useLingui()

    function itemCategory(): string {
       switch (item.base_type) {
           case ITEM_TYPE.WEAPON:
               return "weapon"
           case ITEM_TYPE.ARMOR:
                return "armor"
           case ITEM_TYPE.GOOD:
                return "good"
       }
    }

    return (
        <div className="mx-auto w-56">
            <div className="grid grid-cols-1 rounded-2xl border-white border-2 bg-background-contrast divide-white divide-y-2">
                <div className="p-2 text-xs">
                    <p>
                        {i18n._(t`id`)}: {item.token_id}
                    </p>
                </div>
                <div className="p-2 text-xs text-center py-2">
                    <p>{ itemCategory() }</p>
                    <p>{ ITEMS[item.base_type][item.item_type].name }</p>
                    <p className="my-2">Crafted</p>
                        <p>{ new Date(item.crafted * 1000).toDateString()}</p>
                    <p className="my-2">Crafter</p>
                    <p>{ item.crafter}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
