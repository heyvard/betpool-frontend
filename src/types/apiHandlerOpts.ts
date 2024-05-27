import { NextApiRequest, NextApiResponse } from 'next'
import { JWTPayload } from 'jose'
import { PoolClient } from 'pg'

import { User } from './db'

export interface ApiHandlerOpts {
    req: NextApiRequest
    res: NextApiResponse
    jwtPayload: JWTPayload
    client: PoolClient
    user?: User
}
