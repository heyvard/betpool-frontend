import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import NextLink from 'next/link'
import { MatchBetMedScore } from '../../queries/useAllBetsExtended'
import { fixLand } from './BetView'
import { red, lime, green } from '@mui/material/colors'
import { rundeTilTekst } from '../../utils/rundeTilTekst'
import React from 'react'
import { Link } from '@navikt/ds-react'

export const PastBetView = ({ bet, matchside }: { bet: MatchBetMedScore; matchside: boolean }) => {
    const kampstart = dayjs(bet.game_start)
    const bg = () => {
        if (bet.riktigResultat) {
            return green[100]
        }
        if (bet.riktigUtfall) {
            return lime[100]
        }
        return red[100]
    }
    return (
        <Card sx={{ mt: 1, backgroundColor: bg() }}>
            <CardContent>
                {kampstart.format('ddd, D MMM  HH:mm')}
                <br />
                {rundeTilTekst(bet.round)}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={140}> {fixLand(bet.home_team)}</Typography>
                    <TextField
                        type="text"
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
                        value={bet.home_score}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={140}> {fixLand(bet.away_team)}</Typography>

                    <TextField
                        type={'text'}
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
                        value={bet.away_score}
                    />
                </Box>
                <Typography sx={{ mt: 1 }}>{bet.poeng} poeng</Typography>
                {!matchside && (
                    <NextLink href={'/match/' + bet.match_id}>
                        <Link>Se alles bets på denne kampen</Link>
                    </NextLink>
                )}
            </CardContent>
        </Card>
    )
}
