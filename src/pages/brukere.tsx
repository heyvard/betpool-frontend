import type { NextPage } from 'next'
import { Spinner } from '../components/loading/Spinner'
import React from 'react'
import { Button, Heading, Table } from '@navikt/ds-react'
import { UseUsers } from '../queries/useUsers'

const Brukere: NextPage = () => {
    const { data } = UseUsers()
    if (!data) {
        return <Spinner />
    }

    return (
        <>
            <Heading size="small" level={'1'} spacing>
                Brukere
            </Heading>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Navn</Table.HeaderCell>
                        <Table.HeaderCell align="right"></Table.HeaderCell>
                        <Table.HeaderCell align="right">Admin</Table.HeaderCell>
                        <Table.HeaderCell align="right">Betalt</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((user) => (
                        <Table.Row key={user.id}>
                            <Table.DataCell>{user.name}</Table.DataCell>
                            <Table.DataCell>
                                {user.active && (
                                    <Button type={'button'} variant={'danger'} size={'xsmall'}>
                                        Deaktiver
                                    </Button>
                                )}
                                {!user.active && (
                                    <Button type={'button'} variant={'secondary'} size={'xsmall'}>
                                        Aktiver
                                    </Button>
                                )}
                            </Table.DataCell>
                            <Table.DataCell align="right">{user.admin ? 'Ja' : 'Nei'}</Table.DataCell>
                            <Table.DataCell align="right">{user.paid ? 'Ja' : 'Nei'}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}

export default Brukere
