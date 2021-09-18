import { t } from '@lingui/macro'
import React from 'react'
import { useLingui } from '@lingui/react'
import { SummonerFullData } from '../../hooks/useRarityLibrary'

function SummonerCraftCard({ summoner }: { summoner: SummonerFullData }): JSX.Element {
    const { i18n } = useLingui()

    return (
        <div className="max-w-screen-md mx-auto">
            <div className="flex flex-row w-full items-center">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-2 w-full">
                    <div className="bg-card-top col-span-3 md:p-2 p-1 bg-background-cards border-white border-2 rounded-t-2xl md:rounded-tl-2xl md:rounded-tr-none text-left">
                        <span className="ml-1.5 uppercase">
                            {i18n._(t`ID`)} {summoner.id}
                        </span>
                    </div>
                    <div className="w-full mt-3 md:mt-0 md:p-2 p-1 bg-card-button col-span-2 bg-background-cards border-white border-2 md:rounded-tr-2xl text-center">
                        <span className="uppercase">{i18n._(t`crafting`)}</span>
                    </div>
                </div>
            </div>
            <div className="border-white border-2 rounded-b-2xl my-3 bg-background-cards w-full bg-card-content">
                <div className="flex flex-row">
                    <div className="ml-1.5 md:ml-3 text-center mt-2">
                        <button
                            style={{ fontSize: '0.8rem' }}
                            className="py-1 border-2 px-4 border-white rounded-l-lg uppercase"
                        >
                            {i18n._(t`goods`)}
                        </button>
                    </div>
                    <div className="text-center -ml-1 mt-2">
                        <button
                            style={{ fontSize: '0.8rem' }}
                            className="py-1 border-t-2 border-b-2 px-4 border-white uppercase"
                        >
                            {i18n._(t`weapons`)}
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <button
                            style={{ fontSize: '0.8rem' }}
                            className="py-1 border-2 px-4 border-white rounded-r-lg uppercase"
                        >
                            armors
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 w-full px-2 md:mt-1 divide-white divide-y-2 overflow-scroll overflow-hidden h-60"></div>
            </div>
        </div>
    )
}

export default SummonerCraftCard
