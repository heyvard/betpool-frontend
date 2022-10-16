import { NextApiRequest, NextApiResponse } from 'next'
import { verifiserIdToken } from '../../../auth/verifiserIdToken'
import { getKnex } from '../../../knex'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const knex = getKnex()

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

    const user = await knex.select('*').from('users').where('firebase_user_id', verifisert.payload.sub)

    if (user.length === 1) {
        res.status(200).json(user[0])
        return
    }

    const nyBruker = await knex
        .insert({
            name: verifisert.payload.name,
            email: verifisert.payload.email,
            picture: verifisert.payload.picture,
            firebase_user_id: verifisert.payload.sub,
            admin: false,
            active: true,
        })
        .into('users')
        .returning('*')

    const matchIds = await knex.select('id').from('matches')

    const userBets = []

    for (let i = 0; i < matchIds.length; i++) {
        userBets.push({ user_id: nyBruker[0].id + '', match_id: matchIds[i].id + '' })
    }

    await knex('bets').insert(userBets)

    res.status(200).json(nyBruker[0])
}
