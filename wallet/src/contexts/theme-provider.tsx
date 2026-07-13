import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from '../lib/theme'

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
