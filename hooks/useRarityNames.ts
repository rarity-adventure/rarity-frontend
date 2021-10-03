import { useCallback } from 'react'
import { useRarityNamesContract } from './useContract'

interface NamesInterface {
    validate_name: (name: string) => Promise<boolean>
    is_name_claimed: (name: string) => Promise<boolean>
    claim: (name: string, summoner: string) => Promise<void>
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
        async (_name: string, summoner): Promise<void> => {
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

    return { validate_name, is_name_claimed, claim }
}
