import { anyone, isModerator } from '@/functions/permissions'
import { CollectionConfig, slugField } from 'payload'

export const Keywords: CollectionConfig = {
  slug: 'keywords',
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
