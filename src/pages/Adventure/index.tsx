import { useTranslation } from 'react-i18next';

import adventure from '../../assets/images/adventure.png'
import title from '../../assets/images/adventure_txt.png'
import { MULTIADVENTURE_CONTRACT } from '../../constants'
import useRarity from '../../hooks/useRarity'
import { useCallback, useEffect, useState } from 'react'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useUserSummoners } from '../../state/user/hooks'
import useMultiAdventure from '../../hooks/useMultiAdventure'
import { Summoner } from '../../state/user/actions'
import SummonerAdventureCard from '../../components/Summoner/Adventure'
import Ordering from '../../components/Ordering'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BigNumber } from '@ethersproject/bignumber'

export default function Adventure(): JSX.Element | null {
    const { library, chainId, account } = useActiveWeb3React()

    const allSummoners = useUserSummoners()

    const [initialSummoners] = useState<Summoner[]>(allSummoners)

    const [filteredSummoners, setFilteredSummoners] = useState<Summoner[]>(allSummoners)

    const { allowance, approve, multicall_next_adventure } = useRarity()
    const [multiadv, setMultiAdv] = useState<{
        approved: boolean
        available: boolean
        summoners: string[]
    }>({ approved: false, available: false, summoners: [] })

    async function approveMultiAdventure() {
        if (!chainId) return
        await approve(MULTIADVENTURE_CONTRACT[chainId])
    }

    const { at } = useMultiAdventure()
    async function sendMultiAdventure() {
        await at(multiadv.summoners)
    }

    const [maLoading, setMaLoading] = useState(true)

    const filter = useCallback(async () => {
        if (!chainId) return
        const allowed = await allowance(account, MULTIADVENTURE_CONTRACT[chainId])
        const ma: { id: string; next: BigNumber }[] = await multicall_next_adventure(filteredSummoners.map((s) => s.id))
        const filtered = ma.filter((s) => {
            return parseInt(s.next.toString()) * 1000 < Date.now()
        })
        setMultiAdv({
            approved: allowed,
            available: filtered.length > 0,
            summoners: filtered.map((s) => {
                return s.id
            }),
        })
        setMaLoading(false)
    }, [filteredSummoners, multicall_next_adventure, allowance, account, chainId])

    const [_, setCurrentTime] = useState(new Date(Date.now()))
    useEffect(() => {
        if (!account || !library) return
        filter()
        const timer = setInterval(() => {
            setCurrentTime(new Date(Date.now()))
        }, 1000)

        return () => clearInterval(timer)
    }, [filter, account, library])

    const { t } = useTranslation();

    return (
        <>
            <div className="w-full mb-44">
                <img alt="sword" src={adventure} className="mx-auto w-16 mt-4 md:w-32" />
                <img alt="sword" src={title} className="mx-auto w-52 mt-4 md:w-64" />
            </div>
            <h1 className="text-md md:text-2xl text-white -mt-32 mb-12 uppercase">{t('Journey Awaiting')}!</h1>
            <Ordering summoners={initialSummoners} stateFunc={setFilteredSummoners} />
            <div className="w-full bg-custom-blue text-center pb-24">
                <p className="w-full text-x text-white my-4">{t('Send all summoners to adventure')}</p>
                {multiadv.available ? (
                    multiadv.approved ? (
                        <button
                            className="bg-custom-green border-8 border-white p-4 rounded-lg text-xl text-white my-4"
                            onClick={async () => {
                                await sendMultiAdventure()
                            }}
                        >
                            {maLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <span>{t('Adventure time!')}</span>}
                        </button>
                    ) : (
                        <button
                            className="bg-custom-green border-8 border-white p-4 rounded-lg text-xl text-white my-4"
                            onClick={async () => {
                                await approveMultiAdventure()
                            }}
                        >
                            {t('Approve')}
                        </button>
                    )
                ) : (
                    <button className="opacity-50 cursor-not-allowed bg-custom-green border-8 border-white p-4 rounded-lg text-xl text-white my-4">
                        {maLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <span>{t('No summoner available')}</span>}
                    </button>
                )}

                {filteredSummoners ? (
                    filteredSummoners.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 xl:w-8/12 mx-auto mt-10 gap-4">
                            {filteredSummoners.map((summoner) => {
                                return <SummonerAdventureCard key={summoner.id} summoner={summoner} />
                            })}
                        </div>
                    ) : (
                        <p className="text-white mt-10 text-2xl font-bold">
                            {t('To be able to manage stats you need to have a summoner')}
                        </p>
                    )
                ) : (
                    <div />
                )}
            </div>
        </>
    )
}
