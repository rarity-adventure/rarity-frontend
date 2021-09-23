import { request } from 'graphql-request'
import { getGlobalData } from '../../constants/queries'

export const graph = async (query, variables = {}) =>
    request('https://api.rarity.game/subgraphs/name/rarity-adventure/rarity', query, variables)

export const getStats = async () => {
    return await graph(getGlobalData, {})
}
