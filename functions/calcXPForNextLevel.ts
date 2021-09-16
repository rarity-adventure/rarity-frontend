export function calcXPForNextLevel(level: number): number {
    let xp = level * 1000
    for (let i = 1; i < level; i++) {
        xp += i * 1000
    }
    return xp
}
