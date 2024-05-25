import type { NextPage } from 'next'
import { Spinner } from '../components/loading/Spinner'
import React from 'react'
import { Button, Heading, Switch, Table } from '@navikt/ds-react'
import { UseUsers } from '../queries/useUsers'
import { UseMutateUser } from '../queries/mutateUser'

const Brukere: NextPage = () => {
    const { data } = UseUsers()
    const { mutate, isPending } = UseMutateUser()

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
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((user) => (
                        <Table.Row key={user.id}>
                            <Table.DataCell>{user.name}</Table.DataCell>
                            <Table.DataCell>
                                {user.active && (
                                    <Button
                                        type={'button'}
                                        variant={'danger'}
                                        loading={isPending}

                                        size={'xsmall'}
                                        onClick={() =>
                                            mutate({
                                                id: user.id,
                                                request: { active: false },
                                            })
                                        }
                                    >
                                        Deaktiver
                                    </Button>
                                )}
                                {!user.active && (
                                    <Button
                                        type={'button'}
                                        variant={'secondary'}
                                        loading={isPending}

                                        size={'xsmall'}
                                        onClick={() =>
                                            mutate({
                                                id: user.id,
                                                request: { active: true },
                                            })
                                        }
                                    >
                                        Aktiver
                                    </Button>
                                )}
                            </Table.DataCell>
                            <Table.DataCell>
                                <Switch
                                    checked={user.admin}
                                    loading={isPending}

                                    onChange={() =>
                                        mutate({
                                            id: user.id,
                                            request: { admin: !user.admin },
                                        })
                                    }
                                >
                                    Admin
                                </Switch>
                            </Table.DataCell>
                            <Table.DataCell align="right">
                                <Switch
                                    checked={user.paid}
                                    loading={isPending}
                                    onChange={() =>
                                        mutate({
                                            id: user.id,
                                            request: { paid: !user.paid },
                                        })
                                    }
                                >
                                    Betalt
                                </Switch>
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}

export default Brukere
