import { BigNumber } from '@ethersproject/bignumber'
import { getAddress } from '@ethersproject/address'

export function isZero(hexNumberString: string): boolean {
    return /^0x0*$/.test(hexNumberString)
}

export const isEmptyValue = (text: string) =>
    BigNumber.isBigNumber(text)
        ? BigNumber.from(text).isZero()
        : text === '' || text.replace(/0/g, '').replace(/\./, '') === ''

export function isAddress(value: any): string | false {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}
