import { request } from 'graphql-request'
import { getGlobalData, getMarketSummonersCount, getMarketSummonersForLister, getSummoners } from './queries'
import { pager } from './utils'

export const market_graph = async (query, variables = {}) =>
    request('https://market-api.rarity.game/v1/graphql', query, variables)

export const rarity_graph = async (query, variables = {}) =>
    pager('https://api.rarity.game/subgraphs/name/rarity-adventure/rarity', query, variables)

export const getStats = async () => {
    return await rarity_graph(getGlobalData, {})
}

export const getSummonersIDs = async (account: string) => {
    const ids = await rarity_graph(getSummoners, { owner: account.toLowerCase() })
    return ids.summoners.map((s) => {
        return parseInt(s.id)
    })
}

export const getListedSummoners = async (offset, query) => {
    const data = await market_graph(query, { offset })
    return data.summoners
}

export const getListedCount = async () => {
    const count = await market_graph(getMarketSummonersCount, {})
    return count.summoners_aggregate.aggregate.count
}

export const getListedSummonersForLister = async (lister) => {
    const data = await market_graph(getMarketSummonersForLister, { lister })
    return data.summoners.map((s) => { return {id: s.summoner, price: s.price_exact} })
}
