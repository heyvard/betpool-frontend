import type { NextPage } from 'next'
import { Spinner } from '../components/loading/Spinner'
import React from 'react'
import { BodyShort, Heading, Switch } from '@navikt/ds-react'
import { UseUsers } from '../queries/useUsers'
import { UseMutateUser } from '../queries/mutateUser'
import { UseUser } from '../queries/useUser'
import { UserForAdmin } from '../types/types'
import { User } from '../types/user'

function BrukerView({ me, user }: { user: UserForAdmin; me: User }) {
    const { mutate, isPending } = UseMutateUser(user.id)

    return (
        <div key={user.id} className={' py-4'}>
            <BodyShort spacing>{user.name}</BodyShort>
            <div>
                <Switch
                    checked={user.paid}
                    size={'small'}
                    loading={isPending}
                    onChange={() =>
                        mutate({
                            request: { paid: !user.paid },
                        })
                    }
                >
                    Betalt
                </Switch>
                {me.superadmin && (
                    <>
                        <Switch
                            checked={user.scoreadmin}
                            loading={isPending}
                            size={'small'}
                            onChange={() =>
                                mutate({
                                    request: { scoreadmin: !user.scoreadmin },
                                })
                            }
                        >
                            Scoreadmin
                        </Switch>
                        <Switch
                            checked={user.paymentadmin}
                            loading={isPending}
                            size={'small'}
                            onChange={() =>
                                mutate({
                                    request: { paymentadmin: !user.paymentadmin },
                                })
                            }
                        >
                            Paymentadmin
                        </Switch>
                        <Switch
                            checked={user.active}
                            loading={isPending}
                            size={'small'}
                            onChange={() =>
                                mutate({
                                    request: { active: !user.active },
                                })
                            }
                        >
                            Aktiv
                        </Switch>
                    </>
                )}
            </div>
        </div>
    )
}

const Brukere: NextPage = () => {
    const { data } = UseUsers()

    const { data: me } = UseUser()

    if (!data || !me) {
        return <Spinner />
    }

    return (
        <>
            <Heading size="small" level={'1'} spacing>
                Brukere
            </Heading>

            <div className={'divide-y divide-gray-200 space-y-5'}>
                {data.map((user) => (
                    <BrukerView key={user.id} user={user} me={me} />
                ))}
            </div>
        </>
    )
}

export default Brukere
