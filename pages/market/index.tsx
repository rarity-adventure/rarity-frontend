import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import { useListedCount, useListedSummoners } from '../../services/graph/hooks'

export default function Market(): JSX.Element {
    const { i18n } = useLingui()

    const listed = useListedCount({ refreshInterval: 5_000 })

    const summoners = useListedSummoners({ refreshInterval: 5_000 })

    function buttons(): JSX.Element {
        return (
            <div className="flex flex-row gap-x-3">
                <button className="rounded-3xl uppercase border-2 border-market-button">
                    <h2 className="py-1 px-3">{i18n._(t`market`)}</h2>
                </button>
                <button className="rounded-3xl uppercase border-2 border-market-button">
                    <h2 className="py-1 px-3">{i18n._(t`my listing`)}</h2>
                </button>
            </div>
        )
    }
    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-2xl xl:text-3xl uppercase font-bold">
                            {i18n._(t`rarity summoners market`)}
                        </h1>
                    </div>
                    {buttons()}
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-md">{i18n._(t`List and Buy your summoners`)}</h3>
                </div>
                <div className="flex flex-row items-center justify-between mt-10">
                    <div>
                        <h1 className="text-xl font-bold">{i18n._(t`Filter With Tags:`)}</h1>
                    </div>
                    <div>
                        <span>
                            {i18n._(t`Summoners available:`)} {listed}
                        </span>
                    </div>
                </div>
                <div className="p-10">
                    <div className="bg-market-table-top w-full h-20 border-l-2 border-r-2 border-t-2 border-white rounded-t-3xl"></div>
                    <div className="bg-item-background w-full h-screen border-l-2 border-r-2 border-b-2 border-white rounded-b-3xl"></div>
                </div>
            </div>
        </div>
    )
}
