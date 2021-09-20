import { useLingui } from '@lingui/react'
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { useSummoners } from '../../state/summoners/hooks'
import { calcXPForNextLevel } from '../../functions/calcXPForNextLevel'
import SummonerSummaryCard from '../../components/Cards/Summary'
import Loader from '../../components/Loader'
import AdventureModal from '../../components/Modal/modals/Adventure'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import LevelModal from '../../components/Modal/modals/Level'
import DaycareMultiModal from '../../components/Modal/modals/DaycareMulti'
import GoldModal from '../../components/Modal/modals/Gold'
import DungeonModal from '../../components/Modal/modals/Dungeon'
import Filter from '../../components/Filter'
import { classNames } from '../../functions/classNames'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'

enum Modal {
    ADVENTURE = 1,
    LEVELUP,
    GOLD,
    DUNGEON,
    DAYCARE,
}
export default function Inventory(): JSX.Element {
    const { i18n } = useLingui()

    const { library, account } = useActiveWeb3React()

    const s = useSummoners()

    const [summoners, setSummoners] = useState<SummonerFullData[]>(s)

    const [adventure, setAdventure] = useState<SummonerFullData[]>([])
    const [level, setLevel] = useState<SummonerFullData[]>([])
    const [gold, setGold] = useState<SummonerFullData[]>([])
    const [dungeon, setDungeon] = useState<SummonerFullData[]>([])

    useEffect(() => {
        setSummoners(s)
        setAdventure(s.filter((s) => s.base._log * 1000 < Date.now()))
        setLevel(s.filter((s) => s.base._xp >= calcXPForNextLevel(s.base._level)))
        setGold(s.filter((s) => s.gold.claimable > 0))
        setDungeon(s.filter((s) => s.materials.log * 1000 < Date.now() && s.materials.scout !== 0))
    }, [s])

    const [modal, setModal] = useState(0)

    function closeModal() {
        setModal(0)
    }

    const [time, setCurrentTime] = useState(Date.now())

    useEffect(() => {
        if (!account || !library) return
        const timer = setInterval(() => {
            setCurrentTime(Date.now())
        }, 1000)

        return () => clearInterval(timer)
    }, [account, library])

    const [parsedSummoners, setParsedSummoners] = useState<SummonerFullData[]>(summoners)

    return (
        <div className="w-full z-25">
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10 uppercase">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-2xl xl:text-3xl">{i18n._(t`Inventory`)}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
