// Copyright (c) 2025-2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react'
import { useConnection, type LocalAccount } from '../contexts/ConnectionContext'

export const useAccounts = (): LocalAccount[] => useConnection().accounts

export const usePrimaryAccount = (): LocalAccount | null => {
    const accounts = useAccounts()
    return useMemo(() => accounts.find((a) => a.primary) ?? null, [accounts])
}
