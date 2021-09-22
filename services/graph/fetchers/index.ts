import { request } from 'graphql-request'
import { getSummoners } from '../queries'

export const getSummonersIDs = async (account: string): Promise<number[]> => {
    const data = await summoners(getSummoners, { owner: account.toLowerCase() })
    return data.summoners.map((s) => {
        return parseInt(s.id)
    })
}

export const summoners = async (query, variables = {}) =>
    request('https://api.rarity.game/subgraphs/name/rarity-adventure/rarity', query, variables)
