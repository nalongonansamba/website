import { revalidateFooter } from './hooks/revalidateFooter'
import { link } from '../headers/config/link'
import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
          RowLabel: '@/functions/settings/footers/components/row-label#RowLabel',
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
      name: 'copyright',
      type: 'text',
      required: true,
      defaultValue: 'Copyright © 2026 Nalongo Nasamba',
      admin: {
        position: 'sidebar',
        description: 'The copyright text on the footer',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter], // ✅ fires on every save in admin
  },
}
