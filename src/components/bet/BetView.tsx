import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Bet } from '../../types/types'
import dayjs from 'dayjs'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { useQueryClient } from 'react-query'

export const BetView = ({ bet }: { bet: Bet }) => {
    const [hjemmescore, setHjemmescore] = useState<number | undefined>(bet.home_score)
    const [bortescore, setBortescore] = useState<number | undefined>(bet.away_score)

    const kampstart = dayjs(bet.game_start)
    const queryClient = useQueryClient()

    const disabled = kampstart.isBefore(dayjs())
    const lagreknapp = hjemmescore !== bet.home_score || bortescore !== bet.away_score

    return (
        <Card sx={{ mt: 1 }}>
            <CardContent>
                {kampstart.toString()}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={100}> {fixLand(bet.home_team)}</Typography>
                    <TextField
                        type={'number'}
                        disabled={disabled}
                        variant="standard"
                        sx={{ width: 40 }}
                        value={hjemmescore}
                        onChange={(e) => {
                            if (!e.currentTarget.value) {
                                setHjemmescore(undefined)
                                return
                            }
                            setHjemmescore(Number(e.currentTarget.value))
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={100}> {fixLand(bet.away_team)}</Typography>

                    <TextField
                        type={'number'}
                        disabled={disabled}
                        variant="standard"
                        sx={{ width: 40 }}
                        value={bortescore}
                        onChange={(e) => {
                            if (!e.currentTarget.value) {
                                setBortescore(undefined)
                                return
                            }
                            setBortescore(Number(e.currentTarget.value))
                        }}
                    />
                </Box>
                {lagreknapp && (
                    <Button
                        variant="contained"
                        onClick={() => {
                            queryClient.invalidateQueries(['my-bets']).then()
                        }}
                        endIcon={<SaveIcon />}
                    >
                        Lagre
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

function fixLand(s: string): string {
    const split = s.split(' ')
    if (split.length == 2) {
        return split[1] + ' ' + split[0]
    }
    return s
}
