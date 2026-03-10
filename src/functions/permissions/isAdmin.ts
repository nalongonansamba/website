import type { AccessArgs } from 'payload'

import type { Account } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<Account>) => boolean

export const isAdmin: isAuthenticated = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'developer') return true
  return false
}
