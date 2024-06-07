import type { NextPage } from 'next'

import { Spinner } from '../components/loading/Spinner'
import { UseAllBets } from '../queries/useAllBetsExtended'
import NextLink from 'next/link'
import { calculateLeaderboard } from '../components/results/calculateAllScores'
import { BodyShort, Link, Table } from '@navikt/ds-react'
import classNames from 'classnames'

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
    const lista = calculateLeaderboard(data.bets, data.users)
    lista.sort((a, b) => b.poeng - a.poeng)

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell align="center">Plass</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Navn</Table.HeaderCell>
                        <Table.HeaderCell align="right">Poeng</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {lista.map((row, i) => {
                        const user = data.users.find((a) => a.id == row.userid)
                        if (!user) {
                            return null
                        }
                        return (
                            <Table.Row key={row.userid}>
                                <Table.DataCell align="center">
                                    <BodyShort className={'text-5xl'}>{plassVisning(i + 1)}</BodyShort>
                                </Table.DataCell>
                                <Table.DataCell align="left">
                                    <NextLink href={'/user/' + user?.id}>
                                        <Avatar src={user?.picture} name={user?.name} />
                                    </NextLink>
                                </Table.DataCell>
                                <Table.DataCell>
                                    <NextLink href={'/user/' + user?.id}>
                                        <Link>{user?.name}</Link>
                                    </NextLink>
                                </Table.DataCell>
                                <Table.DataCell align="right">{row.poeng.toFixed(0)}</Table.DataCell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </>
    )
}

interface AvatarProps {
    src?: string | null
    name?: string
    size?: 'small' | 'medium' | 'large'
}

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'medium' }) => {
    const getInitials = (name: string) => {
        return name.charAt(0).toUpperCase()
    }

    const sizeClasses = {
        small: 'w-8 h-8 text-sm',
        medium: 'w-12 h-12 text-lg',
        large: 'w-16 h-16 text-xl',
    }

    return (
        <div className={classNames('flex items-center justify-center bg-gray-200 rounded-full', sizeClasses[size])}>
            {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={name} className="rounded-full w-full h-full object-cover" />
            ) : (
                <span className="text-white bg-blue-500 rounded-full w-full h-full flex items-center justify-center">
                    {name ? getInitials(name) : ''}
                </span>
            )}
        </div>
    )
}
export default Leaderboard
