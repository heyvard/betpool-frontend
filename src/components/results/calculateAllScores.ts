import { MatchBetMedScore, OtherUser } from '../../queries/useAllBets'

interface LeaderBoard {
    userid: string
    poeng: number
    userName: string
}

export function calculateLeaderboard(bets: MatchBetMedScore[], users: OtherUser[]): LeaderBoard[] {
    const userMap = new Map<string, MatchBetMedScore[]>()
    if (bets.length == 0) {
        return users.map((u) => {
            return {
                userid: u.id,
                poeng: 0,
                userName: u.name,
            }
        })
    }
    bets.forEach((bet) => userMap.set(bet.user_id, []))
    bets.forEach((bet) => userMap.get(bet.user_id)?.push(bet))
    const userNameMap = new Map<string, string>()
    users.forEach((u) => {
        userNameMap.set(u.id, u.name)
    })
    const res = [] as LeaderBoard[]
    userMap.forEach((bets, user) => {
        let poeng = 0
        bets.forEach((b) => {
            poeng = poeng + b.poeng
        })
        users.forEach((u) => {
            if (u.id == user) {
                poeng = poeng + (u.winnerPoints || 0) + (u.topscorerPoints || 0)
            }
        })

        res.push({
            userid: user,
            poeng,
            userName: userNameMap.get(user) || 'unknown',
        })
    })
    return res.sort((a, b) => b.poeng - a.poeng)
}
