import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { SignInScreen } from '../components/SignIn'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import MenuIcon from '@mui/icons-material/Menu'
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Paper,
} from '@mui/material'
import React, { useState } from 'react'
import { EmojiEvents, Sports, Chat, Person } from '@mui/icons-material'
import { Theme } from '../components/theme/Theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UseUser } from '../queries/useUser'
import { useRouter } from 'next/router'
import { Spinner } from '../components/loading/Spinner'

function UserFetchInnlogging(props: { children: React.ReactNode }) {
    const { isLoading } = UseUser()
    const [user] = useAuthState(firebase.auth())

    const router = useRouter()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    if (isLoading || !user) {
        return <Spinner />
    }
    return (
        <>
            {props.children}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={router.pathname}
                    onChange={(event, newValue) => {
                        router.push(newValue)
                    }}
                >
                    <BottomNavigationAction label="Bets" value="/" icon={<Sports />} />
                    <BottomNavigationAction label="Leaderboard" value="/leaderboard" icon={<EmojiEvents />} />
                    <BottomNavigationAction label="Chat" value="/chat" icon={<Chat />} />
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        {anchorEl != null ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={async () => {
                                handleClose()
                            }}
                        >
                            {' '}
                            <Person />
                            {user.displayName}
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                handleClose()
                                router.push('rules')
                            }}
                        >
                            <EmojiEvents />
                            Regler
                        </MenuItem>
                        <MenuItem
                            onClick={async () => {
                                await firebase.auth().signOut()
                                handleClose()
                            }}
                        >
                            <LogoutIcon />
                            Logout
                        </MenuItem>
                    </Menu>
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
