import { Summoner } from '../../state/user/actions'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CLASSES } from '../../constants/classes'

interface SummonersOrderingProps {
    summoners: Summoner[]
    stateFunc: Dispatch<SetStateAction<Summoner[]>>
}
export default function Ordering({ summoners, stateFunc }: SummonersOrderingProps): JSX.Element {
    const [state, setState] = useState<{ levels: number[]; classes: number[] }>({
        levels: [],
        classes: [],
    })

    const [selection, setSelection] = useState<{ level: number; class: number }>({
        class: 0,
        level: 0,
    })

    useEffect(() => {
        const levels = summoners
            .map((s) => {
                return parseInt(s._level)
            })
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort()
        const classes = summoners
            .map((s) => {
                return parseInt(s._class)
            })
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort()
        setState({ levels, classes })
    }, [selection, summoners])

    useEffect(() => {
        // Apply class filters
        const classFilter =
            selection.class === 0 ? summoners : summoners.filter((s) => s._class === selection.class.toString())

        // Apply level filters
        const levelFilter =
            selection.level === 0 ? classFilter : classFilter.filter((s) => s._level === selection.level.toString())
        stateFunc(levelFilter)
    }, [selection, summoners, stateFunc])

    return (
        <div className="flex flex-row-reverse xl:w-2/4 text-center text-white text-md p-4 items-center">
            <div className="bg-custom-background mx-2">
                <select
                    className="bg-custom-background border-2 border-white rounded-md "
                    defaultValue={0}
                    onChange={(v) => {
                        setSelection({ class: selection.class, level: parseInt(v.target.value) })
                    }}
                >
                    <option value={0}>Select a level</option>
                    {state.levels.map((l) => {
                        return (
                            <option key={l} value={l}>
                                Level {l}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="bg-custom-background mx-2">
                <select
                    className="bg-custom-background border-2 border-white rounded-md"
                    defaultValue={0}
                    onChange={(v) => {
                        setSelection({ class: parseInt(v.target.value), level: selection.level })
                    }}
                >
                    <option value={0}>Select a class</option>
                    {state.classes.map((c) => {
                        return (
                            <option key={c} value={c}>
                                {CLASSES[c].name}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}
