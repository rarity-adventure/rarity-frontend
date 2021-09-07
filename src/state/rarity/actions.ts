import { createAction } from '@reduxjs/toolkit'

export interface Metadata {
    summoners: number
    barbarians: number
    bards: number
    clerics: number
    druids: number
    fighters: number
    monks: number
    paladins: number
    rangers: number
    rogues: number
    sorcerers: number
    wizards: number
}

export const updateMetadata = createAction<Metadata>('rarity/updateMetadata')
