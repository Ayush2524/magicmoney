import { Navigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_legacy')({
    component: LegacyLayout,
})

// The legacy UI (header-based layout, generic third-party-registry
// preapproval form) has been superseded by the /next UI. Redirect
// everything under this layout there rather than maintaining two
// parallel experiences.
function LegacyLayout() {
    return <Navigate to="/next/connect" replace />
}
