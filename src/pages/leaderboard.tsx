import type { NextPage } from 'next'
import Head from 'next/head'

import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import { UseLeaderboard } from '../queries/useLeaderboard'
import { Container } from '@mui/system'

const Leaderboard: NextPage = () => {
    const { data, isLoading } = UseLeaderboard()
    if (!data || isLoading) {
        return <CircularProgress />
    }
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
                                    <TableCell>Plass</TableCell>
                                    <TableCell>Navn</TableCell>
                                    <TableCell align="right">Poeng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, i) => (
                                    <TableRow
                                        key={row.userid}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{i + 1}</TableCell>

                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </>
    )
}

export default Leaderboard
