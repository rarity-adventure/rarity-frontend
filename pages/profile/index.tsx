import { useUserSelectedSummoner, useUserSelectSummoner, useUserSummoners } from '../../state/user/hooks'
import { SummonerFullData, useSummonersData } from '../../state/summoners/hooks'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Loader from '../../components/Loader'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'

enum View {
    stats,
    skills,
    inventory,
    crafting,
}
export default function Profile(): JSX.Element {
    const { i18n } = useLingui()

    const { library, account, chainId } = useActiveWeb3React()

    const windowVisible = useIsWindowVisible()

    const summoners = useUserSummoners()

    const [summonersState, setSummonersState] = useState<{ id: string }[]>([])

    useEffect(() => {
        if (!windowVisible || !library || !account || !chainId) return
        console.log('setSummonerIdsState')
        setSummonersState(summoners)
    }, [windowVisible, library, account, chainId, summoners, setSummonersState])

    const summoners_full_info = useSummonersData(summoners)

    const [fullSummoners, setFullSummonersState] = useState<{ [k: string]: SummonerFullData }>({})

    useEffect(() => {
        console.log('setSummonerFullInfoState')
        if (summonersState.length > 0) {
            setFullSummonersState(summoners_full_info)
        }
    }, [summonersState])

    const selectedSummoner = useUserSelectedSummoner()

    const [selectedSummonerClass, setSelectedSummonerClass] = useState<{
        loading: boolean
        img: string
        name: string
        _class: string
    }>({ loading: true, img: '', name: '', _class: '' })

    useEffect(() => {}, [selectedSummoner])

    const [view, setView] = useState<View>(View.stats)

    return (
        <div className="w-full z-10">
            <div className="border-white border-4 p-4 m-10">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-start gap-10 items-center uppercase">
                        <h1 className="text-4xl">{i18n._(t`profile`)}</h1>
                        <button className="uppercase hover:text-opacity-40" onClick={() => setView(View.stats)}>
                            <span>{i18n._(t`stats`)}</span>
                        </button>
                        <button className="uppercase" onClick={() => setView(View.skills)}>
                            <span>{i18n._(t`skills`)}</span>
                        </button>
                        <button className="uppercase" onClick={() => setView(View.inventory)}>
                            <span>{i18n._(t`inventory`)}</span>
                        </button>
                        <button className="uppercase" onClick={() => setView(View.crafting)}>
                            <span>{i18n._(t`craft`)}</span>
                        </button>
                    </div>
                    <div>
                        <select></select>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center p-20 mx-14">
                    <>
                        {selectedSummonerClass.loading ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <div className="text-center">
                                <img src={selectedSummonerClass.img} alt={''} className="h-48 mx-auto" />
                                <p className="uppercase text-3xl">
                                    [ <span className="text-xl">{selectedSummonerClass.name}</span> ]
                                </p>
                                <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl p-2">
                                    <span className="p-2 uppercase">{i18n._(selectedSummonerClass._class)}</span>{' '}
                                </div>
                            </div>
                        )}
                        <div></div>
                    </>
                </div>
            </div>
        </div>
    )
}
