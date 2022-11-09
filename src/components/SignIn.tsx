import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from '../auth/clientApp'
import { Container } from '@mui/system'
import { BottomNavigation, BottomNavigationAction, Card, CardContent, Paper, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import { Chat, EmojiEvents } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'

// Configure FirebaseUI.
const uiConfig = {
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
}

export function SignInScreen() {
    return (
        <>
            <Container maxWidth="md" sx={{ mt: 2 }}>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <Typography variant="h1" component="h1" align={'center'}>
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
                            Qatar VM er kontroversielt. 🧐
                            <br />
                            Derfor velger du mellom 10% og 75% av innskuddet som går til Amnesty og ikke i premiepotten.
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
                            Hvem kan bli med? Hvem som helst som har denne lenken. 🤝
                        </Typography>
                    </CardContent>
                </Card>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </Container>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Meg" disabled icon={<HomeIcon />} />
                    <BottomNavigationAction label="Bets" disabled icon={<SportsSoccerIcon />} />
                    <BottomNavigationAction label="Resultater" disabled icon={<EmojiEvents />} />
                    <BottomNavigationAction label="Chat" icon={<Chat />} />
                    <BottomNavigationAction label="Menu" disabled icon={<MenuIcon />} />
                </BottomNavigation>
            </Paper>
        </>
    )
}
