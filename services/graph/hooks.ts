import useSWR, { SWRConfiguration } from 'swr'
import { getAnalytics } from './fetchers'

export function useGraphAnalytics(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('analytics', () => getAnalytics(), swrConfig)
    return data
}
