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

const Home: NextPage = () => {
    const { data: megselv } = UseUser()
    const [user] = useAuthState(firebase.auth())
    const [lagrer, setLagrer] = useState(false)
    const queryClient = useQueryClient()

    if (!megselv) {
        return <Spinner></Spinner>
    }

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
                                        await queryClient.invalidateQueries('user-me')
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
            </Container>
        </>
    )
}

export default Home
