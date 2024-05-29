import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SignInScreen } from '../components/SignIn'
import React, { FC, useState } from 'react'
import { UseUser } from '../queries/useUser'
import { useRouter } from 'next/router'
import Head from 'next/head'

import '../styles/global.css'
import { getFirebaseAuth } from '../auth/clientApp'
import { Dropdown, ErrorMessage, InternalHeader } from '@navikt/ds-react'
import { BankNoteIcon, HouseIcon, MenuHamburgerIcon, NumberListIcon, ParagraphIcon } from '@navikt/aksel-icons'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Spinner } from '../components/loading/Spinner'

function Layout({ children }: { children: React.ReactNode }) {
    const [user, loading, error] = useAuthState(getFirebaseAuth())
    const router = useRouter()
    const { data: me } = UseUser()

    return (
        <>
            <div className="px-2 pt-4 pb-16 mx-auto max-w-full sm:max-w-lg md:max-w-2xl">
                {error && <ErrorMessage>Error useAuthState: {JSON.stringify(error)}</ErrorMessage>}
                {loading && (
                    <Spinner />
                )}
                {!loading && !user && <SignInScreen />}
                {user && <>{children}</>}
            </div>
            <InternalHeader className="fixed bottom-0 left-0 z-50 w-full h-16 flex ">
                <FooterKnapp url={'/'} text={''} icon={HouseIcon} />
                <FooterKnapp text={'Bets'} url={'/my-bets'} icon={BankNoteIcon} />
                <FooterKnapp text={'Resultater'} url={'/leaderboard'} icon={NumberListIcon} />
                <FooterKnapp text={'Regler'} url={'/rules'} icon={ParagraphIcon} />
                <Dropdown>
                    <InternalHeader.Button
                        as={me ? Dropdown.Toggle : 'button'}
                        name="Velg en underside"
                        className="flex-col items-center w-full justify-center"
                    >
                        <MenuHamburgerIcon className="w-8 h-8" />
                    </InternalHeader.Button>

                    <Dropdown.Menu>
                        <Dropdown.Menu.List>
                            <Dropdown.Menu.List.Item
                                onClick={() => {
                                    router.push('/')
                                }}
                            >
                                {user?.displayName}
                            </Dropdown.Menu.List.Item>
                            <Dropdown.Menu.List.Item
                                onClick={() => {
                                    router.push('/rules')
                                }}
                            >
                                Regler
                            </Dropdown.Menu.List.Item>
                            {me?.scoreadmin && (
                                <>
                                    <Dropdown.Menu.List.Item
                                        onClick={() => {
                                            router.push('/sluttspill')
                                        }}
                                    >
                                        Rediger sluttspill
                                    </Dropdown.Menu.List.Item>
                                    <Dropdown.Menu.List.Item
                                        onClick={() => {
                                            router.push('/resultatservice')
                                        }}
                                    >
                                        Rediger resultater
                                    </Dropdown.Menu.List.Item>
                                </>
                            )}
                            {(me?.superadmin || me?.paymentadmin) && (
                                <Dropdown.Menu.List.Item
                                    onClick={() => {
                                        router.push('/brukere')
                                    }}
                                >
                                    Brukere
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
                <title>Betpool 2024</title>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <link rel="apple-touch-icon" href="/favicon-180x180.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </>
    )
}

const FooterKnapp: FC<{
    icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>
    text?: string
    url: string
    borderRight?: boolean
}> = ({ icon: Icon, text, url, borderRight }) => {
    const router = useRouter()
    const isActive = router.pathname === url
    const { data: me } = UseUser()
    return (
        <InternalHeader.Button
            className={`flex flex-col items-center w-full ${!text ? 'justify-center' : 'p-2'} ${
                borderRight ? 'border-r' : ''
            } ${isActive && me ? 'bg-gray-600 text-white' : ''}`}
            type="button"
            onClick={() => {
                if (me) return router.push(url)
            }}
        >
            <Icon className="w-8 h-8" />
            <span className="text-sm">{text}</span>
        </InternalHeader.Button>
    )
}
export default MyApp
