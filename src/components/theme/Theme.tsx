import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material'

export const Theme = (props: { children: React.ReactNode }) => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    })
    return (
        <ThemeProvider theme={responsiveFontSizes(darkTheme)}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    )
}
