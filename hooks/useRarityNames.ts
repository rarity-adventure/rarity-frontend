import { useCallback } from 'react'
import { useRarityNamesContract } from './useContract'

export interface NameData {
    id: number
    name: string
    assigned: number
}

interface NamesInterface {
    validate_name: (name: string) => Promise<boolean>
    is_name_claimed: (name: string) => Promise<boolean>
    claim: (name: string, summoner: number) => Promise<void>
    account_names: (account: string) => Promise<NameData[]>
}

export default function useRarityNames(): NamesInterface {
    const names = useRarityNamesContract()

    const validate_name = useCallback(
        async (_name: string): Promise<boolean> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const valid = await names?.validate_name(_name)
                    resolve(valid)
                } catch (e) {
                    reject(e)
                }
            })
        },
        [names]
    )

    const is_name_claimed = useCallback(
        async (_name: string): Promise<boolean> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const claimed = await names?.is_name_claimed(_name)
                    resolve(claimed)
                } catch (e) {
                    reject(e)
                }
            })
        },
        [names]
    )

    const claim = useCallback(
        async (_name: string, summoner: number): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const tx = await names?.claim(_name, summoner)
                    await tx.wait()
                    resolve()
                } catch (e) {
                    reject(e)
                }
            })
        },
        [names]
    )

    const account_names = useCallback(
        async (account: string): Promise<NameData[]> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const balance = await names?.balanceOf(account)
                    const token_ids_promises = []
                    for (let i = 0; i < balance; i++) {
                        token_ids_promises.push(names?.tokenOfOwnerByIndex(account, i))
                    }
                    const tokens = await Promise.all(token_ids_promises)
                    const names_promises = tokens.map((id) => {
                        return names?.names(id)
                    })
                    const names_data: string[] = await Promise.all(names_promises)
                    const assigned_promises = tokens.map((id) => {
                        return names?.name_id_to_summoner(id)
                    })
                    const assigned_data = await Promise.all(assigned_promises)
                    const merge = tokens.map((id, i) => {
                        return {
                            id: parseInt(id.toString()),
                            name: names_data[i],
                            assigned: parseInt(assigned_data[i].toString()),
                        }
                    })
                    resolve(merge)
                } catch (e) {
                    reject(e)
                }
            })
        },
        [names]
    )

    return { validate_name, is_name_claimed, claim, account_names }
}
