import { useLingui } from '@lingui/react'
import Loader from '../../Loader'
import { t } from '@lingui/macro'
import React, { useCallback, useEffect, useState } from 'react'
import NameCard from '../../Cards/Name'
import useRarityNames, { NameData } from '../../../hooks/useRarityNames'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { useGraphSummonerIDs } from '../../../services/graph/hooks'

export default function InventoryNames(): JSX.Element {
    const { i18n } = useLingui()

    const { account } = useActiveWeb3React()

    const [loading, setLoading] = useState(true)

    const [names, setNames] = useState<NameData[]>([])

    const { account_names } = useRarityNames()

    const fetch_names = useCallback(
        async (account) => {
            setNames(await account_names(account))
            setLoading(false)
        },
        [account_names]
    )

    useEffect(() => {
        fetch_names(account)
    }, [account, fetch_names])

    const ids = useGraphSummonerIDs(account)

    return (
        <>
            {loading ? (
                <div className="flex my-10 justify-center">
                    <Loader size={'20'} />
                </div>
            ) : names.length > 0 ? (
                <div className="md:p-14">
                    <div className="grid grid-cols-1 scrollbar-hide md:grid-cols-2 lg:grid-cols-4 mt-7 items-center gap-5">
                        {names.map((name) => {
                            return <NameCard key={name.id} name={name} summoners={ids} />
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex my-10 justify-center">
                    <div className="text-2xl uppercase">
                        <h1>{i18n._(t`no names`)}</h1>
                    </div>
                </div>
            )}
        </>
    )
}
