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

    const disabled = user.id === me.id

    return (
        <div key={user.id} className={' py-4'}>
            <BodyShort spacing>{user.name}</BodyShort>
            <div className={'flex justify-between'}>
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
                <Switch
                    checked={user.admin}
                    loading={isPending}
                    disabled={disabled}
                    size={'small'}
                    onChange={() =>
                        mutate({
                            request: { admin: !user.admin },
                        })
                    }
                >
                    Admin
                </Switch>

                <Switch
                    checked={user.active}
                    loading={isPending}
                    size={'small'}
                    disabled={disabled}
                    onChange={() =>
                        mutate({
                            request: { active: !user.active },
                        })
                    }
                >
                    Aktiv
                </Switch>
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
