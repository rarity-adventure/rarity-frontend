import adventure from '../../assets/images/adventure.png'
import title from '../../assets/images/adventure_txt.png'
import mountain from '../../assets/images/mountain.png'
import explore from '../../assets/images/exploration.png'

import { Summoner } from '../../state/user/actions'
import { useCallback, useEffect, useState } from 'react'
import { useUserSummoners } from '../../state/user/hooks'
import { MULTIADVENTURE_CONTRACT } from '../../constants'

import useRarity from '../../hooks/useRarity'
import useMultiAdventure from '../../hooks/useMultiAdventure'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import SummonerAdventureCard from '../../components/Summoner/Adventure'
import Modal from 'components/Modal'

export default function Adventure(): JSX.Element | null {
    const summoners = useUserSummoners()
    const { library, chainId, account } = useActiveWeb3React()
    const { nextAdventure, allowance, approve } = useRarity()
    const [_, setCurrentTime] = useState(new Date(Date.now()))
    const [modalState, setModalState] = useState<{
        isOpen: boolean
        filters: { id: string; name: string; checked: boolean }[]
        filter_selected: string[]
    }>({
        isOpen: false,
        filters: [
            { id: '1', name: 'Barbarian', checked: false },
            { id: '2', name: 'Bard', checked: false },
            { id: '3', name: 'Cleric', checked: false },
            { id: '4', name: 'Druid', checked: false },
            { id: '5', name: 'Fighter', checked: false },
            { id: '6', name: 'Monk', checked: false },
            { id: '7', name: 'Paladin', checked: false },
            { id: '8', name: 'Ranger', checked: false },
            { id: '9', name: 'Rogue', checked: false },
            { id: '10', name: 'Sorcerer', checked: false },
            { id: '11', name: 'Wizard', checked: false },
        ],
        filter_selected: [],
    })
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
    let filtered_summoners = summoners.filter((sf) => {
        const { _class } = sf
        return modalState.filter_selected.includes(_class)
    })

    const filter = useCallback(async () => {
        if (!chainId) return
        const allowed = await allowance(account, MULTIADVENTURE_CONTRACT[chainId])
        const filtered = []
        for (const summoner of summoners) {
            const nextAdv = await nextAdventure(summoner.id)
            const nextAdvTimestamp = parseInt(nextAdv.toString())
            if (nextAdvTimestamp * 1000 < Date.now()) {
                filtered.push(summoner)
            }
        }
        setMultiAdv({
            approved: allowed,
            available: filtered.length > 0,
            summoners: filtered.map((s: Summoner) => {
                return s.id
            }),
        })
    }, [summoners, nextAdventure, allowance, account, chainId])

    useEffect(() => {
        if (!account || !library) return
        filter()
    }, [filter, account, library])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date(Date.now()))
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <div className="w-full mb-44">
                <img alt="sword" src={adventure} className="mx-auto w-16 mt-4 md:w-32" />
                <img alt="sword" src={title} className="mx-auto w-52 mt-4 md:w-64" />
            </div>
            <div className="w-full bg-custom-blue text-center pb-24">
                <img alt="sword" src={mountain} className="mx-auto w-52 -m-32" />
                <img alt="sword" src={explore} className="mx-auto w-52 mt-32 md:w-1/4 my-4" />
                <span className="text-md md:text-2xl text-white mb-14">Journey Awaiting</span>
                <p className="w-full text-x text-white my-4">Send all summoners to adventure</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 xl:w-8/12 mx-auto mt-10 gap-4">
                    <div className="lg:col-start-2">
                        {multiadv.available ? (
                            multiadv.approved ? (
                                <button
                                    className="bg-custom-green border-8 border-white p-4 rounded-lg text-xl text-white lg:my-4 w-full"
                                    onClick={async () => {
                                        await sendMultiAdventure()
                                    }}
                                >
                                    Adventure time!
                                </button>
                            ) : (
                                <button
                                    className="bg-custom-green border-8 border-white p-4 rounded-lg text-xl text-white lg:my-4 w-full"
                                    onClick={async () => {
                                        await approveMultiAdventure()
                                    }}
                                >
                                    Approve
                                </button>
                            )
                        ) : (
                            <button className="opacity-50 cursor-not-allowed bg-custom-green border-8 border-white p-4 rounded-lg text-xl text-white lg:my-4 w-full">
                                No summoner available
                            </button>
                        )}
                    </div>

                    <div className="lg:justify-self-end">
                        <button
                            onClick={() => setModalState({ ...modalState, isOpen: !modalState.isOpen })}
                            className="bg-custom-green border-8 border-white p-4 rounded-lg text-base text-white lg:my-4 w-full"
                        >
                            Filter
                        </button>
                    </div>
                </div>

                <Modal
                    isOpen={modalState.isOpen}
                    onDismiss={function (): void {
                        console.log('CLose')
                    }}
                >
                    <div className="text-white">
                        <p>Filter:</p>

                        <div className="py-5 grid lg:grid-cols-3 grid-cols-1">
                            {modalState.filters.map((filt, id) => {
                                return (
                                    <label key={filt.id} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            checked={filt.checked}
                                            onChange={(e: any) => {
                                                let updatedFilter = modalState.filters
                                                updatedFilter[id].checked = e.target.checked
                                                setModalState({ ...modalState, filters: updatedFilter })
                                            }}
                                        />
                                        <span className="ml-2">{filt.name}</span>
                                    </label>
                                )
                            })}
                        </div>

                        <div className="flex flex-row space-x-5">
                            <button
                                onClick={() => setModalState({ ...modalState, isOpen: false })}
                                className="bg-custom-green border-4 border-white p-3 rounded-lg text-base text-white lg:my-4 w-full"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setModalState({
                                        ...modalState,
                                        isOpen: false,
                                        filter_selected: modalState.filters
                                            .filter((f) => f.checked)
                                            .map(({ id }) => id),
                                    })
                                }}
                                className="bg-custom-green border-4 border-white p-3 rounded-lg text-base text-white lg:my-4 w-full"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </Modal>

                {summoners ? (
                    summoners.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 xl:w-8/12 mx-auto mt-10 gap-4">
                            {filtered_summoners.length > 0
                                ? filtered_summoners.map((summoner) => {
                                      return <SummonerAdventureCard key={summoner.id} summoner={summoner} />
                                  })
                                : summoners.map((summoner) => {
                                      return <SummonerAdventureCard key={summoner.id} summoner={summoner} />
                                  })}
                        </div>
                    ) : (
                        <p className="text-white mt-10 text-2xl font-bold">
                            To be able to manage stats you need to have a summoner
                        </p>
                    )
                ) : (
                    <div />
                )}
            </div>
        </>
    )
}
