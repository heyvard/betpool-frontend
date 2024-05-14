import React from 'react'
import { Container } from '@mui/system'
import { BottomNavigation, BottomNavigationAction, Card, CardContent, Paper, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import { Chat, EmojiEvents } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import StyledFirebaseAuth from '../auth/StyledFirebaseAuth'

// Configure FirebaseUI.
const uiConfig = {
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    signInFlow: 'popup',
    signInOptions: [GoogleAuthProvider.PROVIDER_ID, EmailAuthProvider.PROVIDER_ID],
}

export function SignInScreen() {
    const isFacebookInAppBrowser =
        /FB_IAB/.test(navigator.userAgent) || /FBAN/.test(navigator.userAgent) || /FBAV/.test(navigator.userAgent)
    return (
        <>
            <Container maxWidth="md">
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="h4" component="h1" align={'center'}>
                            VM Betpool
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="subtitle2" align={'center'}>
                            300 kr innskudd 💸
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="subtitle2" align={'center'}>
                            Bet frem til kampstart ⚽
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="subtitle2" align={'center'}>
                            Hvem kan bli med? Hvem som helst som har denne lenken. 🤝 Bruk din vanlige browser på mobil.
                        </Typography>
                    </CardContent>
                </Card>
                {isFacebookInAppBrowser && (
                    <Card sx={{ mt: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle2" align={'center'}>
                                For å logge på må du åpne denne siden utenfor facebook messenger, i vanlig browser.
                            </Typography>
                        </CardContent>
                    </Card>
                )}
                {!isFacebookInAppBrowser && <StyledFirebaseAuth uiConfig={uiConfig} />}
            </Container>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction disabled icon={<HomeIcon />} />
                    <BottomNavigationAction label="Bets" disabled icon={<SportsSoccerIcon />} />
                    <BottomNavigationAction label="Resultater" disabled icon={<EmojiEvents />} />
                    <BottomNavigationAction label="Chat" icon={<Chat />} />
                    <BottomNavigationAction disabled icon={<MenuIcon />} />
                </BottomNavigation>
            </Paper>
        </>
    )
}
