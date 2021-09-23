import { request } from 'graphql-request'
import { getGlobalData, getSummoners } from '../../constants/queries'
import useSWR from 'swr'

export const graph = async (query, variables = {}) =>
    request('https://api.rarity.game/subgraphs/name/rarity-adventure/rarity', query, variables)

export const getStats = async () => {
    return await graph(getGlobalData, {})
}

export const getSummonersIDs = async (account: string) => {
    const ids = await graph(getSummoners, { owner: account.toLowerCase() })
    return ids.summoners.map((s) => {
        return parseInt(s.id)
    })
}
