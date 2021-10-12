import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useItems, useItemsLoading } from '../../state/items/hooks'
import ItemCard from '../../components/Cards/Item'
import { useSummoners } from '../../state/summoners/hooks'
import Loader from '../../components/Loader'
import TransferBulkModal from '../../components/Modal/modals/transfers/TransferBulk'
import { GoldImage, MaterialImage } from '../../constants/coins'
import TokenURIModal from '../../components/Modal/modals/info/TokenURIModal'
import TransferItemModal from '../../components/Modal/modals/transfers/TransferItem'
import ItemModal from '../../components/Modal/modals/info/Item'
import { ItemData } from '../../hooks/useRarityLibrary'
import { Item, ITEM_TYPE } from '../../constants/codex/items'

export default function Inventory(): JSX.Element {
    const { i18n } = useLingui()

    const items = useItems()

    const loading = useItemsLoading()

    const summoners = useSummoners()

    const [modal, setModal] = useState(false)

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
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10">
                {loading ? (
                    <div className="flex my-10 justify-center">
                        <Loader size={'20'} />
                    </div>
                ) : items.length > 0 ? (
                    <>
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <h1 className="text-2xl xl:text-3xl uppercase font-bold">{i18n._(t`inventory`)}</h1>
                            </div>
                            <div className="flex flex-row justify-center uppercase">
                                <TransferBulkModal
                                    open={modal}
                                    closeFunction={() => setModal(false)}
                                    summoners={summoners}
                                />
                                <button onClick={() => setModal(true)} className="uppercase p-2">
                                    {i18n._(t`bulk transfer`)}
                                </button>
                            </div>
                            <div className="hidden sm:inline-flex">
                                {summoners.length > 0 && (
                                    <div className={'flex flex-row gap-4'}>
                                        <div className="flex flex-row items-center justify-between w-48 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                            <div className="py-1 w-2/3 text-center">
                                                <p>
                                                    {summoners
                                                        .map((s) => {
                                                            return s.materials.balance
                                                        })
                                                        .reduce((a, b) => a + b)}
                                                </p>
                                            </div>
                                            <MaterialImage />
                                        </div>
                                        <div className="flex flex-row items-center justify-between w-48 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                            <div className="py-1 w-2/3 text-center">
                                                <p>
                                                    {summoners
                                                        .map((s) => {
                                                            return s.gold.balance
                                                        })
                                                        .reduce((a, b) => a + b)}
                                                </p>
                                            </div>
                                            <GoldImage />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-row mt-4 justify-center sm:hidden">
                            {summoners.length > 0 && (
                                <div className={'flex flex-row gap-4'}>
                                    <div className="flex flex-row items-center justify-between w-48 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                        <div className="py-1 w-2/3 text-center">
                                            <p>
                                                {summoners
                                                    .map((s) => {
                                                        return s.materials.balance
                                                    })
                                                    .reduce((a, b) => a + b)}
                                            </p>
                                        </div>
                                        <MaterialImage />
                                    </div>
                                    <div className="flex flex-row items-center justify-between w-48 px-2 bg-background-contrast border-white border-2 rounded-3xl">
                                        <div className="py-1 w-2/3 text-center">
                                            <p>
                                                {summoners
                                                    .map((s) => {
                                                        return s.gold.balance
                                                    })
                                                    .reduce((a, b) => a + b)}
                                            </p>
                                        </div>
                                        <GoldImage />
                                    </div>
                                </div>
                            )}
                        </div>
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
                    </>
                ) : (
                    <div className="flex my-10 justify-center">
                        <div className="text-2xl uppercase">
                            <h1>{i18n._(t`no items`)}</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
