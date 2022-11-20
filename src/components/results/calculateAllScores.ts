import { MatchBet } from '../../queries/useAllBets'
import { finnUtfall, MatchPoeng } from './matchScoreCalculator'

interface LeaderBoard {
    userid: string
    poeng: number
}

export function calculateLeaderboard(bets: MatchBet[], matchPoeng: Map<string, MatchPoeng>): LeaderBoard[] {
    const userMap = new Map<string, MatchBet[]>()

    bets.forEach((bet) => userMap.set(bet.user_id, []))
    bets.forEach((bet) => userMap.get(bet.user_id)?.push(bet))

    const res = [] as LeaderBoard[]
    userMap.forEach((bets, user) => {
        let poeng = 0
        bets.forEach((b) => {
            if (b.home_score == null || b.away_score == null) {
            } else {
                const utfall = finnUtfall(b.home_score, b.away_score)
                const riktig = b.home_result == b.home_score && b.away_result == b.away_score

                if (utfall == matchPoeng.get(b.match_id)!.utfall) {
                    poeng = poeng + matchPoeng.get(b.match_id)!.riktigUtfall
                }
                if (riktig) {
                    poeng = poeng + matchPoeng.get(b.match_id)!.riktigResultat
                }
            }
        })

        res.push({
            userid: user,
            poeng,
        })
    })
    return res
}
