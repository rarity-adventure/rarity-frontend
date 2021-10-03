import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import { SKILLS } from '../../../constants/codex/skills'
import { useSummoners } from '../../../state/summoners/hooks'
import { SummonerOwnRow } from './OwnRow'

export default function SummonersMarketOwn(): JSX.Element {
    const { i18n } = useLingui()

    const summoners = useSummoners()

    return (
        <>
            <div className="m-5 bg-item-background border-2 rounded-3xl overflow-y-scroll h-screen">
                <div>
                    <div
                        style={{ minWidth: '1300px' }}
                        className="sticky w-full top-0 z-20 bg-card-bottom bg-market-table-top font-bold flex flex-nowrap items-center p-5"
                    >
                        <div style={{ width: '5%' }} className="text-center" />
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`ID No.`)}</h2>
                        </div>
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`CLASS`)}</h2>
                        </div>
                        <div style={{ width: '5%' }} className="text-center">
                            <h2>{i18n._(t`LEVEL`)}</h2>
                        </div>
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`XP`)}</h2>
                        </div>
                        <div style={{ width: '15%' }} className="text-center">
                            <h2>{i18n._(t`ATTRIBUTES`)}</h2>
                        </div>
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`GOLD`)}</h2>
                        </div>
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`MATERIAL`)}</h2>
                        </div>
                        <div style={{ width: '5%' }} className="text-center">
                            <h2>{i18n._(t`SKILLS`)}</h2>
                        </div>
                        <div style={{ width: '5%' }} className="text-center">
                            <h2>{i18n._(t`FEATS`)}</h2>
                        </div>
                        <div style={{ width: '5%' }} className="text-center">
                            <h2>{i18n._(t`ACTION`)}</h2>
                        </div>
                    </div>
                    {summoners &&
                        summoners.map((s, i) => {
                            return <SummonerOwnRow summoner={s} row_i={i} key={i} />
                        })}
                </div>
            </div>
        </>
    )
}
