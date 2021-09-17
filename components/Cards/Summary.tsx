import { useLingui } from '@lingui/react'
import React from 'react'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/classes'
import { t } from '@lingui/macro'

function SummonerSummaryCard({ summoner }: { summoner: any }): JSX.Element {
    const { i18n } = useLingui()

    return (
        <div className="mx-auto rounded-lg border-white border-2 w-56">
            <div>
                <img
                    className="p-5 w-32 mx-auto"
                    src={CLASSES_IMAGES[summoner.base._class.toString()]}
                    alt={CLASSES_NAMES[summoner.base._class.toString()]}
                />
            </div>
            <div className="text-white text-xs text-center">
                <h2>{summoner.base._name}</h2>
            </div>

            <div className="mt-4 w-3/4 mx-auto border-2 border-white text-xs rounded-3xl text-center">
                <div className="py-1 px-1  uppercase">
                    <span>{i18n._(CLASSES_NAMES[summoner.base._class.toString()])}</span>
                </div>
            </div>

            <div className="flex flex-row justify-between text-white my-2 mx-3 text-left uppercase">
                <p>ID</p>
                <span className="absolute ml-20">:</span>
                <p>{parseInt(summoner.id, 16).toString()}</p>
            </div>
            <div className="flex flex-row justify-between text-white my-2 mx-3 text-left uppercase">
                <p>Level</p>
                <span className="absolute ml-20">:</span>
                <p>{summoner.base._level.toString()}</p>
            </div>
            <div className="flex flex-row justify-between text-white my-2 mx-3 text-left uppercase">
                <p>XP</p>
                <span className="absolute ml-20">:</span>
                <p>{summoner.base._xp.toString()}</p>
            </div>
            <div className="flex flex-row justify-between text-white my-2 mx-3 text-left uppercase">
                <p>ADV</p>
                <span className="absolute ml-20">:</span>
            </div>
            <div className="flex flex-row justify-end text-white my-2 mx-3 text-left uppercase">
                <button className="uppercase text-xs">Cellar</button>
            </div>
            <div className="flex flex-row justify-between text-white my-2 mx-3 text-left uppercase">
                <p>CELLAR</p>
                <span className="absolute ml-20">:</span>
            </div>
            <div className="flex flex-row justify-end text-white my-2 mx-3 text-left uppercase">
                <button className="uppercase text-xs">Cellar</button>
            </div>
        </div>
    )
}

export default SummonerSummaryCard
