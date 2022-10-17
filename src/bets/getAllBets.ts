import { getKnex } from '../knex'

export async function getAllBets() {
    return (
        await getKnex().raw(`
        SELECT u.id         userid,
               u.name,
               b.match_id,
               m.game_start,
               m.away_team,
               m.home_team,
               b.home_score,
               b.away_score,
               m.type,
               m.home_score home_result,
               m.away_score away_result
        FROM bets b,
             matches m,
             users u
        WHERE b.user_id = u.id
          AND b.match_id = m.id
          AND game_start < now();`)
    ).rows
}
