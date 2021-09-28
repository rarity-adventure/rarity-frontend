import { useLingui } from '@lingui/react'
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { CLASSES_HEADS, CLASSES_IDS, CLASSES_NAMES } from '../../constants/classes'
import MarketFeatsModal from '../../components/Modal/modals/MarketFeats'
import MarketSkillsModal from '../../components/Modal/modals/MarketSkills'
import { WithContext as ReactTags } from 'react-tag-input'
import { useListedCount, useListedSummoners } from '../../services/graph/hooks'
import {
    TAG_SUGGESTIONS,
    TAG_VALUE_COMPARISONS,
    TAGS_WITH_VALUE,
    TAGS_CLASSES,
    tag_to_variable,
} from '../../constants/tags/tag_parsing'
import gql from 'graphql-tag'
import { getMarketSummonersDefault, getMarketSummonersQuery } from '../../constants/queries'
import { DocumentNode } from 'graphql'

function SummonerRow({
    summoner,
    skillsModalFunc,
    featsModalFunc,
}: {
    summoner
    skillsModalFunc: (summoner: number) => void
    featsModalFunc: (summoner: number) => void
}): JSX.Element {
    const { i18n } = useLingui()

    return (
        <div style={{ width: '1478px' }} className="flex justify-left flex-nowrap items-center p-5">
            <div style={{ width: '125px' }} className="text-center">
                <span>{summoner.summoner}</span>
            </div>
            <div style={{ width: '125px' }} className="text-center">
                <div>{CLASSES_HEADS[summoner.class]}</div>
                <p className="uppercase">{CLASSES_NAMES[summoner.class]}</p>
            </div>
            <div style={{ width: '80px' }} className="text-center">
                <span>{summoner.price_approx}</span> FTM
            </div>
            <div style={{ width: '80px' }} className="text-center">
                <span>{summoner.level}</span>
            </div>
            <div style={{ width: '80px' }} className="text-center">
                <span>{summoner.xp}</span>
            </div>
            <div style={{ width: '250px' }} className="text-center">
                <div className="py-1 px-2 bg-card-top rounded-3xl border-2 border-white mx-6">
                    <div className="relative py-1 px-2">
                        <div className="flex flex-row justify-between h-7 items-center">
                            <h1 className="absolute left-3">STR: </h1>
                            <h1 className="absolute left-14">{summoner.str}</h1>
                            <h1 className="absolute right-8">INT: </h1>
                            <h1 className="absolute right-3">{summoner.int}</h1>
                        </div>
                        <div className="flex flex-row justify-between h-7 py-1">
                            <h1 className="absolute left-3">DEX: </h1>
                            <h1 className="absolute left-14">{summoner.dex}</h1>
                            <h1 className="absolute right-8">WIS: </h1>
                            <h1 className="absolute right-3">{summoner.wis}</h1>
                        </div>
                        <div className="flex flex-row justify-between h-7 py-1">
                            <h1 className="absolute left-3">CON: </h1>
                            <h1 className="absolute left-14">{summoner.con}</h1>
                            <h1 className="absolute right-8">CHA: </h1>
                            <h1 className="absolute right-3">{summoner.cha}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '300px' }} className="text-center">
                <div className="py-1 px-2 bg-card-top rounded-3xl border-2 border-white mx-6">
                    <div className="relative py-1 px-2">
                        <div className="flex flex-row justify-between h-7 items-center">
                            <h1 className="absolute left-1">CLAIMED: </h1>
                            <h1 className="absolute right-1">{summoner.gold_approx}</h1>
                        </div>
                        <div className="flex flex-row justify-between h-7 py-1">
                            <h1 className="absolute left-1">UNCLAIMED: </h1>
                            <h1 className="absolute right-1">{summoner.unclaimed_gold_approx}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '100px' }} className="text-center">
                <span>{summoner.cellar}</span>
            </div>
            <div style={{ width: '150px' }} className="text-center">
                <button
                    onClick={() => skillsModalFunc(summoner)}
                    className="uppercase border-2 border-white px-1 py-1.5 rounded-lg text-xs bg-card-top"
                >
                    {i18n._(t`view more`)}
                </button>
            </div>
            <div style={{ width: '150px' }} className="text-center">
                <button
                    onClick={() => featsModalFunc(summoner)}
                    className="uppercase border-2 border-white px-1 py-1.5 rounded-lg text-xs bg-card-top"
                >
                    {i18n._(t`view more`)}
                </button>
            </div>
            <div style={{ width: '150px' }} className="text-center">
                <button className="uppercase border-2 border-white px-3 py-1.5 rounded-lg text-sm bg-green">
                    {i18n._(t`buy`)}
                </button>
            </div>
        </div>
    )
}

export default function Market(): JSX.Element {
    const { i18n } = useLingui()

    const [skillsModal, setSkillsModal] = useState({ open: false, summoner: 0 })
    const [featsModal, setFeatsModal] = useState({ open: false, summoner: 0 })

    const [offset, setOffset] = useState(0)

    const [query, setQuery] = useState<DocumentNode>(getMarketSummonersDefault)

    const count = useListedCount({ refreshInterval: 5_000 })
    const s = useListedSummoners(offset, query)

    const [summoners, setSummoners] = useState([])

    const LOWER_TAGS_WITH_VALUE = TAGS_WITH_VALUE.map((s) => s.toLowerCase())
    const LOWER_TAGS_CLASSES = TAGS_CLASSES.map((s) => s.toLowerCase())

    const suggestions = TAG_SUGGESTIONS.map((suggestion) => {
        return {
            id: suggestion,
            text: suggestion,
        }
    })

    const KeyCodes = {
        comma: 188,
        enter: [10, 13],
    }

    const delimiters = [...KeyCodes.enter, KeyCodes.comma]

    useEffect(() => {
        if (!s || !summoners) return
        setSummoners(summoners.concat(s))
    }, [s, offset])

    useEffect(() => {
        if (!s || !summoners) return
        setSummoners(s)
    }, [s, query])

    function openSkillsModal(summoner: number) {
        setSkillsModal({ open: true, summoner })
    }

    function openFeatsModal(summoner: number) {
        setFeatsModal({ open: true, summoner })
    }

    function closeSkills() {
        setSkillsModal({ open: false, summoner: 0 })
    }

    function closeFeats() {
        setFeatsModal({ open: false, summoner: 0 })
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
        if (bottom) {
            setOffset(offset + 20)
        }
    }

    const [tags, setTags] = React.useState([])

    const parseTags = (tags) => {
        const validTags = []
        const newTags = []
        const classes = []
        let query = {
            classes: '',
            where: [],
            order_by: [],
        }
        let has_price = false
        for (const tag of tags) {
            let text = tag['id'].toLowerCase()
            const order = tag['text'][0] === '↑' ? 'asc' : 'desc'

            // Only works for single word properties and must use spaces. This can be improved.
            const words = text.split(' ')

            if (LOWER_TAGS_CLASSES.includes(text) && !validTags.includes(text)) {
                classes.push(CLASSES_IDS[text])
                if (classes.length === 1) {
                    query['order_by'].push(`class: ${order}`)
                } else if (tag['text'][0] == '↑' || tag['text'][0] == '↓') {
                    tag['text'] = tag['text'].slice(2)
                }
                validTags.push(text)
                newTags.push(tag)
            } else if (LOWER_TAGS_WITH_VALUE.includes(words[0]) && !validTags.includes(words[0])) {
                let value
                try {
                    value = parseFloat(words[2])
                } catch (e) {
                    // Invalid value
                    continue
                }
                if (value < 0) {
                    continue
                }

                let varName = tag_to_variable(words[0])
                if (words.length === 3 && TAG_VALUE_COMPARISONS.includes(words[1])) {
                    // Handle price seperately
                    if (words[0] === 'price') {
                        if (['<', '<=', '=<'].includes(words[1])) {
                            if (value == 0) {
                                continue
                            }
                            const min_price = Math.max(0.0001, value)
                            const comp = words[1] === '<' ? '_lt' : '_lte'
                            query['where'].push(
                                `{_and: [price_approx: {${comp}: "${min_price}"}, price_approx: {_gt: "0"}]}`
                            )
                        } else if (['>', '>=', '=>'].includes(words[1])) {
                            const min_price = Math.max(0.0001, value)
                            const comp = words[1] === '>' ? '_gt' : '_gte'
                            query['where'].push(`price_approx: {${comp}: "${min_price}"}`)
                        } else if (words[1] === '=') {
                            if (value == 0) {
                                continue
                            }
                            const min_price = Math.max(0.0001, value)
                            query['where'].push(`price_approx: "${min_price}"`)
                        }
                        has_price = true
                    } else {
                        if (words[1] === '>') {
                            query['where'].push(`${varName}: {_gt: "${words[2]}"}`)
                        } else if (words[1] === '<') {
                            query['where'].push(`${varName}: {_lt: "${words[2]}"}`)
                        } else if (words[1] === '>=' || words[1] === '=>') {
                            query['where'].push(`${varName}: {_gte: "${words[2]}"}`)
                        } else if (words[1] === '<=' || words[1] === '=<') {
                            query['where'].push(`${varName}: {_lte: "${words[2]}"}`)
                        } else if (words[1] === '=' || words[1] === '==') {
                            query['where'].push(`${varName}: "${words[2]}"`)
                        }
                    }
                }
                validTags.push(words[0])
                newTags.push(tag)
                query['order_by'].push(`${varName}: ${order}`)
            }
        }
        if (!has_price) {
            query['where'].push('price_approx: { _gte: "0"}')
        }
        if (classes.length === 1) {
            query['where'].push(`class: { _eq: ${classes[0]} }`)
        } else if (classes.length > 1) {
            const class_wrapped = classes.map((c) => {
                return `{ class: "${c}" }`
            })
            let class_str = '{_or: ['
            class_str += class_wrapped.join(', ')
            class_str += ']}'

            query['classes'] = class_str
        }
        setTags(newTags)
        const query_str = buildQuery(query)
        const finalQuery = getMarketSummonersQuery(query_str)
        const format = gql(finalQuery)
        setQuery(format)
    }

    const buildQuery = (query) => {
        let where = ''
        if (query['classes'].length > 0) {
            where += `${query['classes']}`
            if (query['where'].length > 0) {
                where += ', '
            }
        }
        where += query['where'].join(', ')
        let orderBy = query['order_by'].join(', ')
        return `where: { ${where} }, order_by: { ${orderBy} }`
    }

    const handleDelete = (i) => {
        parseTags(tags.filter((tag, index) => index !== i))
    }

    const handleAddition = (tag) => {
        tag['text'] = '↑ ' + tag['text']
        parseTags([...tags, tag])
    }

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice()

        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)

        // re-render
        parseTags(newTags)
    }

    const handleTagClick = (index) => {
        const order = tags[index]['text'][0]
        let newOrder
        if (order === '↑') {
            newOrder = '↓'
        } else if (order === '↓') {
            newOrder = '↑'
        } else {
            return
        }
        tags[index]['text'] = newOrder + tags[index]['text'].slice(1)
        parseTags(tags)
    }

    const onClearAll = () => {
        setTags([])
    }

    function buttons(): JSX.Element {
        return (
            <div className="flex flex-row gap-x-3">
                <button className="rounded-3xl uppercase border-2 border-market-button">
                    <h2 className="py-1 px-3">{i18n._(t`market`)}</h2>
                </button>
                <button className="rounded-3xl uppercase border-2 border-market-button">
                    <h2 className="py-1 px-3">{i18n._(t`my listing`)}</h2>
                </button>
            </div>
        )
    }

    return (
        <div className="w-full z-25">
            <div className="md:m-10 z-10">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-2xl xl:text-3xl uppercase font-bold">
                            {i18n._(t`rarity summoners market`)}
                        </h1>
                    </div>
                    {buttons()}
                </div>
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-md">{i18n._(t`List and Buy your summoners`)}</h3>
                </div>
                <div className="flex flex-row items-center justify-between mt-10">
                    <div>
                        <h1 className="text-xl font-bold">{i18n._(t`Filter With Tags:`)}</h1>
                    </div>
                    <div>
                        <span className="uppercase">
                            <span>
                                {i18n._(t`listed summoners:`)} {count}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between mt-2 text">
                    <ReactTags
                        tags={tags}
                        suggestions={suggestions}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        handleTagClick={handleTagClick}
                        inputFieldPosition="bottom"
                        autocomplete
                        clearAll
                        onClearAll={onClearAll}
                        classNames={{
                            tags: 'relative',
                            tagInput: 'inline-block h-16 border-solid m-0',
                            tagInputField: 'p-2 text-background-end rounded-lg text-center',
                            selected: 'inline-block',
                            tag: 'border-solid bg-black inline-block mr-2 ml-2 p-3 rounded-2xl',
                            remove: 'ml-3 cursor-pointer text-grey',
                            suggestions: '',
                            activeSuggestion: 'bg-red',
                            clearAll: 'cursor-pointer p-2 m-3 bg-black border-none rounded',
                        }}
                    />
                </div>
                <div
                    className="m-10 bg-item-background border-2 rounded-3xl overflow-y-scroll h-screen"
                    onScroll={handleScroll}
                >
                    <MarketFeatsModal
                        open={featsModal.open}
                        closeFunction={closeFeats}
                        summoner={featsModal.summoner}
                    />
                    <MarketSkillsModal
                        open={skillsModal.open}
                        closeFunction={closeSkills}
                        summoner={skillsModal.summoner}
                    />
                    <div>
                        <div
                            style={{ width: '1478px' }}
                            className="sticky top-0 z-30 bg-card-bottom bg-market-table-top font-bold flex flex-nowrap items-center p-5"
                        >
                            <div style={{ width: '125px' }} className="text-center">
                                <h2>{i18n._(t`ID No.`)}</h2>
                            </div>
                            <div style={{ width: '125px' }} className="text-center">
                                <h2>{i18n._(t`CLASS`)}</h2>
                            </div>
                            <div style={{ width: '80px' }} className="text-center">
                                <h2>{i18n._(t`PRICE.`)}</h2>
                            </div>
                            <div style={{ width: '80px' }} className="text-center">
                                <h2>{i18n._(t`LEVEL`)}</h2>
                            </div>
                            <div style={{ width: '80px' }} className="text-center">
                                <h2>{i18n._(t`XP`)}</h2>
                            </div>
                            <div style={{ width: '250px' }} className="text-center">
                                <h2>{i18n._(t`ATTRIBUTES`)}</h2>
                            </div>
                            <div style={{ width: '300px' }} className="text-center">
                                <h2>{i18n._(t`GOLD`)}</h2>
                            </div>
                            <div style={{ width: '100px' }} className="text-center">
                                <h2>{i18n._(t`MATERIAL`)}</h2>
                            </div>
                            <div style={{ width: '150px' }} className="text-center">
                                <h2>{i18n._(t`SKILLS`)}</h2>
                            </div>
                            <div style={{ width: '150px' }} className="text-center">
                                <h2>{i18n._(t`FEATS`)}</h2>
                            </div>
                            <div style={{ width: '150px' }} className="text-center">
                                <h2>{i18n._(t`ACTION`)}</h2>
                            </div>
                        </div>
                        {summoners &&
                            summoners.map((s) => {
                                return (
                                    <SummonerRow
                                        summoner={s}
                                        key={s.id}
                                        featsModalFunc={openFeatsModal}
                                        skillsModalFunc={openSkillsModal}
                                    />
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}
