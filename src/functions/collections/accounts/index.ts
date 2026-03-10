import { anyone, authenticated, isAdmin, isAdminOrSelf, isModerator } from '@/functions/permissions'
import type { CollectionConfig } from 'payload'

export const Accounts: CollectionConfig = {
  slug: 'account',
  admin: {
    useAsTitle: 'email',
    group: 'Management',
  },
  access: {
    admin: isAdmin,
    read: anyone,
    update: isAdminOrSelf,
    delete: isModerator,
    unlock: isModerator,
    readVersions: isModerator,
  },
  auth: {
    loginWithUsername: {
      requireUsername: true,
      allowEmailLogin: true,
    },
    useSessions: true,
    tokenExpiration: 604800, // 1 week
  },
  fields: [
    {
      name: 'bio',
      type: 'textarea',
      defaultValue: 'Welcome to Nalongo Nansamba platform...',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      required: true,
      options: ['admin', 'user', 'editor', 'moderator', 'developer'],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'storage',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
