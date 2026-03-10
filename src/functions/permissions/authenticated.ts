import type { AccessArgs } from 'payload'

import type { Account } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<Account>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}
