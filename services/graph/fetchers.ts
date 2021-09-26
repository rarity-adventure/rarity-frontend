import { request } from 'graphql-request'
import {
    getGlobalData,
    getMarketSummonerFeats,
    getMarketSummoners,
    getMarketSummonersCount,
    getMarketSummonerSkills,
    getSummoners,
} from '../../constants/queries'

export const market_graph = async (query, variables = {}) =>
    request('https://rarity-market.hasura.app/v1/graphql', query, variables, {
        'x-hasura-admin-secret': 't0F0OqHW1EAnS96r66aLOpylegp3ucPXLhNmH3wEvzwS7gQwPibZg8PQY6X3xJpt',
    })

export const rarity_graph = async (query, variables = {}) =>
    request('https://api.rarity.game/subgraphs/name/rarity-adventure/rarity', query, variables)

export const getStats = async () => {
    return await rarity_graph(getGlobalData, {})
}

export const getSummonersIDs = async (account: string) => {
    const ids = await rarity_graph(getSummoners, { owner: account.toLowerCase() })
    return ids.summoners.map((s) => {
        return parseInt(s.id)
    })
}

export const getListedSummoners = async (variables) => {
    const data = await market_graph(getMarketSummoners, variables)
    return data.summoners
}

export const getListedCount = async () => {
    const count = await market_graph(getMarketSummonersCount, {})
    return count.summoners_aggregate.aggregate.count
}

export const getListedSummonerSkills = async (summoner: number) => {
    const count = await market_graph(getMarketSummonerSkills, { summoner })
    return count.summoners_aggregate.aggregate.count
}

export const getListedSummonerFeats = async (summoner: number) => {
    const count = await market_graph(getMarketSummonerFeats, { summoner })
    return count.summoners_aggregate.aggregate.count
}
