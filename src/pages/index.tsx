import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../firebase/clientApp'
import { Box, Typography } from '@mui/material'

const Home: NextPage = () => {
    const [user] = useAuthState(firebase.auth())

    return (
        <>
            <Head>
                <title>Betpool 2022</title>
            </Head>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h4" component="h2">
                    Hei {user!.displayName}
                </Typography>
            </Box>
        </>
    )
}

export default Home
