import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import { Bet } from '../../types/types'
import dayjs from 'dayjs'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { UseMutateBet } from '../../queries/mutateBet'
import LoadingButton from '@mui/lab/LoadingButton'

export const BetView = ({ bet }: { bet: Bet }) => {
    const [hjemmescore, setHjemmescore] = useState<number | undefined>(bet.home_score)
    const [bortescore, setBortescore] = useState<number | undefined>(bet.away_score)

    const kampstart = dayjs(bet.game_start)

    const { mutate, isLoading } = UseMutateBet(bet.bet_id, hjemmescore!, bortescore!)

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
                        error={lagreknapp}
                        variant="standard"
                        InputProps={{
                            sx: {
                                '& input': {
                                    textAlign: 'center',
                                },
                            },
                        }}
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
                        InputProps={{
                            sx: {
                                '& input': {
                                    textAlign: 'center',
                                },
                            },
                        }}
                        error={lagreknapp}
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
                    <LoadingButton
                        sx={{ mt: 2 }}
                        variant="contained"
                        onClick={() => {
                            mutate()
                        }}
                        loading={isLoading}
                        endIcon={<SaveIcon />}
                    >
                        Lagre
                    </LoadingButton>
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
