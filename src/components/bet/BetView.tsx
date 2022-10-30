import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import { Bet } from '../../types/types'
import dayjs from 'dayjs'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { UseMutateBet } from '../../queries/mutateBet'
import LoadingButton from '@mui/lab/LoadingButton'

export const BetView = ({ bet }: { bet: Bet }) => {
    const [hjemmescore, setHjemmescore] = useState<string>(bet.home_score + '')
    const [bortescore, setBortescore] = useState<string>(bet.away_score + '')
    const [nyligLagret, setNyliglagret] = useState(false)
    const kampstart = dayjs(bet.game_start)

    const lagreCb = () => {
        setNyliglagret(true)
        setTimeout(() => {
            setNyliglagret(false)
        }, 2000)
    }

    const { mutate, isLoading } = UseMutateBet(bet.bet_id, Number(hjemmescore!), Number(bortescore!), lagreCb)

    const disabled = kampstart.isBefore(dayjs())
    const lagreknappSynlig = (hjemmescore !== bet.home_score + '' || bortescore !== bet.away_score + '') && !nyligLagret
    return (
        <Card sx={{ mt: 1 }}>
            <CardContent>
                {kampstart.toString()}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={100}> {fixLand(bet.home_team)}</Typography>
                    <TextField
                        type={'number'}
                        disabled={disabled}
                        error={lagreknappSynlig}
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
                                setHjemmescore('')
                                return
                            }
                            const number = Number(e.currentTarget.value)
                            if (number >= 0 && number <= 99) {
                                console.log('Setter number', number)
                                setHjemmescore(String(number))
                            }
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
                        error={lagreknappSynlig}
                        sx={{ width: 40 }}
                        value={bortescore}
                        onChange={(e) => {
                            if (!e.currentTarget.value) {
                                setBortescore('undefined')
                                return
                            }
                            const number = Number(e.currentTarget.value)
                            if (number >= 0 && number <= 99) {
                                setBortescore(String(number))
                            }
                        }}
                    />
                </Box>
                {lagreknappSynlig && (
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
