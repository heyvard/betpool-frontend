import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from '../auth/clientApp'
import { Container, Stack } from '@mui/system'
import { Typography } from '@mui/material'

// Configure FirebaseUI.
const uiConfig = {
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
}

export function SignInScreen() {
    return (
        <Container maxWidth="md" sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="center">
                <Typography variant="h4" component="h2">
                    VM Betpool 2022
                </Typography>
            </Stack>

            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </Container>
    )
}
