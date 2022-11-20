import type { NextPage } from 'next'

import { Container } from '@mui/system'
import { BetView } from '../../components/bet/BetView'
import { Spinner } from '../../components/loading/Spinner'
import { useRouter } from 'next/router'
import { UseAllBets } from '../../queries/useAllBets'
import { Typography } from '@mui/material'
import React from 'react'

const Home: NextPage = () => {
    const { data, isLoading } = UseAllBets()

    const router = useRouter()
    const { id } = router.query
    if (!data || isLoading) {
        return <Spinner />
    }
    const stringTilNumber = (prop: string | null): number | null => {
        if (prop == '') {
            return null
        }
        if (!prop) {
            return null
        }
        return Number(prop!)
    }

    const match = data.bets.find((a) => a.match_id == id)!

    return (
        <>
            <Container maxWidth="md" sx={{ mt: 1 }}>
                <Typography variant="h4" component="h1" align={'center'}>
                    {match.home_team} vs {match.away_team}
                </Typography>
                <Typography variant="h6" component="h2" align={'center'}>
                    {match.home_result} - {match.away_result}
                </Typography>
                {data.bets
                    .filter((a) => a.match_id == id)
                    .map((a) => {
                        return {
                            bet_id: a.match_id + a.user_id,
                            game_start: a.game_start,
                            away_team: a.away_team,
                            home_team: a.home_team,
                            home_score: stringTilNumber(a.home_score),
                            away_score: stringTilNumber(a.away_score),
                            match_id: a.match_id,
                            user: data.users.find((u) => u.id == a.user_id)!,
                        }
                    })
                    .filter((a) => a.user)

                    .sort((b, a) => b.user.name.localeCompare(a.user.name))

                    .map((a) => (
                        <>
                            <h4>{a.user.name}</h4>
                            <BetView key={a.bet_id} bet={a} matchside={true} />
                        </>
                    ))}
            </Container>
        </>
    )
}

export default Home
