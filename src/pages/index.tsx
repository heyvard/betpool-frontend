import type { NextPage } from 'next'

import { Container } from '@mui/system'
import { UseUser } from '../queries/useUser'
import { Spinner } from '../components/loading/Spinner'
import {
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { useQueryClient } from 'react-query'
import { UseStats } from '../queries/useStats'

const Home: NextPage = () => {
    const { data: megselv } = UseUser()
    const [user] = useAuthState(firebase.auth())
    const [lagrer, setLagrer] = useState(false)
    const queryClient = useQueryClient()
    const { data: stats } = UseStats()
    if (!megselv || !stats) {
        return <Spinner></Spinner>
    }

    const charity = stats.map((a) => (a.charity / 100.0) * 300).reduce((partialSum, a) => partialSum + a, 0)
    const pot = stats.length * 300 - charity

    return (
        <>
            <Container maxWidth="md" sx={{ mt: 1 }}>
                <Typography variant="h4" component="h1" align={'center'}>
                    Hei {megselv.name} 👋
                </Typography>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <FormControl disabled={lagrer}>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                                Prosent av ditt innskudd til amnesty
                            </FormLabel>
                            <RadioGroup
                                row
                                value={megselv.charity}
                                onChange={async (e) => {
                                    try {
                                        setLagrer(true)
                                        console.log(e)
                                        const idtoken = await user?.getIdToken()
                                        const responsePromise = await fetch(
                                            `https://betpool-2022-backend.vercel.app/api/v1/me/`,
                                            {
                                                method: 'PUT',
                                                body: JSON.stringify({ charity: Number(e.target.value) }),
                                                headers: { Authorization: `Bearer ${idtoken}` },
                                            },
                                        )
                                        if (!responsePromise.ok) {
                                            window.alert('oops, feil ved lagring')
                                        }
                                        queryClient.invalidateQueries('user-me').then()
                                        queryClient.invalidateQueries('stats').then()
                                    } finally {
                                        setLagrer(false)
                                    }
                                }}
                            >
                                <FormControlLabel value={10} control={<Radio />} label="10%" />
                                <FormControlLabel value={25} control={<Radio />} label="25%" />
                                <FormControlLabel value={50} control={<Radio />} label="50%" />
                                <FormControlLabel value={75} control={<Radio />} label="75%" />
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </Card>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="h4" component="h4" align={'center'}>
                            Totalt innskudd:
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="h5" component="h5" align={'center'}>
                            {charity} kr til amnesty
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="h5" component="h5" align={'center'}>
                            {pot} kr i premiepenger
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default Home
