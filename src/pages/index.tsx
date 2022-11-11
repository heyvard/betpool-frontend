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
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { useQueryClient } from 'react-query'
import { UseStats } from '../queries/useStats'
import { alleLag } from '../utils/lag'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'

const Home: NextPage = () => {
    const { data: megselv } = UseUser()
    const [user] = useAuthState(firebase.auth())
    const [lagrer, setLagrer] = useState(false)
    const queryClient = useQueryClient()
    const { data: stats } = UseStats()
    const [topscorer, setTopscorer] = useState(megselv?.topscorer)

    if (!megselv || !stats) {
        return <Spinner></Spinner>
    }
    const alleLagSortert = alleLag.sort((a, b) => a.norsk.localeCompare(b.norsk))

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
                                Andel av dine 300kr til Amnesty
                            </FormLabel>
                            <RadioGroup
                                row
                                value={megselv.charity}
                                onChange={async (e) => {
                                    try {
                                        setLagrer(true)
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
                            Totalt innskudd fra alle
                        </Typography>
                        <Typography variant="h5" component="h5" align={'center'}>
                            {stats.charity} kr til Amnesty 🫴
                        </Typography>
                        <Typography variant="h5" component="h5" align={'center'}>
                            {stats.pot} kr i premiepenger 💰
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Hvem vinner VM?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                disabled={lagrer}
                                id="demo-simple-select"
                                value={megselv.winner}
                                label="Hvem winner VM?"
                                onChange={async (e) => {
                                    try {
                                        setLagrer(true)
                                        const idtoken = await user?.getIdToken()
                                        const responsePromise = await fetch(
                                            `https://betpool-2022-backend.vercel.app/api/v1/me/`,
                                            {
                                                method: 'PUT',
                                                body: JSON.stringify({ winner: e.target.value }),
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
                                {alleLagSortert.map((l) => {
                                    return (
                                        <MenuItem key={l.engelsk} value={l.engelsk}>
                                            {l.flagg + ' ' + l.norsk}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-required"
                                label="Hvilken spiller scorer flest mål?"
                                value={topscorer}
                                onChange={(e) => {
                                    setTopscorer(e.target.value)
                                }}
                            />
                            {topscorer != megselv.topscorer && (
                                <LoadingButton
                                    sx={{ mt: 2 }}
                                    variant="contained"
                                    onClick={async () => {
                                        try {
                                            setLagrer(true)
                                            const idtoken = await user?.getIdToken()
                                            const responsePromise = await fetch(
                                                `https://betpool-2022-backend.vercel.app/api/v1/me/`,
                                                {
                                                    method: 'PUT',
                                                    body: JSON.stringify({ topscorer: topscorer }),
                                                    headers: { Authorization: `Bearer ${idtoken}` },
                                                },
                                            )
                                            if (!responsePromise.ok) {
                                                window.alert('oops, feil ved lagring')
                                            }
                                            queryClient.invalidateQueries('user-me').then()
                                        } finally {
                                            setLagrer(false)
                                        }
                                    }}
                                    loading={lagrer}
                                    endIcon={<SaveIcon />}
                                >
                                    Lagre
                                </LoadingButton>
                            )}
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default Home
