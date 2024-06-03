import { finnUtfall, regnUtScoreForKamp } from './matchScoreCalculator'
import { stringTilNumber } from '../../utils/stringnumber'
import { AllBets, MatchBetMedScore, OtherUser } from '../../queries/useAllBetsExtended'
const winner = 'TODO'

export interface AllBetsExtended {
    users: OtherUser[]
    bets: MatchBetMedScore[]
}

const topscorer = ['TODO']
export function calculateAllBetsExtended(allBets: AllBets): AllBetsExtended {
    let scoreForKamp = regnUtScoreForKamp(allBets.bets)
    const betsMedScore = allBets.bets.map((b): MatchBetMedScore => {
        if (b.home_score == null || b.away_score == null) {
            return {
                ...b,
                away_score: stringTilNumber(b.away_score),
                home_score: stringTilNumber(b.home_score),
                poeng: 0,
                riktigResultat: false,
                riktigUtfall: false,
                matchpoeng: scoreForKamp.get(b.match_id)!,
            }
        } else {
            const utfall = finnUtfall(b.home_score, b.away_score)
            const riktigResultat = b.home_result == b.home_score && b.away_result == b.away_score
            let poeng = 0
            let riktigUtfall = utfall == scoreForKamp.get(b.match_id)!.utfall
            if (riktigUtfall) {
                poeng = poeng + scoreForKamp.get(b.match_id)!.riktigUtfall
            }
            if (riktigResultat) {
                poeng = poeng + scoreForKamp.get(b.match_id)!.riktigResultat
            }
            return {
                ...b,
                away_score: stringTilNumber(b.away_score),
                home_score: stringTilNumber(b.home_score),
                poeng: poeng,
                riktigResultat: riktigResultat,
                riktigUtfall: riktigUtfall,
                matchpoeng: scoreForKamp.get(b.match_id)!,
            }
        }
    })
    const winnerPointsFun = () => {
        const antallOk = allBets.users.filter((u) => u.winner == winner).length
        if (antallOk == 0) {
            return 0
        }
        return Math.min(Math.ceil((allBets.users.length * 3) / antallOk), 15)
    }
    const poengPerVinner = winnerPointsFun()
    const topscorerPointsFun = () => {
        const antallOk = allBets.users.filter((u) => topscorer.includes(u.topscorer || 'blah')).length
        if (antallOk == 0) {
            return 0
        }
        return Math.min(Math.ceil((allBets.users.length * 3) / antallOk), 15)
    }
    const poengPerTopscorer = topscorerPointsFun()
    return {
        users: allBets.users.map((u) => {
            let winnerPoints = 0
            let topscorerPoints = 0
            if (u.winner == winner) {
                winnerPoints = poengPerVinner
            }
            if (u.topscorer && topscorer.includes(u.topscorer)) {
                topscorerPoints = poengPerTopscorer
            }
            return {
                ...u,
                winnerPoints: winnerPoints,
                topscorerPoints: topscorerPoints,
            }
        }),
        bets: betsMedScore,
    }
}
