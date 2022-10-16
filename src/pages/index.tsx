import type { NextPage } from 'next'
import Head from 'next/head'

import { Box, Typography } from '@mui/material'
import { UseUser } from '../queries/useUser'

const Home: NextPage = () => {
    const { data } = UseUser()
    console.log(data)
    return (
        <>
            <Head>
                <title>Betpool 2022</title>
            </Head>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography variant="h4" component="h2">
                    Hei {data?.name}
                </Typography>
            </Box>
        </>
    )
}

export default Home
