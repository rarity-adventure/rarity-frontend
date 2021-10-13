import useSWR, { SWRConfiguration } from 'swr'
import {
    getListedCount,
    getListedSummoners,
    getListedSummonersForLister,
    getMarketBiggestSale,
    getMarketGlobalsStatistics,
    getMarketLatestSale,
    getMarketStatistics,
    getStats,
    getSummonersIDs,
} from './fetchers'

export function useGraphStats(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('stats', () => getStats(), swrConfig)
    return data
}

export function useGraphSummonerIDs(account: string, swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR(account, () => getSummonersIDs(account), swrConfig)
    return data
}

export function useListedSummoners(offset, query, swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR(
        'listed_' + offset + JSON.stringify(query),
        () => getListedSummoners(offset, query),
        swrConfig
    )
    return data
}

export function useListedCount(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('listed_count', () => getListedCount(), swrConfig)
    return data
}

export function useListedSummonersForLister(lister, swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('listed_' + lister, () => getListedSummonersForLister(lister), swrConfig)
    return data
}

export function useMarketStats(offset, swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('market_stats_' + offset, () => getMarketStatistics(offset), swrConfig)
    return data
}

export function useMarketGlobalStats(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('market_globals', () => getMarketGlobalsStatistics(), swrConfig)
    return data
}

export function useMarketLatestSale(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('market_latest', () => getMarketLatestSale(), swrConfig)
    return data
}

export function useMarketBiggestSale(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('market_biggest', () => getMarketBiggestSale(), swrConfig)
    return data
}
