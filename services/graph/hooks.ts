import useSWR, { SWRConfiguration } from 'swr'
import { getListedCount, getListedSummoners, getStats, getSummonersIDs } from './fetchers'
import { getMarketSummoners } from '../../constants/queries'

export function useGraphStats(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('stats', () => getStats(), swrConfig)
    return data
}

export function useGraphSummonerIDs(account: string, swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR(account, () => getSummonersIDs(account), swrConfig)
    return data
}

export function useListedSummoners(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('listed', () => getListedSummoners(), swrConfig)
    return data
}

export function useListedCount(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('listed_count', () => getListedCount(), swrConfig)
    return data
}
