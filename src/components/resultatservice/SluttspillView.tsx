import { Box, Card, CardContent, MenuItem, Select } from '@mui/material'
import { Match } from '../../types/types'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { alleLagSortert } from '../../utils/lag'
import { useAuthState } from 'react-firebase-hooks/auth'
import { rundeTilTekst } from '../../utils/rundeTilTekst'
import { getFirebaseAuth } from '../../auth/clientApp'
import { useQueryClient } from '@tanstack/react-query'

export const SluttspillView = ({ match }: { match: Match }) => {
    const kampstart = dayjs(match.game_start)

    const [lagrer, setLagrer] = useState(false)
    const [user] = useAuthState(getFirebaseAuth())
    const queryClient = useQueryClient()

    function endreHjemmelag(lag: 'home_team' | 'away_team') {
        return (
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Select
                    labelId="demo-simple-select-label"
                    disabled={lagrer}
                    id="demo-simple-select"
                    value={match[lag]}
                    label="Hvem winner VM?"
                    onChange={async (e) => {
                        try {
                            setLagrer(true)
                            const idtoken = await user?.getIdToken()
                            const value = {} as Record<string, string>
                            value[lag] = e.target.value
                            const responsePromise = await fetch(`/api/v1/matches/${match.id}`, {
                                method: 'PUT',
                                body: JSON.stringify(value),
                                headers: { Authorization: `Bearer ${idtoken}` },
                            })
                            if (!responsePromise.ok) {
                                window.alert('oops, feil ved lagring')
                            }
                            queryClient.invalidateQueries({ queryKey: ['matches'] }).then()
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
            </Box>
        )
    }

    return (
        <Card sx={{ mt: 1 }}>
            <CardContent>
                {kampstart.format('ddd, D MMM  HH:mm')}
                <br />
                {rundeTilTekst(match.round)}
                {endreHjemmelag('home_team')}
                {endreHjemmelag('away_team')}
            </CardContent>
        </Card>
    )
}
