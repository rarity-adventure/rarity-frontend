export function secondsRender(d): string {
    d = Number(d)
    let h = Math.floor(d / 3600)
    let m = Math.floor((d % 3600) / 60)
    let s = Math.floor((d % 3600) % 60)
    let hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : ''
    let mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : ''
    let sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
    return hDisplay + mDisplay + sDisplay
}
