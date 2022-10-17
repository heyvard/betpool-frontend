import type { NextPage } from 'next'
import Head from 'next/head'

import { Typography } from '@mui/material'
import { UseUser } from '../queries/useUser'
import { UseMyBets } from '../queries/useBets'
import { Container } from '@mui/system'
import { BetView } from '../components/bet/BetView'

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
                {myBets?.map((a) => (
                    <BetView key={a.bet_id} bet={a} />
                ))}
            </Container>
        </>
    )
}

export default Home
