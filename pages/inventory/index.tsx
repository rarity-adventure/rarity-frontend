import { useLingui } from '@lingui/react'
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { useSummoners } from '../../state/summoners/hooks'
import { calcXPForNextLevel } from '../../functions/calcXPForNextLevel'
import SummonerSummaryCard from '../../components/Cards/Summary'
import Loader from '../../components/Loader'
import AdventureModal from '../../components/Modal/modals/Adventure'
import { Item, SummonerFullData } from '../../hooks/useRarityLibrary'
import LevelModal from '../../components/Modal/modals/Level'
import DaycareMultiModal from '../../components/Modal/modals/DaycareMulti'
import GoldModal from '../../components/Modal/modals/Gold'
import DungeonModal from '../../components/Modal/modals/Dungeon'
import Filter from '../../components/Filter'
import { classNames } from '../../functions/classNames'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useItems } from '../../state/items/hooks'
import ItemCard from '../../components/Cards/Item'

export default function Inventory(): JSX.Element {
    const { i18n } = useLingui()

    const { library, account } = useActiveWeb3React()

    const itms = useItems()

    const [items, setItems] = useState<Item[]>(itms)

    useEffect(() => {
        setItems(itms)
    }, [itms])

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10 uppercase">
                {items.length > 0 ? (
                    <>
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <h1 className="text-2xl xl:text-3xl">{i18n._(t`inventory`)}</h1>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 items-center gap-2 xl:gap-5">
                            {items.map((i) => {
                                return <ItemCard key={i.token_id} item={i} />
                            })}
                        </div>
                    </>
                ) : (
                    <div className="flex my-10 justify-center">
                        <Loader size={'50px'} />
                    </div>
                )}
            </div>
        </div>
    )
}
