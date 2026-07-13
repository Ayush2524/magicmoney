import { useMemo, type ReactNode } from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsIcon from '@mui/icons-material/Settings'
import {
    Box,
    Chip,
    Divider,
    Drawer,
    Typography,
    type SxProps,
    type Theme,
} from '@mui/material'
import {
    createFileRoute,
    Link,
    Navigate,
    Outlet,
    useLocation,
    useMatchRoute,
    type LinkComponentProps,
} from '@tanstack/react-router'
import type { RegisteredRouter } from '@tanstack/router-core'
import { PrimaryBadge } from '@components/dashboard/primary-badge'
import { PillButton } from '@components/ui/PillButton'
import { useConnection } from '@contexts/ConnectionContext'
import { useAccounts } from '@hooks/useAccounts'

const SIDEBAR_WIDTH = (theme: Theme) =>
    `clamp(${theme.spacing(25)}, 18vw, ${theme.spacing(35)})`

export const Route = createFileRoute('/next/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    const accounts = useAccounts()
    const { initialized, status, disconnect } = useConnection()
    const pathname = useLocation({ select: (location) => location.pathname })
    const matchRoute = useMatchRoute()
    const wallets = useMemo(
        () =>
            accounts.slice().sort(
                // make sure primary account is first
                (a, b) =>
                    Number(b.primary) - Number(a.primary) ||
                    a.hint.localeCompare(b.hint)
            ),
        [accounts]
    )

    if (!initialized) {
        return null
    }

    if (!status?.connection?.isConnected) {
        return <Navigate to="/next/connect" replace />
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: SIDEBAR_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: SIDEBAR_WIDTH,
                        boxSizing: 'border-box',
                        bgcolor: 'portfolio.sidebar.background',
                        borderColor: 'divider',
                        color: 'text.primary',
                    },
                }}
            >
                <Box
                    component="nav"
                    aria-label="Magic Money navigation"
                    sx={{
                        display: 'flex',
                        minHeight: '100%',
                        flexDirection: 'column',
                        px: 1,
                        py: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 3,
                            mb: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Box
                                component="img"
                                src={`${import.meta.env.BASE_URL}logo.png`}
                                alt="Magic Money"
                                sx={{ width: 24, height: 24, objectFit: 'contain' }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ fontWeight: 700, letterSpacing: 0.2 }}
                            >
                                Magic Money
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'grid', gap: 0.5 }}>
                        <SidebarLink
                            to="/next/dashboard"
                            active={Boolean(
                                matchRoute({
                                    to: '/next/dashboard',
                                })
                            )}
                            icon={<DashboardIcon fontSize="small" />}
                        >
                            Dashboard
                        </SidebarLink>
                        <SidebarLink
                            to="/next/dashboard/offers"
                            active={pathname === '/next/dashboard/offers'}
                            icon={<NotificationsNoneIcon fontSize="small" />}
                        >
                            Offers
                        </SidebarLink>
                        <ComingSoonLink icon={<AccountBalanceIcon fontSize="small" />}>
                            Vault
                        </ComingSoonLink>
                        <ComingSoonLink icon={<AutoAwesomeIcon fontSize="small" />}>
                            Magic Points
                        </ComingSoonLink>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box
                        sx={{
                            flex: 1,
                            minHeight: 0,
                            display: 'grid',
                            alignContent: 'start',
                            gap: 0.5,
                            overflowY: 'auto',
                            pr: 0.5,
                            mb: 2,
                            scrollbarWidth: 'thin',
                        }}
                    >
                        {wallets.map((wallet) => (
                            <SidebarLink
                                key={wallet.partyId}
                                to="/next/dashboard/wallet/$walletId"
                                params={{ walletId: wallet.partyId }}
                                active={Boolean(
                                    matchRoute({
                                        to: '/next/dashboard/wallet/$walletId',
                                        params: { walletId: wallet.partyId },
                                    })
                                )}
                                icon={
                                    <AccountBalanceWalletIcon fontSize="small" />
                                }
                                endAdornment={
                                    wallet.primary ? (
                                        <PrimaryBadge />
                                    ) : undefined
                                }
                            >
                                {wallet.hint}
                            </SidebarLink>
                        ))}
                    </Box>

                    <Box sx={{ display: 'grid', gap: 1.5, pb: 4 }}>
                        <PillButton
                            type="button"
                            tone="danger"
                            fullWidth
                            onClick={disconnect}
                        >
                            Disconnect
                        </PillButton>
                        <SidebarLink
                            to="/next/dashboard/settings"
                            active={pathname === '/next/dashboard/settings'}
                            icon={<SettingsIcon fontSize="small" />}
                        >
                            Settings
                        </SidebarLink>
                        <SidebarLink
                            to="/next/dashboard/faq"
                            active={pathname === '/next/dashboard/faq'}
                            icon={<HelpOutlineOutlinedIcon fontSize="small" />}
                        >
                            FAQ
                        </SidebarLink>
                    </Box>
                </Box>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flex: 1,
                    minWidth: 0,
                    bgcolor: 'background.default',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

function ComingSoonLink({
    icon,
    children,
}: {
    icon: ReactNode
    children: ReactNode
}) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: 1.5,
                borderRadius: 999,
                px: 1.5,
                py: 1,
                color: 'text.disabled',
                cursor: 'default',
            }}
        >
            <Box
                aria-hidden="true"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                {icon}
            </Box>
            <Typography component="span" variant="body2">
                {children}
            </Typography>
            <Chip label="SOON" size="small" variant="outlined" />
        </Box>
    )
}

type SidebarLinkProps = {
    active: boolean
    icon: ReactNode
    children: ReactNode
    endAdornment?: ReactNode
} & LinkComponentProps<'a', RegisteredRouter>

function SidebarLink({
    active,
    icon,
    children,
    endAdornment,
    ...linkProps
}: SidebarLinkProps) {
    return (
        <Link
            {...linkProps}
            aria-current={active ? 'page' : undefined}
            style={{ color: 'inherit', textDecoration: 'none' }}
        >
            <Box sx={sidebarLinkSx(active, Boolean(endAdornment))}>
                <Box
                    aria-hidden="true"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.secondary',
                    }}
                >
                    {icon}
                </Box>
                <Typography
                    component="span"
                    variant="body2"
                    sx={{
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {children}
                </Typography>
                {endAdornment}
            </Box>
        </Link>
    )
}

const sidebarLinkSx = (
    active: boolean,
    hasEndAdornment: boolean
): SxProps<Theme> => ({
    display: 'grid',
    gridTemplateColumns: hasEndAdornment
        ? '18px minmax(0, 1fr) auto'
        : '18px minmax(0, 1fr)',
    alignItems: 'center',
    gap: 1,
    minHeight: 34,
    px: 3,
    color: 'text.primary',
    bgcolor: active ? 'action.hover' : 'transparent',
    borderRadius: 1,
    transition: (theme) =>
        theme.transitions.create(['background-color', 'color'], {
            duration: theme.transitions.duration.shortest,
        }),
    '&:hover': {
        bgcolor: 'action.hover',
    },
})
