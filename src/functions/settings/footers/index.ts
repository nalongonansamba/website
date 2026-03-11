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
    {
      name: 'socialMediaHandles',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: false, // hook populates this — validation runs before hooks
          admin: {
            readOnly: true,
            description: 'Auto-extracted from the URL',
          },
          hooks: {
            beforeChange: [
              ({ siblingData }) => {
                // siblingData = the sibling fields in the same row
                const urlString = siblingData?.url
                if (!urlString) return ''
                try {
                  const url = new URL(
                    /^https?:\/\//i.test(urlString) ? urlString : `https://${urlString}`,
                  )
                  const host = url.hostname.replace(/^(www\.|m\.)/, '')
                  const segments = url.pathname.split('/').filter(Boolean)
                  // 1. WhatsApp — wa.me/+1234 or ?phone=1234
                  if (host.includes('whatsapp.com') || host === 'wa.me') {
                    return url.searchParams.get('phone') || segments[0] || ''
                  }
                  // 2. Telegram — t.me/username or t.me/s/username
                  if (host === 't.me' || host === 'telegram.me') {
                    return (segments[0] === 's' ? segments[1] : segments[0]) || ''
                  }
                  // 3. YouTube — /channel/ID, /c/name, /@handle, /user/name
                  if (host.includes('youtube.com') || host === 'youtu.be') {
                    const skip = ['channel', 'c', 'user']
                    const raw = skip.includes(segments[0]) ? segments[1] : segments[0]
                    return decodeURIComponent(raw || '').replace(/^@/, '')
                  }
                  // 4. Reddit — /r/sub or /u/user
                  if (host.includes('reddit.com')) {
                    return segments[1] ? `${segments[0]}/${segments[1]}` : segments[0] || ''
                  }
                  // 5. Generic profile wrappers: /in/name, /u/name, /user/name, /profile/name
                  const wrappers = new Set(['in', 'u', 'user', 'profile', 'people'])
                  const raw = wrappers.has(segments[0]) ? segments[1] : segments[0]
                  return decodeURIComponent(raw || '').replace(/^@/, '')
                } catch {
                  // Non-URL fallback: grab last non-empty path-like segment
                  return urlString.split('/').filter(Boolean).pop()?.replace(/^@/, '') || ''
                }
              },
            ],
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        position: 'sidebar',
        components: {
          RowLabel: '@/functions/settings/footers/components/row-label#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter], // ✅ fires on every save in admin
  },
}
