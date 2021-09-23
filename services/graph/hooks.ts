import useSWR, { SWRConfiguration } from 'swr'
import { getAnalytics } from './fetchers'

export function useAnalytics(swrConfig: SWRConfiguration = undefined) {
    const { data } = useSWR('analytics', () => getAnalytics(), swrConfig)
    return data
}
