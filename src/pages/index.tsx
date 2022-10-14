import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import Auth from "../components/Auth";
import {Typography} from '@mui/material';

const Home: NextPage = () => {
    const [user, loading, error] = useAuthState(firebase.auth());

    return (
        <>
            <Head>
                <title>Betpool 2022</title>
            </Head>
            <Typography variant="h4" component="h2">
                Welcome to {user!.displayName}
            </Typography>
        </>


    )
}

export default Home
