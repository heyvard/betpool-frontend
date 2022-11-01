import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import { Bet } from '../../types/types'
import dayjs from 'dayjs'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { UseMutateBet } from '../../queries/mutateBet'
import LoadingButton from '@mui/lab/LoadingButton'

export const BetView = ({ bet }: { bet: Bet }) => {
    const numberPropTilString = (prop: number | null) => {
        if (prop == null) {
            return ''
        }
        return `${prop}`
    }

    let hjemmescoreProp = numberPropTilString(bet.home_score)
    const [hjemmescore, setHjemmescore] = useState<string>(hjemmescoreProp)
    let bortescoreProp = numberPropTilString(bet.away_score)
    const [bortescore, setBortescore] = useState<string>(bortescoreProp)
    const [nyligLagret, setNyliglagret] = useState(false)
    const kampstart = dayjs(bet.game_start)

    const lagreCb = () => {
        setNyliglagret(true)
        setTimeout(() => {
            setNyliglagret(false)
        }, 2000)
    }

    const stringTilNumber = (prop: string): number | null => {
        if (prop == '') {
            return null
        }
        return Number(prop!)
    }

    const { mutate, isLoading } = UseMutateBet(
        bet.bet_id,
        stringTilNumber(hjemmescore),
        stringTilNumber(bortescore),
        lagreCb,
    )

    const disabled = kampstart.isBefore(dayjs())
    const lagreknappSynlig = (hjemmescore !== hjemmescoreProp || bortescore !== bortescoreProp) && !nyligLagret
    return (
        <Card sx={{ mt: 1 }}>
            <CardContent>
                {kampstart.toString()}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={100}> {fixLand(bet.home_team)}</Typography>
                    <TextField
                        type="text"
                        disabled={disabled}
                        error={lagreknappSynlig}
                        variant="standard"
                        inputProps={{
                            inputmode: 'numeric',
                            pattern: '[0-9]*',
                        }}
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
                        type={'text'}
                        disabled={disabled}
                        variant="standard"
                        inputProps={{
                            inputmode: 'numeric',
                            pattern: '[0-9]*',
                        }}
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
                                setBortescore('')
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
