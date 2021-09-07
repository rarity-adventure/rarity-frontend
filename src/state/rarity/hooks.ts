import { useSelector } from 'react-redux'
import { AppState } from '../index'
import { Metadata } from './actions'

export function useMetadata(): Metadata {
    return useSelector((state: AppState) => state.rarity.metadata)
}
