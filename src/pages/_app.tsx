import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SignInScreen } from '../components/SignIn'
import { Box, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UseUser } from '../queries/useUser'
import { useRouter } from 'next/router'
import { Spinner } from '../components/loading/Spinner'
import Head from 'next/head'

import '../styles/global.css'
import { getFirebaseAuth } from '../auth/clientApp'
import { Dropdown, InternalHeader } from '@navikt/ds-react'
import { HouseIcon } from '@navikt/aksel-icons'

function UserFetchInnlogging(props: { children: React.ReactNode }) {
    const { data: me, isLoading } = UseUser()
    const [user] = useAuthState(getFirebaseAuth())

    const router = useRouter()

    if (isLoading || !user || !me) {
        return <Spinner />
    }

    function FooterKnapp(props: { tekst: string; url: string }) {
        return (
            <InternalHeader.Button defaultChecked={true} type="button" onClick={() => router.push(props.url)}>
                <HouseIcon />
                {props.tekst}
            </InternalHeader.Button>
        )
    }

    return (
        <>
            {props.children}
            <InternalHeader className="fixed bottom-0 left-0 z-50 w-full h-16 flex ">
                <FooterKnapp url={'/'} tekst={''} />
                <FooterKnapp tekst={'Bets'} url={'/my-bets'} />
                <FooterKnapp tekst={'Resultater'} url={'/leaderboard'} />
                <FooterKnapp tekst={'Regler'} url={'/rules'} />
                <Dropdown>
                    <InternalHeader.UserButton as={Dropdown.Toggle} name="Velg en underside" className="ml-auto">
                        df
                    </InternalHeader.UserButton>

                    <Dropdown.Menu>
                        <Dropdown.Menu.List>
                            <Dropdown.Menu.List.Item
                                onClick={() => {
                                    router.push('/')
                                }}
                            >
                                {user.displayName}
                            </Dropdown.Menu.List.Item>
                            <Dropdown.Menu.List.Item
                                onClick={() => {
                                    router.push('/rules')
                                }}
                            >
                                Regler
                            </Dropdown.Menu.List.Item>
                            {me.admin && (
                                <Dropdown.Menu.List.Item
                                    onClick={() => {
                                        router.push('/sluttspill')
                                    }}
                                >
                                    Rediger sluttspill
                                </Dropdown.Menu.List.Item>
                            )}
                            <Dropdown.Menu.List.Item
                                onClick={async () => {
                                    await getFirebaseAuth().signOut()
                                }}
                            >
                                Logout
                            </Dropdown.Menu.List.Item>
                        </Dropdown.Menu.List>
                    </Dropdown.Menu>
                </Dropdown>
            </InternalHeader>
        </>
    )
}

function UserInnlogging(props: { children: React.ReactNode }) {
    const [user, loading, error] = useAuthState(getFirebaseAuth())
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        )
    }
    if (!user) {
        return (
            <>
                <SignInScreen />
                {error && <h1>Opps, noe gikk feil {error?.message}</h1>}
            </>
        )
    }

    return <UserFetchInnlogging>{props.children}</UserFetchInnlogging>
}

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        /* Setting this to true causes the request to be immediately executed after initial
                           mount Even if the query had data hydrated from the server side render */
                        refetchOnMount: false,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    )

    return (
        <>
            <Head>
                <title>Betpool 2022</title>
            </Head>
            <QueryClientProvider client={queryClient}>
                <Box sx={{ pb: 7 }}>
                    <UserInnlogging>
                        <Component {...pageProps} />
                    </UserInnlogging>
                </Box>
            </QueryClientProvider>
        </>
    )
}

export default MyApp
