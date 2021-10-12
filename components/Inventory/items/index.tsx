import { useLingui } from '@lingui/react'
import Loader from '../../Loader'
import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useItems, useItemsLoading } from '../../../state/items/hooks'
import ItemCard from '../../Cards/Item'
import ItemModal from '../../Modal/modals/info/Item'
import TransferItemModal from '../../Modal/modals/transfers/TransferItem'
import TokenURIModal from '../../Modal/modals/info/TokenURIModal'
import { ItemData } from '../../../hooks/useRarityLibrary'
import { Item, ITEM_TYPE } from '../../../constants/codex/items'

export default function InventoryItems(): JSX.Element {
    const { i18n } = useLingui()

    const items = useItems()

    const loading = useItemsLoading()

    const [tokenUri, setTokenURI] = useState({ item: 0, uri: '' })
    const [tokenUriModal, setTokenUriModal] = useState(false)

    const [itemTransferModal, setItemTransferModal] = useState(false)

    const [itemInfoModal, setItemInfoModal] = useState(false)

    const [itemTransfer, setItemTransfer] = useState<ItemData | undefined>()

    const [itemInfo, setItemInfo] = useState<{ item: Item | undefined; itemType: ITEM_TYPE | undefined }>({
        item: undefined,
        itemType: undefined,
    })

    return (
        <>
            {loading ? (
                <div className="flex my-10 justify-center">
                    <Loader size={'20'} />
                </div>
            ) : items.length > 0 ? (
                <div className="md:p-14">
                    <TokenURIModal
                        open={tokenUriModal}
                        closeFunction={() => setTokenUriModal(false)}
                        id={tokenUri.item}
                        uri={tokenUri.uri}
                    />
                    <TransferItemModal
                        open={itemTransferModal}
                        closeFunction={() => setItemTransferModal(false)}
                        item={itemTransfer}
                    />
                    <ItemModal
                        open={itemInfoModal}
                        closeFunction={() => setItemInfoModal(false)}
                        item={itemInfo.item}
                        itemType={itemInfo.itemType}
                        checkOnly={true}
                    />
                    <div className="grid grid-cols-1 scrollbar-hide md:grid-cols-2 lg:grid-cols-4 mt-7 items-center gap-5">
                        {items.map((i) => {
                            return (
                                <ItemCard
                                    key={i.token_id}
                                    userItem={i}
                                    tokenURIFunc={setTokenURI}
                                    tokenURIModal={setTokenUriModal}
                                    itemTransferFunc={setItemTransfer}
                                    itemTransferModal={setItemTransferModal}
                                    itemInfoFunc={setItemInfo}
                                    itemInfoModal={setItemInfoModal}
                                />
                            )
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex my-10 justify-center">
                    <div className="text-2xl uppercase">
                        <h1>{i18n._(t`no items`)}</h1>
                    </div>
                </div>
            )}
        </>
    )
}
