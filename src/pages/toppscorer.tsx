import type { NextPage } from 'next'

import { Spinner } from '../components/loading/Spinner'
import { UseAllBets } from '../queries/useAllBets'
import NextLink from 'next/link'
import { Link, Table } from '@navikt/ds-react'

const Leaderboard: NextPage = () => {
    const { data, isLoading } = UseAllBets()
    if (!data || isLoading) {
        return <Spinner />
    }

    data.users.sort((a, b) => a.topscorer?.localeCompare(b.topscorer || '') || 0)

    return (
        <Table size={'small'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Navn</Table.HeaderCell>
                    <Table.HeaderCell>Toppscorer</Table.HeaderCell>
                    <Table.HeaderCell align="right">Poeng</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.users.map((user, i) => {
                    return (
                        <Table.Row key={i}>
                            <Table.DataCell>
                                <NextLink href={'/user/' + user?.id}>
                                    <Link>{user?.name}</Link>
                                </NextLink>
                            </Table.DataCell>
                            <Table.DataCell>{user.topscorer}</Table.DataCell>
                            <Table.DataCell align="right">{user.topscorerPoints}</Table.DataCell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}

export default Leaderboard
