import { useLingui } from '@lingui/react'
import React, { useCallback, useEffect, useState } from 'react'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useRarityLibrary, { SummonerFullData } from '../../hooks/useRarityLibrary'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useQuery } from '@apollo/client'
import { SUMMONERS } from '../../apollo'
import { chunkArrayByNumber } from '../../functions/array'
import { t } from '@lingui/macro'

export default function Summoners(): JSX.Element {
    const { i18n } = useLingui()

    const { library, chainId, account } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const { data, loading, error } = useQuery(SUMMONERS, {
        variables: { owner: account ? account.toString().toLowerCase() : '' },
    })

    const [summoners, setSummoners] = useState([])

    useEffect(() => {
        if (!library || !chainId || !windowVisible || !account || loading || error) return
        const summoners = data.summoners.map((s) => {
            return s.id
        })
        setSummoners(summoners)
    }, [library, chainId, windowVisible, account, loading, error])

    const { summoners_full } = useRarityLibrary()

    const [summonersFull, setSummonersFull] = useState<SummonerFullData[]>([])

    const fetch_summoners_data = useCallback(async () => {
        // If the user has lest than 50 summoners fetch the data and return
        if (summoners.length <= 50) {
            const full_data = await summoners_full(summoners)
            setSummonersFull(full_data)
            return
        }

        const chunks = chunkArrayByNumber(summoners, 50)
        let full_data = []

        for (let chunk of chunks) {
            const chunk_data = await summoners_full(chunk)
            full_data = full_data.concat(chunk_data)
        }

        setSummonersFull(full_data)
        return
    }, [summoners_full, summoners])

    useEffect(() => {
        if (!library || !chainId || !windowVisible || !account) return
        fetch_summoners_data()
    }, [summoners, fetch_summoners_data, windowVisible, library, chainId, account])

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10 uppercase">
                <div className="flex flex-row">
                    <h1 className="text-3xl">{i18n._(t`summoners`)}</h1>
                </div>
            </div>
        </div>
    )
}
