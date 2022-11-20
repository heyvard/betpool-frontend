import type { NextPage } from 'next'

import { Container } from '@mui/system'
import { BetView } from '../../components/bet/BetView'
import { Spinner } from '../../components/loading/Spinner'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { UseAllBets } from '../../queries/useAllBetsExtended'
import { Typography } from '@mui/material'
import React from 'react'
import { Bet } from '../../types/types'

const Home: NextPage = () => {
    const { data, isLoading } = UseAllBets()

    const router = useRouter()
    const { id } = router.query
    if (!data || isLoading) {
        return <Spinner />
    }
    const user = data.users.find((a) => a.id == id)!
    const stringTilNumber = (prop: string | null): number | null => {
        if (prop == '') {
            return null
        }
        if (!prop) {
            return null
        }
        return Number(prop!)
    }
    return (
        <>
            <Container maxWidth="md" sx={{ mt: 1 }}>
                <Typography variant="h4" component="h1" align={'center'}>
                    {user.name} sine bets
                </Typography>
                {data.bets
                    .filter((a) => a.user_id == id)
                    .sort((b, a) => dayjs(a.game_start).unix() - dayjs(b.game_start).unix())
                    .map((a) => {
                        return {
                            bet_id: a.match_id + a.user_id,
                            game_start: a.game_start,
                            away_team: a.away_team,
                            home_team: a.home_team,
                            home_score: stringTilNumber(a.home_score),
                            away_score: stringTilNumber(a.away_score),
                            match_id: a.match_id,
                        } as Bet
                    })
                    .map((a) => (
                        <BetView key={a.bet_id} bet={a} matchside={false} />
                    ))}
            </Container>
        </>
    )
}

export default Home
