import { useLingui } from '@lingui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { useSummoners } from '../../state/summoners/hooks'
import { calcXPForNextLevel } from '../../functions/calcXPForNextLevel'
import SummonerSummaryCard from '../../components/Cards/Summary'
import AdventureModal from '../../components/Modal/modals/Adventure'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import LevelModal from '../../components/Modal/modals/Level'
import DaycareMultiModal from '../../components/Modal/modals/DaycareMulti'
import GoldModal from '../../components/Modal/modals/Gold'
import DungeonModal from '../../components/Modal/modals/Dungeon'
import Filter from '../../components/Filter'
import { classNames } from '../../functions/classNames'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useRarityStarterPack from '../../hooks/useRarityStarterPack'

enum Modal {
    ADVENTURE = 1,
    LEVELUP,
    GOLD,
    DUNGEON,
    DAYCARE,
}
export default function Summoners(): JSX.Element {
    const { i18n } = useLingui()

    const { library, account } = useActiveWeb3React()

    const s = useSummoners()

    const [summoners, setSummoners] = useState<SummonerFullData[]>(s)

    const [adventure, setAdventure] = useState<SummonerFullData[]>([])
    const [level, setLevel] = useState<SummonerFullData[]>([])
    const [gold, setGold] = useState<SummonerFullData[]>([])
    const [dungeon, setDungeon] = useState<SummonerFullData[]>([])
    const [sellable, setSellable] = useState<number[]>([])

    const { filter_needed_summoners } = useRarityStarterPack()

    const fetch_sellable = useCallback(async () => {
        const sellable = await filter_needed_summoners(
            s.map((s) => {
                return s.id
            })
        )
        setSellable(
            sellable.map((id) => {
                return parseInt(id.toString())
            })
        )
    }, [filter_needed_summoners, sellable, s])

    const [modal, setModal] = useState(0)

    function closeModal() {
        setModal(0)
    }

    useEffect(() => {
        if (modal) return
        setSummoners(s)
        setAdventure(s.filter((s) => s.base._log * 1000 < Date.now()))
        setLevel(s.filter((s) => s.base._xp >= calcXPForNextLevel(s.base._level)))
        setGold(s.filter((s) => s.gold.claimable > 0))
        setDungeon(s.filter((s) => s.materials.log * 1000 < Date.now() && s.materials.scout !== 0))
        fetch_sellable()
    }, [s, modal])

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
            <AdventureModal open={modal === Modal.ADVENTURE} closeFunction={closeModal} summoners={adventure} />
            <LevelModal open={modal === Modal.LEVELUP} closeFunction={closeModal} summoners={level} />
            <GoldModal open={modal === Modal.GOLD} closeFunction={closeModal} summoners={gold} />
            <DungeonModal open={modal === Modal.DUNGEON} closeFunction={closeModal} summoners={dungeon} />
            <DaycareMultiModal open={modal === Modal.DAYCARE} closeFunction={closeModal} summoners={summoners} />
            <div className="md:border-white md:border-4 p-4 md:m-10 z-10 uppercase">
                {summoners.length > 0 ? (
                    <>
                        <div className="flex flex-row items-center justify-between">
                            <div>
                                <h1 className="text-2xl xl:text-3xl">{i18n._(t`summoners`)}</h1>
                            </div>
                            <div className="uppercase">
                                <h1 className="text-lg">{i18n._(t`one-click`)}</h1>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 text-xs gap-y-3">
                                    <button
                                        className={classNames(
                                            'p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase',
                                            adventure.length === 0 ? 'opacity-50' : ''
                                        )}
                                        onClick={() => setModal(Modal.ADVENTURE)}
                                    >
                                        <p>{i18n._(t`adventure`)}</p>
                                        <p className="mt-1">{adventure.length}</p>
                                    </button>
                                    <button
                                        className={classNames(
                                            'p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase',
                                            level.length === 0 ? 'opacity-50' : ''
                                        )}
                                        onClick={() => setModal(Modal.LEVELUP)}
                                    >
                                        <p>{i18n._(t`level-up`)}</p>
                                        <p className="mt-1">{level.length}</p>
                                    </button>
                                    <button
                                        className={classNames(
                                            'p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase',
                                            gold.length === 0 ? 'opacity-50' : ''
                                        )}
                                        onClick={() => setModal(Modal.GOLD)}
                                    >
                                        <p>{i18n._(t`claim gold`)}</p>
                                        <p className="mt-1">{gold.length}</p>
                                    </button>
                                    <button
                                        className={classNames(
                                            'p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase',
                                            dungeon.length === 0 ? 'opacity-50' : ''
                                        )}
                                        onClick={() => setModal(Modal.DUNGEON)}
                                    >
                                        <p>{i18n._(t`dungeon`)}</p>
                                        <p className="mt-1">{dungeon.length}</p>
                                    </button>
                                    <button
                                        className="p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase"
                                        onClick={() => setModal(Modal.DAYCARE)}
                                    >
                                        {i18n._(t`daycare`)}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-end mt-5">
                            <div className="w-52">
                                <Filter summoners={summoners} filteredSummoners={setParsedSummoners} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 items-center gap-2 xl:gap-5">
                            {}
                            {parsedSummoners.length === 0
                                ? summoners.map((s) => {
                                      return (
                                          <SummonerSummaryCard
                                              key={s.id}
                                              summoner={s}
                                              time={time}
                                              sellable={sellable.indexOf(s.id) !== -1}
                                          />
                                      )
                                  })
                                : parsedSummoners.map((s) => {
                                      return (
                                          <SummonerSummaryCard
                                              key={s.id}
                                              summoner={s}
                                              time={time}
                                              sellable={sellable.indexOf(s.id) !== -1}
                                          />
                                      )
                                  })}
                        </div>
                    </>
                ) : (
                    <div className="flex my-10 justify-center">
                        <div className="text-2xl uppercase">
                            <h1>{i18n._(t`no summoners`)}</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
