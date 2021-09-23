import { request } from 'graphql-request'
import { getGlobalData, getSummoners } from '../queries'

export const getSummonersIDs = async (account: string): Promise<number[]> => {
    const data = await graph(getSummoners, { owner: account.toLowerCase() })
    return data.summoners.map((s) => {
        return parseInt(s.id)
    })
}

export const getAnalyticsData = async (): Promise<{ globals: []; classes: []; levels: [] }> => {
    return await graph(getGlobalData, {})
}

export const graph = async (query, variables = {}) =>
    request('https://api.rarity.game/subgraphs/name/rarity-adventure/rarity', query, variables)
