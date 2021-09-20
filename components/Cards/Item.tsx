import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import { Item } from '../../hooks/useRarityLibrary'

function ItemCard({ item }: { item: Item }): JSX.Element {
    const { i18n } = useLingui()

    return (
        <div className="mx-auto w-56">
            <div className="grid grid-cols-1 rounded-2xl border-white border-2 bg-background-contrast divide-white divide-y-2">
                <div className="p-2 text-xs">
                    <p>
                        {i18n._(t`id`)}: {item.token_id}
                    </p>
                </div>
                <div className="p-2 text-xs"></div>
            </div>
        </div>
    )
}

export default ItemCard
