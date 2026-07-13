import { Box, Chip, Typography } from '@mui/material'
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { PillButton } from '@components/ui/PillButton'
import { useConnection } from '@contexts/ConnectionContext'

export const Route = createFileRoute('/next/connect')({
    component: RouteComponent,
})

function RouteComponent() {
    const { connect, status } = useConnection()

    if (status?.connection?.isConnected) {
        return <Navigate to="/next/dashboard" />
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                px: 2,
            }}
        >
            <Box
                component="img"
                src="/logo.png"
                alt="Magic Money"
                sx={{ width: 56, height: 56, objectFit: 'contain' }}
            />
            <Chip
                label="Canton-native · Non-custodial"
                size="small"
                sx={{
                    color: 'primary.light',
                    borderColor: 'divider',
                    bgcolor: 'rgba(0,85,255,.05)',
                }}
                variant="outlined"
            />
            <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                Welcome to
            </Typography>
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    fontWeight: 700,
                    textAlign: 'center',
                    backgroundImage:
                        'linear-gradient(100deg, #4da6ff, #0055ff 60%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                }}
            >
                Magic Money
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: 'text.secondary', maxWidth: '34ch', textAlign: 'center' }}
            >
                Spend your Canton. Never sell it.
            </Typography>
            <PillButton
                onClick={() => connect()}
                size="large"
                sx={{ mt: 2, px: 4, py: 2 }}
            >
                Connect Wallet
            </PillButton>
        </Box>
    )
}
