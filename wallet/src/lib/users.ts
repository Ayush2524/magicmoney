// Syncs the local wallet's profile to the Supabase `users` table, keyed by
// Canton party ID. This is best-effort bookkeeping (display name/hint) — the
// wallet itself is fully functional without it, so failures are logged and
// swallowed rather than surfaced to the user.

import { pino } from 'pino'
import { supabase } from './supabase'

const logger = pino({ name: 'magicmoney-users', level: 'info' })

export const syncUserProfile = async (
    partyId: string,
    hint: string
): Promise<void> => {
    const { error } = await supabase
        .from('users')
        .upsert(
            { party_id: partyId, display_name: hint, hint },
            { onConflict: 'party_id' }
        )
    if (error) {
        logger.warn({ err: error }, 'Failed to sync user profile to Supabase')
    }
}
