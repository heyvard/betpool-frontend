import { NextApiRequest, NextApiResponse } from 'next'
import { verifiserIdToken } from '../../../../auth/verifiserIdToken'
import { getKnex } from '../../../../knex'
import { User } from '../../../../domain/user'

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
    const authheader = req.headers.authorization
    if (!authheader) {
        res.status(401)
        return
    }

    const verifisert = await verifiserIdToken(authheader.split(' ')[1])
    if (!verifisert) {
        res.status(401)
        return
    }
    const userid = verifisert.payload.sub
    const upcoming = (
        await getKnex().raw(
            `
            SELECT m.game_start,
                   m.away_team,
                   m.home_team,
                   b.home_score,
                   b.away_score,
                   b.match_id,
                   b.id bet_id,
                   m.channel
            FROM bets b,
                 matches m,
                 users u
            WHERE b.user_id = u.id
              and u.firebase_user_id = ?
              AND b.match_id = m.id
            ORDER BY game_start, m.id asc;`,
            [userid]
        )
    ).rows

    res.status(200).json(upcoming)
}
