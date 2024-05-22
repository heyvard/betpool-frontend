import type { NextPage } from 'next'

import { UseUser } from '../queries/useUser'
import { Spinner } from '../components/loading/Spinner'
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQueryClient } from 'react-query'
import { UseStats } from '../queries/useStats'
import { alleLagSortert } from '../utils/lag'
import { UseMatches } from '../queries/useMatches'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import { fixLand } from '../components/bet/BetView'
import { getFirebaseAuth } from '../auth/clientApp'
import { Alert, Button, LinkPanel } from '@navikt/ds-react'
import { FloppydiskIcon } from '@navikt/aksel-icons'

const Home: NextPage = () => {
    const { data: megselv } = UseUser()
    const [user] = useAuthState(getFirebaseAuth())
    const [lagrer, setLagrer] = useState(false)
    const queryClient = useQueryClient()
    const { data: stats } = UseStats()
    const [topscorer, setTopscorer] = useState(megselv?.topscorer)
    const { data: matches, isLoading: isLoading2 } = UseMatches()

    if (!matches || isLoading2) {
        return <Spinner />
    }
    if (!megselv || !stats) {
        return <Spinner></Spinner>
    }
    const kanEndres = dayjs(
        matches
            .sort((a, b) => {
                return dayjs(a.game_start).diff(dayjs(b.game_start))
            })
            .find((a) => {
                return a.round == '2'
            })!.game_start,
    )

    const kamper = matches.filter((a) => {
        return dayjs(a.game_start).isAfter(dayjs().subtract(2, 'hours')) && dayjs(a.game_start).isBefore(dayjs())
    })
    const snartKamper = matches.filter((a) => {
        return dayjs(a.game_start).isAfter(dayjs()) && dayjs(a.game_start).isBefore(dayjs().add(2, 'hours'))
    })
    return (
        <div className={'space-y-2'}>
            {kamper.map((k) => {
                return (
                    <div key={k.id}>
                        <NextLink href={'/match/' + k.id}>
                            <LinkPanel className={'rounded-xl'}>
                                Nå pågår {fixLand(k.home_team)} vs {fixLand(k.away_team)}
                            </LinkPanel>
                        </NextLink>
                    </div>
                )
            })}
            {snartKamper.map((k) => {
                return (
                    <div key={k.id}>
                        <NextLink href={'/my-bets/'}>
                            <LinkPanel className={'rounded-xl'}>
                                {fixLand(k.home_team)} vs {fixLand(k.away_team)} starter kl{' '}
                                {dayjs(k.game_start).format('HH:mm')}
                            </LinkPanel>
                        </NextLink>
                    </div>
                )
            })}
            {kanEndres.isAfter(dayjs()) && (
                <Alert variant={'info'} className={'rounded-xl'}>
                    Vinner og toppscorer kan endres frem til {kanEndres.format('ddd, D MMM  kl HH:mm')}
                </Alert>
            )}
            {!megselv.paid && (
                <Alert variant={'warning'} className={'rounded-xl'}>
                    Din innbetaling er ikke registrert ennå. Om du ikke har vippset, må du gjøre det innen første
                    runde/kamp?
                </Alert>
            )}

            <Card sx={{ mt: 1 }}>
                <CardContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Hvem vinner VM?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            disabled={lagrer || kanEndres.isBefore(dayjs())}
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
                            disabled={kanEndres.isBefore(dayjs())}
                            value={topscorer}
                            onChange={(e) => {
                                setTopscorer(e.target.value)
                            }}
                        />
                        {topscorer != megselv.topscorer && (
                            <Button
                                className={'mt-4'}
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
                                icon={<FloppydiskIcon />}
                            >
                                Lagre
                            </Button>
                        )}
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home
