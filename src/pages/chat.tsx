import type { NextPage } from 'next'

import { Button, Paper, TextField } from '@mui/material'
import { Spinner } from '../components/loading/Spinner'
import { UseChat } from '../queries/useChat'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { UseMutateChat } from '../queries/mutateChat'
import { MessageLeft } from '../components/chat/bubbles'

const TextInput = () => {
    const [input, setInput] = useState<string>('')
    const { mutate, isLoading } = UseMutateChat(input, () => {
        setInput('')
    })
    return (
        <>
            <form
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '95%',
                    margin: `auto`,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField style={{ width: '100%' }} value={input} onChange={(e) => setInput(e.currentTarget.value)} />
                <Button
                    variant="contained"
                    disabled={isLoading}
                    type={'submit'}
                    onClick={(e) => {
                        e.preventDefault()

                        mutate()
                    }}
                    color="primary"
                >
                    <SendIcon />
                </Button>
            </form>
        </>
    )
}

const Home: NextPage = () => {
    const { data: chat } = UseChat()
    if (!chat) {
        return <Spinner />
    }
    return (
        <>
            <Paper sx={{ position: 'fixed', bottom: 120, left: 0, right: 0 }} elevation={3}>
                {chat.map((c) => (
                    <MessageLeft message={c.message} key={c.id} photoURL={c.picture} displayName={c.name} />
                ))}
            </Paper>
            <Paper sx={{ position: 'fixed', bottom: 60, left: 0, right: 0 }} elevation={3}>
                <TextInput></TextInput>
            </Paper>
        </>
    )
}

export default Home
