import { getKnex } from '../../../knex'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const knex = getKnex()
    const matches = await knex('matches')
    res.status(200).json(matches)
}
