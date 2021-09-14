import { useLoaded, useUserSummoners } from '../../state/user/hooks'
import { useSummonersData } from '../../state/summoners/hooks'
import { useLingui } from '@lingui/react'
import { useState } from 'react'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { t } from '@lingui/macro'
import { CLASSES_NAMES } from '../../constants/classes'
import Loader from '../../components/Loader'

enum View {
    stats,
    skills,
    inventory,
    crafting,
}

export default function Profile(): JSX.Element {
    const { i18n } = useLingui()

    const summoners = useUserSummoners()

    const summonersFullData = useSummonersData(summoners)


   /* const storedSelectedSummoner = useUserSelectedSummoner()

    const saveSelectedSummoner = useUserSelectSummoner()

    const [selectedSummoner, setSelectedSummoner] = useState<SummonerFullData | undefined>(storedSelectedSummoner)

    useEffect(() => {
        if (!selectedSummoner) {
            if (Object.keys(summonersDataState).length > 0) {
                setSelectedSummoner(summonersDataState[0])
            }
        }
        setSelectedSummoner(selectedSummoner)
        saveSelectedSummoner(selectedSummoner)
    }, [selectedSummoner])
*/

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
                        {Object.keys(summonersFullData).length > 0 ? (
                            <select
                                defaultValue={undefined}
                                className="bg-transparent divide-white divide-y-2 p-2 uppercase"
                                onChange={(v) => console.log(summonersFullData[v.target.value])}
                            >
                                <option id={undefined}>Select a summoner</option>
                                {Object.keys(summonersFullData).map((k: string) => {
                                    const data = summonersFullData[k]
                                    return (
                                        <option key={k} value={k}>
                                            {data.base._name !== ''
                                                ? data.base._name
                                                : parseInt(k, 16) +
                                                ' ' +
                                                i18n._(t`level`) +
                                                ' ' +
                                                data.base._level +
                                                ' ' +
                                                i18n._(CLASSES_NAMES[data.base._class.toString()])}
                                        </option>
                                    )
                                })}
                            </select>
                        ) : (
                            <Loader className="animate-spin" />
                        )}
                    </div>
                </div>
                {/*{!selectedSummoner ? (
                    <div className="relative h-96">
                        <div className="absolute top-1/2 right-1/2">
                            <Loader className="animate-spin" size="40px" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row justify-between items-center p-20 mx-14">
                        <>
                            <div className="text-center">
                                <img src={CLASSES_IMAGES[selectedSummoner.base._class.toString()]} alt={''} className="h-48 mx-auto" />
                                <div className="flex flex-row items-center text-center justify-center uppercase text-3xl">
                                    [{' '}
                                    <span className="text-xl mx-10">
                                        {selectedSummoner.base._name !== '' ? selectedSummoner.base._name : 'Unknown'}
                                    </span>{' '}
                                    ]
                                </div>
                                <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl p-2">
                                    <span className="p-2 uppercase">{i18n._(CLASSES_NAMES[selectedSummoner.base._class.toString()])}</span>{' '}
                                </div>
                            </div>
                            <div></div>
                        </>
                    </div>
                )}*/}
            </div>
        </div>
    )
}
