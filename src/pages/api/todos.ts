import { getKnex } from '../../knex'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const knex = getKnex()
    const todos = await knex('todos')
    res.status(200).json(todos)
}
