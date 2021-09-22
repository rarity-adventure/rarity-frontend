import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import useSWR, { SWRConfiguration } from 'swr'
import { getSummonersIDs } from '../fetchers'

export function useSummonerIDs(swrConfig: SWRConfiguration = undefined) {
    const { chainId, account } = useActiveWeb3React()
    const { data } = useSWR(chainId && account ? 'summoners' : null, () => getSummonersIDs(account), swrConfig)
    return data
}
