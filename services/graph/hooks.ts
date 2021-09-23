import useSWR, { SWRConfiguration } from 'swr'
import { getStats } from './fetchers'

export function useGraphStats(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('stats', () => getStats(), swrConfig)
    return data
}
