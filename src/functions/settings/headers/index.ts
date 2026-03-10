import { revalidateHeader } from './hooks/revalidateHeader'
import { GlobalConfig } from 'payload'
import { link } from './config/link'

export const Headers: GlobalConfig = {
  slug: 'headers',
  admin: {
    group: 'Configurations',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [link({})],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/functions/settings/headers/components/row-label#RowLabel',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Nalongo Nasamba',
      admin: {
        position: 'sidebar',
        description: 'The title on the navigation bar or website title',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'storage',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader], // ✅ fires on every save in admin
  },
}
