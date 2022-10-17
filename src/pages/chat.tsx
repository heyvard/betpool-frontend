import type { NextPage } from 'next'
import Head from 'next/head'

import { Box, Typography } from '@mui/material'

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography variant="h4" component="h2">
                    Chat!
                </Typography>
            </Box>
        </>
    )
}

export default Home
