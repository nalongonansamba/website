import type { Account } from '@/payload-types'
import type { AccessArgs } from 'payload'

type isAuthenticated = (args: AccessArgs<Account>) => boolean
export const isAdmin: isAuthenticated = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'developer' || user.role === 'moderator') return true
  return false
}
