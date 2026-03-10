import { anyone, authenticated, isAdmin, isModerator } from '@/functions/permissions'
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
    update: authenticated,
    delete: authenticated,
    unlock: isModerator,
    readVersions: authenticated,
  },
  auth: {
    loginWithUsername: {
      requireUsername: true,
      requireEmail: true,
      allowEmailLogin: true,
    },
    useSessions: true,
    tokenExpiration: 7200, // 2 hours
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
      name: 'age',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
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
