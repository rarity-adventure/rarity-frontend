export function calcAPCost(score: number): number {
    if (score <= 14) {
        return score - 8
    } else {
        return Math.floor((score - 8) ** 2 / 6)
    }
}
