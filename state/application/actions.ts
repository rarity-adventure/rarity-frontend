import { createAction } from '@reduxjs/toolkit'

export type PopupContent =
    | {
          txn: {
              hash: string
              success: boolean
              summary?: string
          }
      }
    | {
          listUpdate: {
              listUrl: string
              auto: boolean
          }
      }

export enum ApplicationModal {
    WALLET,
    SETTINGS,
    SELF_CLAIM,
    CLAIM_POPUP,
    DELEGATE,
    VOTE,
    NETWORK,
}

export const updateBlockNumber = createAction<{
    chainId: number
    blockNumber: number
}>('application/updateBlockNumber')
export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const addPopup = createAction<{
    key?: string
    removeAfterMs?: number | null
    content: PopupContent
}>('application/addPopup')
export const removePopup = createAction<{ key: string }>('application/removePopup')
