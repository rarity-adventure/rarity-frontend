import useSWR, { SWRConfiguration } from 'swr'
import {
    getListedCount,
    getListedSummonerFeats,
    getListedSummoners,
    getListedSummonerSkills,
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

export function useListedSummoners(variables, swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('listed_' + variables.offset, () => getListedSummoners(variables), swrConfig)
    return data
}

export function useListedCount(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('listed_count', () => getListedCount(), swrConfig)
    return data
}

export function useListedSummonerSkills(summoner: number, swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR(summoner.toString() + '_skills', () => getListedSummonerSkills(summoner), swrConfig)
    return data
}

export function useListedSummonerFeats(summoner: number, swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR(summoner.toString() + '_feats', () => getListedSummonerFeats(summoner), swrConfig)
    return data
}
