export interface LeaderboardLinje {
    picture?: string
    name: string
    userid: string
    score: number
}

export interface Bet {
    game_start: string
    away_team: string
    home_team: string
    home_score?: number
    away_score?: number
    match_id: string
    bet_id: string
    channel: string
}

export interface Chat {
    message: string
    id: string
    created_at: string
    name: string
    picture: string
}
