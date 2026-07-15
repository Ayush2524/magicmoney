import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Link as MuiLink, Typography } from '@mui/material'
import { createLink } from '@tanstack/react-router'
import { PreapprovalContractSettings } from '../../components/preapproval-contract-settings'
import { RegistrySettings } from '../../components/registry-settings'
import { TapSettings } from '../../components/tap-settings'
import { useIsDevNet } from '../../hooks/useIsDevNet'

const RouterLink = createLink(MuiLink)

export function SettingsPage() {
    const { data: isDevNet } = useIsDevNet()

    return (
        <Box sx={{ mt: 4 }}>
            <RouterLink
                to="/"
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 2,
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { color: 'text.primary' },
                }}
            >
                <ArrowBackIcon fontSize="small" />
                Back to Dashboard
            </RouterLink>

            <Typography variant="h4" component="h1" gutterBottom>
                Settings
            </Typography>

            <RegistrySettings />
            <PreapprovalContractSettings />
            {isDevNet && <TapSettings />}
        </Box>
    )
}
