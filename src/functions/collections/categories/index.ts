import { anyone, isAdmin, isModerator } from '@/functions/permissions'
import { CollectionConfig, slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    admin: isModerator,
    read: anyone,
    update: isModerator,
    delete: isModerator,
    unlock: isModerator,
    readVersions: isModerator,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Website Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
