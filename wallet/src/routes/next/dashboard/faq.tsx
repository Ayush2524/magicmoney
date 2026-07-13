import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography,
} from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

const FAQ_ITEMS = [
    {
        question: 'Where is my private key stored?',
        answer: 'Your key is generated and kept in this browser only — Magic Money never sees it. Clearing your browser storage without backing up your key means losing access to your wallet, with no recovery.',
    },
    {
        question: 'How do I reject an allocation request?',
        answer: 'Allocation requests can’t be rejected. They’ll automatically disappear from the Offers page once they expire.',
    },
    {
        question: 'How do I add assets to my wallet?',
        answer: 'Token-standard assets can be added to your wallet by transferring them into it, or via the devnet Tap in Settings while testing.',
    },
] as const

export const Route = createFileRoute('/next/dashboard/faq')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Box sx={{ px: 5.5, py: 7.5 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2.5 }}>
                Frequently Asked Questions
            </Typography>

            <Box component="section" aria-label="Frequently Asked Questions">
                {FAQ_ITEMS.map((item) => (
                    <Accordion
                        key={item.question}
                        defaultExpanded
                        disableGutters
                        elevation={0}
                        square
                        sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            borderBottom: (theme) =>
                                `1px solid ${theme.palette.divider}`,
                            '&::before': {
                                display: 'none',
                            },
                            '&.Mui-expanded': {
                                m: 0,
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon
                                    sx={{
                                        color: 'secondary.main',
                                        fontSize: 18,
                                    }}
                                />
                            }
                            sx={{
                                minHeight: 'auto',
                                alignItems: 'flex-start',
                                px: 0,
                                py: 2.5,
                                '&.Mui-expanded': {
                                    minHeight: 'auto',
                                },
                                '& .MuiAccordionSummary-content': {
                                    my: 0,
                                    mr: 3,
                                },
                                '& .MuiAccordionSummary-content.Mui-expanded': {
                                    my: 0,
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{
                                    fontWeight: 700,
                                    lineHeight: 1.35,
                                }}
                            >
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 0, pt: 0, pb: 3.5 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    maxWidth: '110ch',
                                    color: 'text.primary',
                                }}
                            >
                                {item.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    )
}
