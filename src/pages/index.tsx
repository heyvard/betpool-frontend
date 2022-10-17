import type { NextPage } from 'next'
import Head from 'next/head'

import { Typography, Paper } from '@mui/material'
import { UseUser } from '../queries/useUser'
import { UseMyBets } from '../queries/useBets'
import { Container } from '@mui/system'

const Home: NextPage = () => {
    const { data } = UseUser()
    const { data: myBets } = UseMyBets()
    return (
        <>
            <Head>
                <title>Betpool 2022</title>
            </Head>
            <Container maxWidth="md">
                <Typography variant="h4" component="h2">
                    Hei {data?.name}
                </Typography>
                {myBets?.map((a: any) => {
                    return (
                        <Paper key={a.home_team}>
                            {a.home_team} - {a.away_team}
                        </Paper>
                    )
                })}
            </Container>
        </>
    )
}

export default Home
