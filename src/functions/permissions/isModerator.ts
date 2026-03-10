import type { AccessArgs } from 'payload'

import type { Account } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<Account>) => boolean

export const isModerator: isAuthenticated = ({ req: { user } }) => {
  if (!user) return false
  if (
    user.role === 'admin' ||
    user.role === 'developer' ||
    user.role === 'moderator' ||
    user.role === 'editor'
  )
    return true
  return false
}
