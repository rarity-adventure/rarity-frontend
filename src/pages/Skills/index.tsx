import { useTranslation } from 'react-i18next';

import { useUserSummoners } from '../../state/user/hooks'
import { Summoner } from '../../state/user/actions'
import { CLASSES } from '../../constants/classes'
import skills from '../../assets/images/skills.png'
import skills_txt from '../../assets/images/skills_text.png'
import { useState } from 'react'
import SummonerSkillsCard from '../../components/Summoner/Skills'

export default function Skills(): JSX.Element | null {
    const summoners = useUserSummoners()

    const [summoner, setSummoner] = useState<Summoner | null>(null)

    const { t } = useTranslation();

    function summonerDataToString(summoner: Summoner): string {
        return parseInt(summoner.id).toString() + ' '+ t('Level') + ' ' + summoner._level + ' ' + t(CLASSES[summoner._class].name)
    }

    return (
        <>
            <div className="w-full mb-44">
                <img alt="sword" src={skills} className="mx-auto w-16 mt-4 md:w-32" />
                <img alt="sword" src={skills_txt} className="mx-auto w-52 mt-4 md:w-64" />
            </div>
            <h1 className="text-md md:text-2xl text-white -mt-32 mb-12 uppercase">{t('Assign skills to your summoners')}</h1>
            <div className="w-full bg-custom-blue text-center pb-24">
                <div className="mt-4">
                    <p className="w-full text-x text-white my-4">{t('Select a summoner')}</p>
                    <select
                        defaultValue={0}
                        className="p-2 border-custom-green border-4 rounded-lg"
                        onChange={(v) => {
                            if (v.target.value !== '0') {
                                setSummoner(JSON.parse(v.target.value))
                            }
                        }}
                    >
                        <option value={0}>{t('Select summoner')}</option>
                        {summoners.map((summoner) => {
                            return (
                                <option key={summoner.id} value={JSON.stringify(summoner)}>
                                    {summonerDataToString(summoner)}
                                </option>
                            )
                        })}
                    </select>
                    {summoner ? (
                        <div className="w-10/12 xl:w-8/12 mx-auto mt-10 gap-4">
                            <SummonerSkillsCard summoner={summoner} />
                        </div>
                    ) : (
                        <p className="text-white mt-10 text-2xl font-bold text-center">{t('Select a summoner first')}</p>
                    )}
                </div>
            </div>
        </>
    )
}
