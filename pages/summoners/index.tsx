import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useSummoners } from '../../state/summoners/hooks'
import { calcXPForNextLevel } from '../../functions/calcXPForNextLevel'
import Filter from '../../components/Filter'
import SummonerSummaryCard from '../../components/Cards/Summary'

export default function Summoners(): JSX.Element {
    const { i18n } = useLingui()

    const summoners = useSummoners()

    const adventure = summoners.filter((s) => parseInt(s.base._log.toString()) > Date.now())
    const level = summoners.filter(
        (s) => parseInt(s.base._xp.toString()) >= calcXPForNextLevel(parseInt(s.base._level.toString()))
    )
    const claim = summoners.filter((s) => parseInt(s.gold.claimable.toString()) > 0)
    const dungeon = summoners.filter(
        (s) => parseInt(s.materials.log.toString()) > Date.now() && parseInt(s.materials.scout.toString()) > 0
    )

    const [parsedSummoners, setParsedSummoners] = useState(summoners)

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10 uppercase">
                <div className="flex flex-row items-center justify-start">
                    <div>
                        <h1 className="text-2xl xl:text-3xl">{i18n._(t`summoners`)}</h1>
                    </div>
                    <div className="ml-10 hidden md:block uppercase">
                        <h1 className="text-lg">{i18n._(t`one-click`)}</h1>
                        <div className="text-xs">
                            <button className="mx-1 uppercase">{i18n._(t`adventure`)}</button>
                            <button className="mx-1 uppercase">{i18n._(t`level-up`)}</button>
                            <button className="mx-1 uppercase">{i18n._(t`claim gold`)}</button>
                            <button className="mx-1 uppercase">{i18n._(t`dungeon`)}</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end">
                    <div className="w-48">
                        <Filter summoners={summoners} filteredSummoners={setParsedSummoners} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 items-center gap-2 xl:gap-5">
                    {parsedSummoners.map((s) => {
                        return <SummonerSummaryCard key={s.id} summoner={s} />
                    })}
                </div>
            </div>
        </div>
    )
}
