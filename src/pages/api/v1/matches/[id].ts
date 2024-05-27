import { ApiHandlerOpts } from '../../../../types/apiHandlerOpts'
import { auth } from '../../../../auth/authHandler'

const handler = async function handler(opts: ApiHandlerOpts): Promise<void> {
    const { user, res, req, client } = opts

    if (!user) {
        res.status(401)
        return
    }

    if (!user.scoreadmin) {
        res.status(403)
        return
    }

    const { id } = req.query

    const reqBody = JSON.parse(req.body)

    if (typeof reqBody.home_score !== 'undefined') {
        await client.query(
            `
          UPDATE matches
          SET home_score = $1
          WHERE id = $2;
      `,
            [reqBody.home_score, id],
        )
    }

    if (typeof reqBody.away_score !== 'undefined') {
        await client.query(
            `
          UPDATE matches
          SET away_score = $1
          WHERE id = $2;
      `,
            [reqBody.away_score, id],
        )
    }

    if (typeof reqBody.home_team !== 'undefined') {
        await client.query(
            `
          UPDATE matches
          SET home_team = $1
          WHERE id = $2;
      `,
            [reqBody.home_team, id],
        )
    }

    if (typeof reqBody.away_team !== 'undefined') {
        await client.query(
            `
          UPDATE matches
          SET away_team = $1
          WHERE id = $2;
      `,
            [reqBody.away_team, id],
        )
    }

    res.status(200).json({ ok: 123 })
}
export default auth(handler)
