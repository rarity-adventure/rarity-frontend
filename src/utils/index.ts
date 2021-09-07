import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { AddressZero } from '@ethersproject/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { ethers } from 'ethers'
import { getAddress } from '@ethersproject/address'
import { ChainId } from '../constants'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string): string | false {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

// Multichain Explorer
const builders = {
    fantom: (chainName: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
        const prefix = 'https://ftmscan.com'
        switch (type) {
            case 'transaction':
                return `${prefix}/tx/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },
}

interface ChainObject {
    [chainId: number]: {
        chainName: string
        builder: (chainName: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => string
    }
}

const chains: ChainObject = {
    [ChainId.MAINNET]: {
        chainName: '',
        builder: builders.fantom,
    },
}

export function getExplorerLink(
    chainId: ChainId,
    data: string,
    type: 'transaction' | 'token' | 'address' | 'block'
): string {
    const chain = chains[chainId]
    return chain.builder(chain.chainName, data, type)
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
    const parsed = isAddress(address)
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
    return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(
    address: string,
    ABI: ethers.ContractInterface,
    library: Web3Provider,
    account?: string
): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}
