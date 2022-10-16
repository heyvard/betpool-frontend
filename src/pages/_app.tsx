import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { SignInScreen } from '../components/SignIn'
import { BottomNavigation, BottomNavigationAction, Box, CircularProgress, Paper } from '@mui/material'
import { useState } from 'react'
import { Restore, Favorite, LocationOnRounded, LogoutOutlined } from '@mui/icons-material'
import { Theme } from '../components/theme/Theme'
import { UserContext } from '../auth/UserContext'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps }: AppProps) {
    const [user, loading, error] = useAuthState(firebase.auth())
    const [value, setValue] = useState('sdf')
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

    if (loading) {
        return (
            <Theme>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            </Theme>
        )
    }
    if (!user) {
        return (
            <Theme>
                <SignInScreen />
            </Theme>
        )
    }
    if (error) {
        return (
            <Theme>
                <h1>Opps, noe gikk feil</h1>
            </Theme>
        )
    }

    return (
        <Theme>
            <QueryClientProvider client={queryClient}>
                <UserContext user={user}>
                    <Box sx={{ pb: 7 }}>
                        <Component {...pageProps} />

                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <BottomNavigation
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue)
                                }}
                            >
                                <BottomNavigationAction label="Recents" icon={<Restore />} />
                                <BottomNavigationAction label="Favorites" icon={<Favorite />} />
                                <BottomNavigationAction label="Nearby" icon={<LocationOnRounded />} />
                                <BottomNavigationAction label="Logout" icon={<LogoutOutlined />} />
                            </BottomNavigation>
                        </Paper>
                    </Box>
                </UserContext>
            </QueryClientProvider>
        </Theme>
    )
}

export default MyApp
