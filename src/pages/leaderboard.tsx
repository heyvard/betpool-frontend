import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Spinner } from '../components/loading/Spinner'
import { UseAllBets } from '../queries/useAllBets'
import Link from 'next/link'
import { regnUtScoreForKamp } from '../components/results/matchScoreCalculator'
import { calculateLeaderboard } from '../components/results/calculateAllScores'
import { default as MUILink } from '@mui/material/Link'

function plassVisning(plass: number) {
    switch (plass) {
        case 1:
            return '🥇'
        case 2:
            return '🥈'
        case 3:
            return '🥉'
    }
    return plass
}

const Leaderboard: NextPage = () => {
    const { data, isLoading } = UseAllBets()
    if (!data || isLoading) {
        return <Spinner />
    }
    let scoreForKamp = regnUtScoreForKamp(data.bets)
    const lista = calculateLeaderboard(data.bets, scoreForKamp)
    lista.sort((a, b) => b.poeng - a.poeng)

    return (
        <>
            <Head>
                <title>Leaderboard</title>
            </Head>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Container maxWidth="md">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Plass</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Navn</TableCell>
                                    <TableCell align="right">Poeng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lista.map((row, i) => {
                                    const user = data.users.find((a) => a.id == row.userid)
                                    if (!user) {
                                        return null
                                    }
                                    return (
                                        <TableRow
                                            key={row.userid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">
                                                <Typography variant="h2"> {plassVisning(i + 1)}</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                {user?.picture && (
                                                    <Image
                                                        src={user?.picture}
                                                        alt={user?.name}
                                                        width={'40vw'}
                                                        height={'40vw'}
                                                    />
                                                )}
                                                {!user?.picture && <Typography variant="h2">😄</Typography>}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <Link href={'/user/' + user?.id}>
                                                    <MUILink underline={'hover'} sx={{ cursor: 'pointer' }}>
                                                        {user?.name}
                                                    </MUILink>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">{row.poeng}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </>
    )
}

export default Leaderboard
