import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { SignInScreen } from '../components/SignIn'
import { BottomNavigation, BottomNavigationAction, Box, CircularProgress, Paper } from '@mui/material'
import { useState } from 'react'
import { Restore, Favorite, LocationOnRounded, LogoutOutlined } from '@mui/icons-material'
import { Theme } from '../components/theme/Theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UseUser } from '../queries/useUser'
import { useRouter } from 'next/router'

function UserFetchInnlogging(props: { children: React.ReactNode }) {
    const { isLoading } = UseUser()
    const router = useRouter()
    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        )
    }
    console.log(router.pathname)

    return (
        <>
            {props.children}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={router.pathname}
                    onChange={(event, newValue) => {
                        console.log(newValue)
                        if (newValue == 'utlogging') {
                            window.alert('log out')
                        } else {
                            router.push(newValue)
                        }
                    }}
                >
                    <BottomNavigationAction label="Home" value="/" icon={<Restore />} />
                    <BottomNavigationAction value="/leaderboard" label="Leaderboard" icon={<Favorite />} />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnRounded />} />
                    <BottomNavigationAction value="utlogging" label="Logout" icon={<LogoutOutlined />} />
                </BottomNavigation>
            </Paper>
        </>
    )
}

function UserInnlogging(props: { children: React.ReactNode }) {
    const [user, loading, error] = useAuthState(firebase.auth())
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        )
    }
    if (!user) {
        return <SignInScreen />
    }
    if (error) {
        return <h1>Opps, noe gikk feil</h1>
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
            })
    )

    return (
        <Theme>
            <QueryClientProvider client={queryClient}>
                <Box sx={{ pb: 7 }}>
                    <UserInnlogging>
                        <Component {...pageProps} />
                    </UserInnlogging>
                </Box>
            </QueryClientProvider>
        </Theme>
    )
}

export default MyApp
