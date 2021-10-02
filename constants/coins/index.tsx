import Image from 'next/image'
import React from 'react'

export function GoldImage(): JSX.Element {
    return <Image src="/img/coins/gold.png" width={50} height={40} alt="Rarity Gold" />
}

export function MaterialImage(): JSX.Element {
    return <Image src="/img/coins/material.png" width={40} height={40} alt="Rarity Crafting Material" />
}

export interface CoinData {
    name: string
    image: JSX.Element
    unit: 'ether' | 'wei'
}

export const GAME_COINS: { [k: string]: CoinData } = {
    gold: {
        name: 'GOLD',
        image: <GoldImage />,
        unit: 'ether',
    },
    materials: {
        name: 'MATERIALS',
        image: <MaterialImage />,
        unit: 'wei',
    },
}
