import { useLingui } from '@lingui/react'
import { utils } from 'ethers'
import { SKILLS } from '../../../constants/codex/skills'
import { CLASSES_HEADS, CLASSES_NAMES } from '../../../constants/codex/classes'
import ReactTooltip from 'react-tooltip'
import { t } from '@lingui/macro'
import React from 'react'
import useRarityMarket from '../../../hooks/useRarityMarket'
import { sendToast } from '../../../functions/toast'

export function SummonerMarketRow({ summoner, row_i }: { summoner; row_i }): JSX.Element {
    const { i18n } = useLingui()

    const format_ether = (value) => {
        const ftmValue = parseFloat(utils.formatEther(value))
        if (ftmValue > 100_000_000) {
            return 'Too much'
        } else {
            return ftmValue.toLocaleString()
        }
    }

    const format_number = (value: number) => {
        if (!value) return '0'
        return value.toLocaleString()
    }

    let attributes = 'Not set'
    if (summoner.str > 0) {
        attributes = `${summoner.str}-${summoner.dex}-${summoner.con}-${summoner.int}-${summoner.wis}-${summoner.cha}`
    }

    let nSkills = 0
    const skills = []
    for (let i = 0; i < 36; i++) {
        const skillVar = `skill${i}`
        if (summoner[skillVar] > 0) {
            nSkills += 1
            skills.push({ name: SKILLS[i + 1].name, value: summoner[skillVar] })
        }
    }

    let nFeats = 0
    const feats = []
    for (let i = 1; i < 100; i++) {
        const skillVar = `feat${i}`
        if (summoner[skillVar]) {
            nFeats += 1
        }
    }

    const colorClass = row_i % 2 == 0 ? 'bg-transparent' : 'bg-background-contrast-dark'

    const { buy } = useRarityMarket()

    return (
        <div
            style={{ minWidth: '1300px' }}
            className={`flex w-full justify-left flex-nowrap items-center p-0 ${colorClass}`}
        >
            <div style={{ width: '5%' }} className="text-center">
                <div>{CLASSES_HEADS[summoner.class]}</div>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <span>{summoner.summoner}</span>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <p className="uppercase">{CLASSES_NAMES[summoner.class]}</p>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <span>{format_ether(summoner.price_exact)}</span> FTM
            </div>
            <div style={{ width: '5%' }} className="text-center">
                <span>{summoner.level}</span>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <span>{format_number(summoner.xp)}</span>
            </div>
            <div
                data-tip={true}
                data-for={'stats_' + summoner.summoner}
                style={{ width: '15%' }}
                className="text-center"
            >
                <span>{attributes}</span>
                <ReactTooltip class="work-sans" id={'stats_' + summoner.summoner} className="opaque">
                    <p className="text-left">STR: {summoner.str}</p>
                    <p className="text-left">DEX: {summoner.dex}</p>
                    <p className="text-left">CON: {summoner.con}</p>
                    <p className="text-left">INT: {summoner.int}</p>
                    <p className="text-left">WIS: {summoner.wis}</p>
                    <p className="text-left">CHA: {summoner.cha}</p>
                </ReactTooltip>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <span>{format_ether(summoner.gold_exact)}</span>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <span>{format_number(summoner.cellar)}</span>
            </div>
            <div style={{ width: '5%' }} className="text-center">
                {nSkills == 0 ? (
                    <span>0</span>
                ) : (
                    <div data-tip={true} data-for={'skills_' + summoner.summoner}>
                        <span className="cursor-default text-center">{nSkills}</span>
                        <ReactTooltip
                            class="work-sans"
                            id={'skills_' + summoner.summoner}
                            aria-haspopup="true"
                            className="opaque"
                        >
                            {skills.map((skill) => {
                                return (
                                    <p key={skill.name} className="text-left">
                                        {skill.name}: {skill.value}
                                    </p>
                                )
                            })}
                        </ReactTooltip>
                    </div>
                )}
            </div>
            <div style={{ width: '5%' }} className="text-center">
                {nFeats == 0 ? (
                    <span>0</span>
                ) : (
                    <div data-tip={true} data-for={'feats_' + summoner.summoner}>
                        <span className="cursor-default">{nFeats}</span>
                        <ReactTooltip
                            class={'work-sans'}
                            id={'feats_' + summoner.summoner}
                            aria-haspopup="true"
                            className="opaque"
                        >
                            <p>Feats coming soon.</p>
                        </ReactTooltip>
                    </div>
                )}
            </div>
            <div style={{ width: '5%%' }} className="text-center">
                <button
                    onClick={() => sendToast(buy(summoner.summoner, summoner.price_exact), i18n._(t`Buying summoner`))}
                    className="uppercase border-2 border-white px-3 py-1.5 rounded-lg text-sm bg-green"
                >
                    {i18n._(t`buy`)}
                </button>
            </div>
        </div>
    )
}
