import { useLingui } from '@lingui/react'
import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react'
import { t } from '@lingui/macro'
import { SKILLS } from '../../../constants/codex/skills'
import { useSummoners } from '../../../state/summoners/hooks'
import SummonerOwnRow from './OwnRow'
import { useListedSummonersForLister } from '../../../services/graph/hooks'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import useRarityLibrary, { SummonerFullData } from '../../../hooks/useRarityLibrary'
import { chunkArrayByNumber } from '../../../functions/chunkArray'
import { setLoading, updateSummoners } from '../../../state/summoners/actions'

export default function SummonersMarketOwn(): JSX.Element {
    const { account } = useActiveWeb3React()

    const { i18n } = useLingui()

    const summoners = useSummoners()

    const listed = useListedSummonersForLister(account.toLowerCase())

    const { summoners_full } = useRarityLibrary()

    const fetch_summoners_data = useCallback(
        async (ids: number[]) => {
            const chunks = chunkArrayByNumber(ids, 70)
            let fetchers = []
            for (let chunk of chunks) {
                fetchers.push(summoners_full(chunk))
            }
            const fetcherChunks = chunkArrayByNumber(fetchers, 10)
            let full_data = []
            for (let fChunk of fetcherChunks) {
                const chunk_response = await Promise.all(fChunk)
                full_data = full_data.concat(...chunk_response)
            }
            return [].concat(...full_data)
        },
        [summoners_full]
    )

    const [fullSummoners, setFullSummoners] = useState([])

    useEffect(() => {
        if (!listed || !summoners) return
        fetch_summoners_data(listed).then((d) => setFullSummoners([].concat(d).concat(summoners)))
    }, [listed, summoners])

    return (
        <>
            <div className="m-5 bg-item-background border-2 rounded-3xl overflow-y-scroll h-screen">
                <div>
                    <div
                        style={{ minWidth: '1300px' }}
                        className="sticky w-full top-0 z-20 bg-card-bottom bg-market-table-top font-bold flex flex-nowrap items-center px-2 py-5"
                    >
                        <div style={{ width: '10%' }} className="text-center" />
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`ID No.`)}</h2>
                        </div>
                        <div style={{ width: '15%' }} className="text-center">
                            <h2>{i18n._(t`CLASS`)}</h2>
                        </div>
                        <div style={{ width: '5%' }} className="text-center">
                            <h2>{i18n._(t`LEVEL`)}</h2>
                        </div>
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`XP`)}</h2>
                        </div>
                        <div style={{ width: '15%' }} className="text-center">
                            <h2>{i18n._(t`ATTRIBUTES`)}</h2>
                        </div>
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`GOLD`)}</h2>
                        </div>
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`MATERIAL`)}</h2>
                        </div>
                        <div style={{ width: '5%' }} className="text-center">
                            <h2>{i18n._(t`SKILLS`)}</h2>
                        </div>
                        <div style={{ width: '5%' }} className="text-center">
                            <h2>{i18n._(t`FEATS`)}</h2>
                        </div>
                        <div style={{ width: '5%' }} className="text-center">
                            <h2>{i18n._(t`ACTION`)}</h2>
                        </div>
                    </div>
                    {fullSummoners &&
                        listed &&
                        fullSummoners.map((s, i) => {
                            return (
                                <SummonerOwnRow row_i={i} summoner={s} key={i} listed={listed.indexOf(s.id) !== -1} />
                            )
                        })}
                </div>
            </div>
        </>
    )
}
