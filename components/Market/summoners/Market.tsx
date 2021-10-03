import { useLingui } from '@lingui/react'
import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { t } from '@lingui/macro'
import gql from 'graphql-tag'
import { DocumentNode } from 'graphql'
import { WithContext as ReactTags } from 'react-tag-input'
import { useListedCount, useListedSummoners } from '../../../services/graph/hooks'
import { SKILLS } from '../../../constants/codex/skills'
import {
    COMP_TO_POSTGRES,
    TAG_SUGGESTIONS,
    tag_to_variable,
    TAG_VALUE_COMPARISONS,
    TAGS_CLASSES,
    TAGS_WITH_VALUE,
} from '../../../constants/tags/tag_parsing'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import { CLASSES_IDS } from '../../../constants/codex/classes'
import { getMarketSummonersDefault, getMarketSummonersQuery } from '../../../services/graph/queries'
import { SummonerMarketRow } from './MarketRow'

export default function SummonersMarketListings(): JSX.Element {
    const { i18n } = useLingui()

    const [offset, setOffset] = useState(0)

    const [query, setQuery] = useState<DocumentNode>(getMarketSummonersDefault)

    const count = useListedCount({ refreshInterval: 1_000 })
    const s = useListedSummoners(offset, query, {refreshInterval: 1_000})

    const [summoners, setSummoners] = useState([])

    const SKILL_NAMES = Object.keys(SKILLS).map((id) => {
        return SKILLS[id].name.trim()
    })

    const suggestions = TAG_SUGGESTIONS.concat(SKILL_NAMES).map((suggestion) => {
        return {
            id: suggestion,
            text: suggestion,
        }
    })

    const LOWER_TAGS_WITH_VALUE = TAGS_WITH_VALUE.map((s) => s.toLowerCase())
    const LOWER_TAGS_CLASSES = TAGS_CLASSES.map((s) => s.toLowerCase())
    const LOWER_SKILL_NAMES = SKILL_NAMES.map((s) => s.toLowerCase())

    const KeyCodes = {
        comma: 188,
        enter: [10, 13],
    }

    const delimiters = [...KeyCodes.enter, KeyCodes.comma]

    useEffect(() => {
        if (!s || !summoners) return
        if (offset === 0) {
            setSummoners([].concat(s))
        } else {
            setSummoners(summoners.concat(s))
        }
    }, [s, offset])

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

        const newest_tag_id = tags.length > 0 ? tags[tags.length - 1]['id'] : ''
        let newest_varName_regex = /([^=><]+)/.exec(newest_tag_id)
        let newest_varName = ''
        if (newest_varName_regex?.length > 0) {
            newest_varName = newest_varName_regex[1].toLowerCase().trim()
        }

        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i]
            let text = tag['id'].toLowerCase()
            const order = tag['text'][0] === '↑' ? 'asc' : 'desc'

            const parts = /^([^=><]+)\s*([=<>]{1,2})\s*([\d.]+)$/.exec(text)

            let varName = text.trim()
            let comp = ''
            let value = 0
            if (parts?.length >= 4) {
                varName = parts[1].trim()
                try {
                    value = parseFloat(parts[3].trim())
                } catch (e) {}
                comp = parts[2].trim()
            }
            if (varName === newest_varName && i < tags.length - 1) {
                // Allow overwriting tags
                continue
            }
            if (LOWER_TAGS_CLASSES.includes(text) && !validTags.includes(text)) {
                classes.push(CLASSES_IDS[text])
                if (classes.length === 1) {
                    query['order_by'].push(`{ class: ${order} }`)
                    if (!['↑', '↓'].includes(tag['text'][0])) {
                        tag['text'] = '↓ ' + tag['text']
                    }
                } else if (tag['text'][0] == '↑' || tag['text'][0] == '↓') {
                    tag['text'] = tag['text'].slice(2)
                }
                validTags.push(text)
                newTags.push(tag)
            } else if (LOWER_TAGS_WITH_VALUE.includes(varName) && !validTags.includes(varName)) {
                if (value < 0 || (!TAG_VALUE_COMPARISONS.includes(comp) && value > 0)) {
                    continue
                }
                const varNameDB = tag_to_variable(varName)
                // Handle price seperately
                if (varNameDB === 'price_approx') {
                    if (value > 0) {
                        has_price = true
                    }
                    if (['<', '<=', '=<'].includes(comp)) {
                        if (value == 0) {
                            continue
                        }
                        const min_price = Math.max(0.0001, value)
                        const comp_str = comp === '<' ? '_lt' : '_lte'
                        query['where'].push(
                            `_and: [{price_approx: {${comp_str}: "${min_price}"}}, {price_approx: {_gt: "0"}}]`
                        )
                    } else if (['>', '>=', '=>'].includes(comp)) {
                        const min_price = Math.max(0.00001, value)
                        const comp_str = comp === '>' ? '_gt' : '_gte'
                        query['where'].push(`price_approx: {${comp_str}: "${min_price}"}`)
                    } else if (['==', '='].includes(comp)) {
                        if (value == 0) {
                            continue
                        }
                        const min_price = Math.max(0.0001, value).toString()
                        query['where'].push(`price_approx: {_eq: "${min_price}"}`)
                    }
                } else {
                    if (comp === '>') {
                        query['where'].push(`${varNameDB}: {_gt: "${value}"}`)
                    } else if (comp === '<') {
                        query['where'].push(`${varNameDB}: {_lt: "${value}"}`)
                    } else if (comp === '>=' || comp === '=>') {
                        query['where'].push(`${varNameDB}: {_gte: "${value}"}`)
                    } else if (comp === '<=' || comp === '=<') {
                        query['where'].push(`${varNameDB}: {_lte: "${value}"}`)
                    } else if (comp === '=' || comp === '==') {
                        query['where'].push(`${varNameDB}: {_eq: "${value}"}`)
                    }
                }
                validTags.push(varName)
                newTags.push(tag)
                query['order_by'].push(`{ ${varNameDB}: ${order} }`)
            } else if (LOWER_SKILL_NAMES.includes(varName) && !validTags.includes(varName)) {
                let compDB = '_gt'
                if (TAG_VALUE_COMPARISONS.includes(comp)) {
                    compDB = COMP_TO_POSTGRES[comp]
                }
                const index = LOWER_SKILL_NAMES.indexOf(varName)
                query['where'].push(`skill${index}: {${compDB}: "${value}"}`)
                query['order_by'].push(`{ skill${index}: ${order} }`)
                validTags.push(varName)
                newTags.push(tag)
            }
        }
        if (!has_price) {
            query['where'].push('price_approx: { _gt: "0"}')
        }
        if (classes.length === 1) {
            query['where'].push(`class: { _eq: "${classes[0]}" }`)
        } else if (classes.length > 1) {
            const class_wrapped = classes.map((c) => {
                return `{ class: {_eq: ${c}} }`
            })
            let class_str = '_or: ['
            class_str += class_wrapped.join(', ')
            class_str += ']'

            query['classes'] = class_str
        }
        setTags(newTags)
        const query_str = buildQuery(query)
        const finalQuery = getMarketSummonersQuery(query_str)
        const format = gql(finalQuery)
        setSummoners([])
        setQuery(format)
        setOffset(0)
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
        return `where: { ${where} }, order_by: [ ${orderBy}  ]`
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

    return (
        <>
            <div className="flex flex-row items-center justify-center md:justify-between mt-10 mb-2">
                <div className="flex flex-row text-xl font-bold items-center mr-2">
                    <h1>{i18n._(t`Filter and Sort with Tags`)} </h1>
                    <QuestionMarkCircleIcon data-tip data-for="filter-info" width={20} className={'ml-1'} />
                </div>
                <div className="hidden sm:inline-flex">
                    <span className="uppercase">
                        {i18n._(t`listed summoners:`)} {count}
                    </span>
                </div>
                <ReactTooltip id="filter-info" aria-haspopup="true" className="opaque">
                    <h1 className="text-md">Filtering and sorting with tags</h1>
                    <br />
                    <h2 className="text-md">Type the name of a property to sort by it.</h2>
                    <h2 className="text-md">Examples: Price, ID, Druid or Craft</h2>
                    <br />
                    <h2 className="text-md">Clicking a tag will change its sorting order.</h2>
                    <h2 className="text-md">Dragging a tag to the left will increase its sorting priority.</h2>
                    <br />
                    <h2 className="text-md">
                        Type the name of a property followed by a comparison operator to filter.
                    </h2>
                    <h2 className="text-md">Examples: {`Price <= 100, Craft > 4, Int = 18`}</h2>
                </ReactTooltip>
            </div>
            <div className="z-30 text-center md:text-left" style={{ fontFamily: 'Work Sans' }}>
                <ReactTags
                    renderSuggestion={({ text }) => <div className="p-2">{text}</div>}
                    placeholder={'Enter a new tag'}
                    tags={tags}
                    suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="top"
                    autocomplete
                    clearAll
                    onClearAll={onClearAll}
                    classNames={{
                        tags: 'relative grid uppercase',
                        tagInput: 'inline-block border-solid uppercase mb-4',
                        tagInputField:
                            'p-1.5 text-white border-white border-2 bg-background-contrast rounded-lg text-center w-72',
                        selected:
                            'inline-block my-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-y-5',
                        tag: 'flex flex-row justify-between text-xs border-solid bg-background-start border-2 border-white cursor-pointer p-2 rounded-2xl mx-2',
                        remove: 'ml-3 cursor-pointer text-grey',
                        suggestions:
                            'mt-1.5 absolute z-40 bg-background-start w-72 text-xs p-3 cursor-pointer rounded-b-lg',
                        activeSuggestion: 'bg-background-end rounded-lg',
                        clearAll: 'cursor-pointer p-2 m-3 bg-black border-none rounded',
                    }}
                />
            </div>
            <div
                className="m-5 bg-item-background border-2 rounded-3xl overflow-y-scroll h-screen"
                onScroll={handleScroll}
            >
                <div>
                    <div
                        style={{ minWidth: '1300px' }}
                        className="sticky w-full top-0 z-20 bg-card-bottom bg-market-table-top font-bold flex flex-nowrap items-center px-2 py-5"
                    >
                        <div style={{ width: '5%' }} className="text-center" />
                        <div
                            style={{ width: '10%' }}
                            className="text-center"
                            onClick={() => handleAddition({ id: 'ID', text: 'ID' })}
                        >
                            <h2>{i18n._(t`ID No.`)}</h2>
                        </div>
                        <div style={{ width: '10%' }} className="text-center">
                            <h2>{i18n._(t`CLASS`)}</h2>
                        </div>
                        <div
                            style={{ width: '10%' }}
                            className="text-center"
                            onClick={() => handleAddition({ id: 'Price', text: 'Price' })}
                        >
                            <h2>{i18n._(t`PRICE`)}</h2>
                        </div>
                        <div
                            style={{ width: '5%' }}
                            className="text-center"
                            onClick={() => handleAddition({ id: 'Level', text: 'Level' })}
                        >
                            <h2>{i18n._(t`LEVEL`)}</h2>
                        </div>
                        <div
                            style={{ width: '10%' }}
                            className="text-center"
                            onClick={() => handleAddition({ id: 'XP', text: 'XP' })}
                        >
                            <h2>{i18n._(t`XP`)}</h2>
                        </div>
                        <div style={{ width: '15%' }} className="text-center">
                            <h2>{i18n._(t`ATTRIBUTES`)}</h2>
                        </div>
                        <div
                            style={{ width: '10%' }}
                            className="text-center"
                            onClick={() => handleAddition({ id: 'Gold', text: 'Gold' })}
                        >
                            <h2>{i18n._(t`GOLD`)}</h2>
                        </div>
                        <div
                            style={{ width: '10%' }}
                            className="text-center"
                            onClick={() => handleAddition({ id: 'Materials', text: 'Materials' })}
                        >
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
                            return <SummonerMarketRow summoner={s} row_i={i} key={i} />
                        })}
                </div>
            </div>
        </>
    )
}
