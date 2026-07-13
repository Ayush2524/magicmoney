// Copyright (c) 2025-2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { createTheme, type ThemeOptions } from '@mui/material/styles'

// Magic Money brand palette (source of truth: magicmoney/app/globals.css)
export const portfolioColors = {
    black: '#020409',
    grey27: '#020409', // --ink
    grey36: '#050c18', // --ink-3
    grey54: '#0b162e',
    grey69: '#0d1a42',
    grey105: '#4d6585', // --text-faint
    grey207: '#8aa8cc', // --text-dim
    grey226: '#e8ecf2', // --text
    white: '#e8f0ff',
    lightBlue99: '#0055ff', // --accent
    lightBlue89: '#4da6ff', // --glow
    yellow100: '#4da6ff', // --glow (brand has no yellow; stay in the blue family)
    yellow99: 'rgba(77,166,255,.15)',
    purple100: '#0055ff', // --accent
    purple90: '#3385ff', // --accent-dim
    purple30: '#0036cc', // --olive
    red99: '#FD8575',
    green76: '#33C200',
    green80: 'rgba(0,85,255,.10)',
} as const

declare module '@mui/material/styles' {
    interface Theme {
        portfolio: {
            sidebar: { background: string; active: string }
            surface: { subtle: string; border: string; required: string }
            nav: { main: string; hover: string; soft: string }
            status: {
                pending: { background: string; text: string }
                'action-required': { background: string; text: string }
                allocated: { background: string; text: string }
                expired: { background: string; text: string }
            }
        }
    }

    interface ThemeOptions {
        portfolio?: Partial<Theme['portfolio']>
    }
}

export const portfolioAppTokens = {
    portfolio: {
        sidebar: {
            background: '#020c14', // --ink-2
            active: 'rgba(0,85,255,.08)',
        },
        surface: {
            subtle: portfolioColors.grey36,
            border: 'rgba(0,85,255,.14)', // --line
            required: portfolioColors.grey54,
        },
        nav: {
            main: portfolioColors.lightBlue99,
            hover: portfolioColors.purple90,
            soft: portfolioColors.lightBlue89,
        },
    },
} satisfies ThemeOptions

const typography: ThemeOptions['typography'] = {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontFamily: "'Space Grotesk', 'Inter', sans-serif", letterSpacing: '-0.02em' },
    h2: { fontFamily: "'Space Grotesk', 'Inter', sans-serif", letterSpacing: '-0.02em' },
    h3: { fontFamily: "'Space Grotesk', 'Inter', sans-serif", letterSpacing: '-0.02em' },
    h4: { fontFamily: "'Space Grotesk', 'Inter', sans-serif", letterSpacing: '-0.02em' },
    h5: { fontFamily: "'Space Grotesk', 'Inter', sans-serif" },
    h6: { fontFamily: "'Space Grotesk', 'Inter', sans-serif" },
    button: { fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 600 },
    overline: {
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
    },
    caption: {
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        letterSpacing: '0.08em',
    },
}

export const darkPortfolioTokens: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: portfolioColors.lightBlue99,
            light: portfolioColors.lightBlue89,
            contrastText: portfolioColors.white,
        },
        secondary: {
            main: portfolioColors.lightBlue89,
            light: portfolioColors.purple90,
            contrastText: portfolioColors.black,
        },
        error: {
            main: portfolioColors.red99,
            contrastText: portfolioColors.black,
        },
        warning: {
            main: portfolioColors.red99,
            contrastText: portfolioColors.black,
        },
        success: {
            main: portfolioColors.green76,
            contrastText: portfolioColors.black,
        },
        background: {
            default: portfolioColors.grey27,
            paper: portfolioColors.grey36,
        },
        text: {
            primary: portfolioColors.grey226,
            secondary: portfolioColors.grey207,
            disabled: portfolioColors.grey105,
        },
        divider: 'rgba(0,85,255,.14)',
        action: {
            hover: 'rgba(0,85,255,.08)',
            selected: 'rgba(0,85,255,.08)',
            disabled: portfolioColors.grey105,
            disabledBackground: portfolioColors.grey54,
        },
    },
    typography,
    portfolio: {
        ...portfolioAppTokens.portfolio,
        status: {
            pending: {
                background: 'rgba(0,85,255,.10)',
                text: portfolioColors.lightBlue89,
            },
            'action-required': {
                background: 'rgba(77,166,255,.15)',
                text: portfolioColors.lightBlue89,
            },
            allocated: {
                background: portfolioColors.purple30,
                text: portfolioColors.grey226,
            },
            expired: {
                background: portfolioColors.grey36,
                text: portfolioColors.grey105,
            },
        },
    },
}

// Magic Money is a dark-only brand; "light" is a slightly lifted dark variant
// rather than a true light theme, so the theme toggle stays functional without
// a second design language.
export const lightPortfolioTokens: ThemeOptions = {
    ...darkPortfolioTokens,
    palette: {
        ...darkPortfolioTokens.palette,
        background: {
            default: '#020c14', // --ink-2
            paper: portfolioColors.grey54,
        },
    },
    typography,
    portfolio: {
        ...portfolioAppTokens.portfolio,
        sidebar: {
            background: portfolioColors.grey54,
            active: 'rgba(0,85,255,.14)',
        },
        surface: {
            subtle: portfolioColors.grey54,
            border: 'rgba(0,85,255,.2)',
            required: portfolioColors.grey69,
        },
        status: darkPortfolioTokens.portfolio!.status,
    },
}

export const portfolioComponents: ThemeOptions['components'] = {
    MuiCssBaseline: {
        styleOverrides: (theme) => ({
            body: {
                backgroundColor: theme.palette.background.default,
                backgroundImage:
                    'radial-gradient(circle at 20% 0%, rgba(0,85,255,.12), transparent 55%)',
                backgroundAttachment: 'fixed',
                color: theme.palette.text.primary,
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
            },
            '::selection': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
            },
        }),
    },
    MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: ({ theme }) => ({
                minWidth: 'unset',
                textTransform: 'none',
                borderRadius: 99,
                fontWeight: 600,
                transition: 'transform .25s ease, box-shadow .25s ease',
                '&.Mui-focusVisible': {
                    outline: `2px solid ${theme.palette.secondary.main}`,
                    outlineOffset: 2,
                },
                '&.MuiButton-containedPrimary': {
                    color: theme.palette.primary.contrastText,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 34px rgba(0,85,255,.34)',
                    },
                },
                '&.MuiButton-containedSecondary': {
                    color: theme.palette.secondary.contrastText,
                    backgroundColor: theme.palette.secondary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.light,
                    },
                },
                '&.MuiButton-outlinedError': {
                    color: theme.palette.error.main,
                    borderColor: theme.palette.error.main,
                    '&:hover': {
                        borderColor: theme.palette.error.main,
                        backgroundColor: 'rgba(253, 133, 117, 0.08)',
                    },
                },
            }),
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 18,
                border: '1px solid rgba(0,85,255,.14)',
                backgroundImage:
                    'linear-gradient(165deg, rgba(0,85,255,.05), rgba(16,20,24,.4))',
            },
        },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: 99,
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: '0.08em',
            },
        },
    },
}

export const darkTheme = createTheme({
    ...darkPortfolioTokens,
    components: portfolioComponents,
})

export const lightTheme = createTheme({
    ...lightPortfolioTokens,
    components: portfolioComponents,
})

export default darkTheme
