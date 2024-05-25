import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import { Bet } from '../../types/types'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { UseMutateBet } from '../../queries/mutateBet'
import { hentFlag, hentNorsk } from '../../utils/lag'
import NextLink from 'next/link'
import { rundeTilTekst } from '../../utils/rundeTilTekst'
import { Button, Link } from '@navikt/ds-react'
import { FloppydiskIcon } from '@navikt/aksel-icons'

export const BetView = ({ bet, matchside }: { bet: Bet; matchside: boolean }) => {
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

    const { mutate, isPending } = UseMutateBet(
        bet.bet_id,
        stringTilNumber(hjemmescore),
        stringTilNumber(bortescore),
        lagreCb,
    )

    const disabled = kampstart.isBefore(dayjs())
    const lagreknappSynlig = (hjemmescore !== hjemmescoreProp || bortescore !== bortescoreProp) && !nyligLagret
    const selectAllFocus = (e: any) => {
        e.target.select()
    }
    return (
        <Card sx={{ mt: 1 }}>
            <CardContent>
                {kampstart.format('ddd, D MMM  HH:mm')}
                <br />
                {rundeTilTekst(bet.round)}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={140}> {fixLand(bet.home_team)}</Typography>
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
                        onFocus={selectAllFocus}
                        onChange={(e) => {
                            if (!e.currentTarget.value) {
                                setHjemmescore('')
                                return
                            }
                            const number = Number(e.currentTarget.value)
                            if (number >= 0 && number <= 99) {
                                setHjemmescore(String(number))
                            }
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={140}> {fixLand(bet.away_team)}</Typography>

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
                        onFocus={selectAllFocus}
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
                    <Button
                        size={'small'}
                        className={'mt-2'}
                        onClick={() => {
                            mutate()
                        }}
                        loading={isPending}
                        icon={<FloppydiskIcon />}
                    >
                        Lagre
                    </Button>
                )}
                {disabled && !matchside && (
                    <NextLink href={'/match/' + bet.match_id}>
                        <Link>Se alles bets på denne kampen</Link>
                    </NextLink>
                )}
            </CardContent>
        </Card>
    )
}

export function fixLand(s: string): string {
    return hentFlag(s) + ' ' + hentNorsk(s)
}
