import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import SummonerSelector from '../../components/Selectors/Summoners'
import { useSummoners } from '../../state/summoners/hooks'
import { SummonerFullData } from '../../hooks/useRarityLibrary'
import { CLASSES_NAMES } from '../../constants/codex/classes'

export default function Inventory(): JSX.Element {
    const { i18n } = useLingui()

    const summoners = useSummoners()

    const [selectedSummoner, setSelectedSummoner] = useState<SummonerFullData | undefined>(undefined)

    function summonerName(): string {
        return selectedSummoner.base._name !== ''
            ? selectedSummoner.base._name
            : selectedSummoner.id.toString() +
            ' ' +
            i18n._(t`level`) +
            ' ' +
            selectedSummoner.base._level +
            ' ' +
            i18n._(CLASSES_NAMES[selectedSummoner.base._class.toString()])
    }

    return (
        <div className="w-full z-25">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-10 gap-5">
                <div className="uppercase bg-card-top p-5 rounded-2xl">
                    <p>{i18n._(t`room 1`)}</p>
                    <p style={{ fontFamily: 'Work Sans' }} className="text-xs mt-5">
                        {i18n._(t`For summoners below 10,000`)}
                    </p>
                    <SummonerSelector summoners={summoners} select={(s) => setSelectedSummoner(s)} />
                    {selectedSummoner && (
                        <div>
                            <p style={{ fontFamily: 'Work Sans' }} className="text-xs text-center mt-2">
                                {i18n._(t`Join as:`)}
                            </p>
                            <p className="text-sm text-center mt-2">
                                {summonerName()}
                            </p>
                        </div>
                    )}
                </div>
                <div className="uppercase bg-card-top p-5 rounded-2xl">
                    <p>{i18n._(t`room 2`)}</p>
                    <p style={{ fontFamily: 'Work Sans' }} className="text-xs mt-5">
                        {i18n._(t`For summoners below 100,000`)}
                    </p>
                    <SummonerSelector summoners={summoners} select={(s) => setSelectedSummoner(s)} />
                    {selectedSummoner && (
                        <div>
                            <p style={{ fontFamily: 'Work Sans' }} className="text-xs text-center mt-2">
                                {i18n._(t`Join as:`)}
                            </p>
                            <p className="text-sm text-center mt-2">
                                {summonerName()}
                            </p>
                        </div>
                    )}
                </div>
                <div className="uppercase bg-card-top p-5 rounded-2xl">
                    <p>{i18n._(t`room 3`)}</p>
                    <p style={{ fontFamily: 'Work Sans' }} className="text-xs mt-5">
                        {i18n._(t`For summoners below 1,000,000`)}
                    </p>
                    <SummonerSelector summoners={summoners} select={(s) => setSelectedSummoner(s)} />
                    {selectedSummoner && (
                        <div>
                            <p style={{ fontFamily: 'Work Sans' }} className="text-xs text-center mt-2">
                                {i18n._(t`Join as:`)}
                            </p>
                            <p className="text-sm text-center mt-2">
                                {summonerName()}
                            </p>
                        </div>
                    )}
                </div>
                <div className="uppercase bg-card-top p-5 rounded-2xl">
                    <p>{i18n._(t`room 4`)}</p>
                    <p style={{ fontFamily: 'Work Sans' }} className="text-xs mt-5">
                        {i18n._(t`Open for everyone`)}
                    </p>
                    <SummonerSelector summoners={summoners} select={(s) => setSelectedSummoner(s)} />
                    {selectedSummoner && (
                        <div>
                            <p style={{ fontFamily: 'Work Sans' }} className="text-xs text-center mt-2">
                                {i18n._(t`Join as:`)}
                            </p>
                            <p className="text-sm text-center mt-2">
                                {summonerName()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
