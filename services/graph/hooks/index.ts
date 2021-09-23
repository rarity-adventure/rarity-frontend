import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import useSWR, { SWRConfiguration } from 'swr'
import { getAnalyticsData, getSummonersIDs } from '../fetchers'

export function useSummonerIDs(swrConfig: SWRConfiguration = undefined) {
    const { chainId, account } = useActiveWeb3React()
    const { data } = useSWR(chainId && account ? 'summoners' : null, () => getSummonersIDs(account), swrConfig)
    return data
}

export function useGlobalAnalytics(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('analytics', () => getAnalyticsData(), swrConfig)
    return data
}
