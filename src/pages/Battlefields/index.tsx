import skills from '../../assets/images/skills.png'
import skills_txt from '../../assets/images/skills_text.png'
import { useState } from 'react'
import SummonerBattlefieldCard from '../../components/Summoner/Battlefield'
import { FACTIONS } from 'constants/factions'
import { BATTLEFIELDS } from 'constants/battlefields'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

export default function Battlefields(): JSX.Element | null {
    const { chainId } = useActiveWeb3React()
    const [battlefield, setBattlefield] = useState<string | undefined>()

    return (
        <>
            <div className="w-full mb-44">
                <img alt="sword" src={skills} className="mx-auto w-16 mt-4 md:w-32" />
                <img alt="sword" src={skills_txt} className="mx-auto w-52 mt-4 md:w-64" />
            </div>
            <h1 className="text-md md:text-2xl text-white -mt-32 mb-12 uppercase">
                Send your summoners to a battlefield
            </h1>
            <div className="w-full bg-custom-blue text-center pb-24">
                <div className="mt-4">
                    <div className="w-100 flex justify-center">
                        <div>
                            <p className="w-full text-x text-white my-4">Select a Battlefield</p>
                            <select
                                className="p-2 border-custom-green border-4 rounded-lg"
                                onChange={(v) => {
                                    setBattlefield(v.target.value)
                                }}
                            >
                                <option selected disabled hidden>
                                    Select a battlefield
                                </option>
                                {chainId &&
                                    Object.entries(BATTLEFIELDS[chainId]).map(([id, f]) => {
                                        return (
                                            <option key={id} value={id}>
                                                {f.name}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>
                    </div>
                    {battlefield && (
                        <div className="flex flex-row flex-wrap w-11/12 mx-auto justify-center mt-10 gap-4">
                            {Object.keys(FACTIONS).map((f) => (
                                <SummonerBattlefieldCard key={f} faction={f} battlefield={battlefield} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
