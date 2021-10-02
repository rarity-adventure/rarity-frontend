import { useLingui } from '@lingui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { useSummoners, useSummonersLoading } from '../../state/summoners/hooks'
import { calcXPForNextLevel } from '../../functions/calcXPForNextLevel'
import SummonerSummaryCard from '../../components/Cards/Summary'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import Filter from '../../components/Filter'
import { classNames } from '../../functions/classNames'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import useRarity from '../../hooks/useRarity'
import { RARITY_ADVENTURE_TIME } from '../../constants'
import BulkActionModal, { BulkAction } from '../../components/Modal/modals/BulkActionModal'
import DaycareModal from '../../components/Modal/modals/Daycare'
import { sendToast } from '../../functions/toast'
import SummonersLoader from './Loader'

export default function Summoners(): JSX.Element {
    const { i18n } = useLingui()

    const { library, account } = useActiveWeb3React()

    const loading = useSummonersLoading()

    const s = useSummoners()

    const [summoners, setSummoners] = useState<SummonerFullData[]>(s)

    const [adventure, setAdventure] = useState<SummonerFullData[]>([])
    const [level, setLevel] = useState<SummonerFullData[]>([])
    const [gold, setGold] = useState<SummonerFullData[]>([])
    const [dungeon, setDungeon] = useState<SummonerFullData[]>([])

    const [modal, setModal] = useState(false)
    const [action, setAction] = useState<BulkAction>(0)

    const [daycareModal, setDaycareModal] = useState(false)

    function openModal(action: BulkAction) {
        setAction(action)
        setModal(true)
    }

    function closeModal() {
        setModal(false)
    }

    useEffect(() => {
        if (modal || !account) return
        setSummoners(s)
        setAdventure(s.filter((s) => s.base._log * 1000 < Date.now()))
        setLevel(s.filter((s) => s.base._xp >= calcXPForNextLevel(s.base._level)))
        setGold(s.filter((s) => s.gold.claimable > 0))
        setDungeon(s.filter((s) => s.materials.log * 1000 < Date.now() && s.materials.scout !== 0))
    }, [s, modal, account])

    const [time, setCurrentTime] = useState(Date.now())

    useEffect(() => {
        if (!account || !library) return
        const timer = setInterval(() => {
            setCurrentTime(Date.now())
        }, 1000)

        return () => clearInterval(timer)
    }, [account, library])

    const [parsedSummoners, setParsedSummoners] = useState<SummonerFullData[]>(summoners)

    const [adventureTimeApproval, setAdventureTimeApproval] = useState(false)

    const { isApprovedForAll, setApprovalForAll } = useRarity()

    const fetch_approval = useCallback(async () => {
        const approved = await isApprovedForAll(account, RARITY_ADVENTURE_TIME)
        setAdventureTimeApproval(approved)
    }, [account, isApprovedForAll])

    useEffect(() => {
        fetch_approval()
    }, [summoners, fetch_approval])

    return (
        <div className="w-full">
            <BulkActionModal open={modal} a={action} closeFunction={() => closeModal()} summoners={summoners} />
            <DaycareModal open={daycareModal} closeFunction={() => setDaycareModal(false)} summoners={summoners} />
            {loading ? (
                <SummonersLoader />
            ) : (
                <div className="md:border-white md:border-4 p-4 md:m-10 z-10 uppercase">
                    {summoners.length > 0 ? (
                        <>
                            <div className="flex flex-row items-center justify-between">
                                <div>
                                    <h1 className="text-2xl xl:text-3xl">
                                        {i18n._(t`summoners`)} {summoners.length}
                                    </h1>
                                </div>
                                <div className="uppercase">
                                    <h1 className="text-lg">{i18n._(t`one-click`)}</h1>
                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 text-xs gap-y-3">
                                        <button
                                            className={classNames(
                                                'p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase',
                                                adventure.length === 0 ? 'opacity-50' : ''
                                            )}
                                            onClick={() => openModal(BulkAction.ADVENTURE)}
                                        >
                                            <p>{i18n._(t`adventure`)}</p>
                                            <p className="mt-1">{adventure.length}</p>
                                        </button>
                                        <button
                                            className={classNames(
                                                'p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase',
                                                level.length === 0 ? 'opacity-50' : ''
                                            )}
                                            onClick={() => openModal(BulkAction.LEVELUP)}
                                        >
                                            <p>{i18n._(t`level-up`)}</p>
                                            <p className="mt-1">{level.length}</p>
                                        </button>
                                        <button
                                            className={classNames(
                                                'p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase',
                                                gold.length === 0 ? 'opacity-50' : ''
                                            )}
                                            onClick={() => openModal(BulkAction.GOLD)}
                                        >
                                            <p>{i18n._(t`claim gold`)}</p>
                                            <p className="mt-1">{gold.length}</p>
                                        </button>
                                        <button
                                            className={classNames(
                                                'p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase',
                                                dungeon.length === 0 ? 'opacity-50' : ''
                                            )}
                                            onClick={() => openModal(BulkAction.DUNGEON)}
                                        >
                                            <p>{i18n._(t`dungeon`)}</p>
                                            <p className="mt-1">{dungeon.length}</p>
                                        </button>
                                        <button
                                            className="p-2 border-white border-2 bg-background-contrast rounded-lg mx-1 uppercase"
                                            onClick={() => setDaycareModal(true)}
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
                            {!adventureTimeApproval &&
                                summoners.map((s) => s.misc.daycare_days_paid).reduce((x, y) => x + y) > 0 && (
                                    <div
                                        className="flex flex-row items-center justify-center mt-5 cursor-pointer"
                                        onClick={() =>
                                            sendToast(
                                                setApprovalForAll(RARITY_ADVENTURE_TIME),
                                                i18n._(t`Approving Daycare`)
                                            ).then(() => setAdventureTimeApproval(true))
                                        }
                                    >
                                        <p className="text-xs animate-bounce">
                                            {'>>'}{' '}
                                            {i18n._(
                                                t`Some of your summoners are in Daycare but it is not approved click here to approve`
                                            )}{' '}
                                            {'<<'}
                                        </p>
                                    </div>
                                )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 items-center gap-2 xl:gap-5">
                                {parsedSummoners.length === 0
                                    ? summoners.map((s) => {
                                          return <SummonerSummaryCard key={s.id} summoner={s} time={time} />
                                      })
                                    : parsedSummoners.map((s) => {
                                          return <SummonerSummaryCard key={s.id} summoner={s} time={time} />
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
            )}
        </div>
    )
}
