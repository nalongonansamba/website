import type { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'developer' || user.role === 'moderator') return true
  return {
    id: { equals: user.id },
  }
}
