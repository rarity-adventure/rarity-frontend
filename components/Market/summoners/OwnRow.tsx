import { useLingui } from '@lingui/react'
import { utils } from 'ethers'
import { SKILLS } from '../../../constants/codex/skills'
import { CLASSES_HEADS, CLASSES_NAMES } from '../../../constants/codex/classes'
import ReactTooltip from 'react-tooltip'
import { t } from '@lingui/macro'
import React from 'react'

export function SummonerOwnRow({ summoner, row_i }: { summoner; row_i }): JSX.Element {
    const { i18n } = useLingui()

    const format_ether = (value) => {
        if (!value) return '0'
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
    if (summoner.ability_scores.created) {
        attributes = `${summoner.ability_scores.attributes._str}-${summoner.ability_scores.attributes._dex}-${summoner.ability_scores.attributes._con}-${summoner.ability_scores.attributes._int}-${summoner.ability_scores.attributes._wis}-${summoner.ability_scores.attributes._cha}`
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

    console.log(summoner)

    const colorClass = row_i % 2 == 0 ? 'bg-transparent' : 'bg-background-contrast-dark'
    return (
        <div
            style={{ minWidth: '1300px' }}
            className={`flex w-full justify-left flex-nowrap items-center p-0 ${colorClass}`}
        >
            <div style={{ width: '5%' }} className="text-center">
                <div>{CLASSES_HEADS[summoner.base._class]}</div>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <span>{format_number(summoner.id)}</span>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <p className="uppercase">{CLASSES_NAMES[summoner.base._class]}</p>
            </div>
            <div style={{ width: '5%' }} className="text-center">
                <span>{summoner.base._level}</span>
            </div>
            <div style={{ width: '10%' }} className="text-center">
                <span>{format_number(summoner.base._xp)}</span>
            </div>
            <div
                data-tip={true}
                data-for={'stats_' + summoner.summoner}
                style={{ width: '15%' }}
                className="text-center"
            >
                <span>{attributes}</span>
                <ReactTooltip class="work-sans" id={'stats_' + summoner.summoner} className="opaque">
                    <p className="text-left">STR: {summoner.ability_scores.attributes._str}</p>
                    <p className="text-left">DEX: {summoner.ability_scores.attributes._dex}</p>
                    <p className="text-left">CON: {summoner.ability_scores.attributes._con}</p>
                    <p className="text-left">INT: {summoner.ability_scores.attributes._int}</p>
                    <p className="text-left">WIS: {summoner.ability_scores.attributes._wis}</p>
                    <p className="text-left">CHA: {summoner.ability_scores.attributes._cha}</p>
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
                        <span className="cursor-default">{nSkills}</span>
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
                <button className="uppercase border-2 border-white px-3 py-1.5 rounded-lg text-sm bg-green">
                    {i18n._(t`buy`)}
                </button>
            </div>
        </div>
    )
}
