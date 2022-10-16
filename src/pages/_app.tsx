import type {AppProps} from 'next/app'
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import Auth from "../components/Auth";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box, CircularProgress,
    createTheme,
    CssBaseline,
    Paper,
    ThemeProvider
} from "@mui/material";
import {useState} from "react";
import {Restore, Favorite, LocationOnRounded, LogoutOutlined} from "@mui/icons-material"
import {Theme} from "../components/theme/Theme";

function MyApp({Component, pageProps}: AppProps) {
    const [user, loading, error] = useAuthState(firebase.auth());
    const [value, setValue] = useState("sdf")


    if (loading) {
        return (
            <Theme>
                <Box display="flex"
                     justifyContent="center"
                     alignItems="center"
                     minHeight="100vh">
                    <CircularProgress/>
                </Box>
            </Theme>)
    }
    if (!user) {
        return <Theme><Auth/></Theme>
    }
    if (error) {
        return <Theme><h1>Opps, noe gikk feil</h1></Theme>
    }
    return <Theme>

        <Box sx={{pb: 7}}>
            <Component {...pageProps} />

            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Recents" icon={<Restore/>}/>
                    <BottomNavigationAction label="Favorites" icon={<Favorite/>}/>
                    <BottomNavigationAction label="Nearby" icon={<LocationOnRounded/>}/>
                    <BottomNavigationAction label="Logout" icon={<LogoutOutlined/>}/>
                </BottomNavigation>
            </Paper>
        </Box>
    </Theme>


}

export default MyApp
