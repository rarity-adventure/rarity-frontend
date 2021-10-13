import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useSummoners } from '../../state/summoners/hooks'
import TransferBulkModal from '../../components/Modal/modals/transfers/TransferBulk'
import { GoldImage, MaterialImage } from '../../constants/coins'
import { classNames } from '../../functions/classNames'
import InventoryItems from '../../components/Inventory/items'
import InventoryNames from '../../components/Inventory/names'

enum InventoryView {
    Items,
    Names,
}

export default function Inventory(): JSX.Element {
    const { i18n } = useLingui()

    const [view, setView] = useState(InventoryView.Items)

    const summoners = useSummoners()

    const [modal, setModal] = useState(false)

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10">
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
                    <div className="flex flex-row justify-center sm:justify-start mt-4">
                        <button
                            onClick={() => setView(InventoryView.Items)}
                            className={classNames(
                                'bg-card-content uppercase border-2 p-1 rounded-l-2xl w-32',
                                view === InventoryView.Items ? 'opacity-50' : ''
                            )}
                        >
                            {i18n._(t`Items`)}
                        </button>
                        <button
                            onClick={() => setView(InventoryView.Names)}
                            className={classNames(
                                'bg-card-content uppercase border-2 p-1 w-32 rounded-r-2xl',
                                view === InventoryView.Names ? 'opacity-50' : ''
                            )}
                        >
                            {i18n._(t`Names`)}
                        </button>
                    </div>
                    <div>
                        {view === InventoryView.Items && <InventoryItems />}
                        {view === InventoryView.Names && <InventoryNames />}
                    </div>
                </>
            </div>
        </div>
    )
}
