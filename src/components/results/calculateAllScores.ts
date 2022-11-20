import { MatchBetMedScore } from '../../queries/useAllBetsExtended'

interface LeaderBoard {
    userid: string
    poeng: number
}

export function calculateLeaderboard(bets: MatchBetMedScore[]): LeaderBoard[] {
    const userMap = new Map<string, MatchBetMedScore[]>()

    bets.forEach((bet) => userMap.set(bet.user_id, []))
    bets.forEach((bet) => userMap.get(bet.user_id)?.push(bet))

    const res = [] as LeaderBoard[]
    userMap.forEach((bets, user) => {
        let poeng = 0
        bets.forEach((b) => {
            poeng = poeng + b.poeng
        })

        res.push({
            userid: user,
            poeng,
        })
    })
    return res
}
