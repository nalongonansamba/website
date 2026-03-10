import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { revalidateRedirects } from '../hooks/revalidateRedirects'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { newsletterPlugin } from 'payload-plugin-newsletter'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { getServerSideURL } from '../config/getURL'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { Content, Route } from '@/payload-types'
import { isAdmin } from '../permissions'
import type { Plugin } from 'payload'

const generateTitle: GenerateTitle<Route | Content> = ({ doc }) => {
  return doc?.title ? `${doc.title} - Nalongo Nasamba` : 'Nalongo Nasamba'
}

const generateURL: GenerateURL<Route | Content> = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['route', 'content'],
    overrides: {
      admin: {
        group: 'Configurations',
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      admin: {
        group: 'Configurations',
      },
    },
    formOverrides: {
      admin: {
        group: 'Configurations',
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [...rootFeatures]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  newsletterPlugin({
    access: {
      isAdmin,
    },
    providers: {
      default: 'resend',
      resend: {
        apiKey: process.env.RESEND_API_KEY || '',
        fromAddress: process.env.WEBSITE_EMAIL || '',
        fromName: 'Traditional Healer Nalongo Nasamba Newsletter',
        audienceIds: {
          en: {
            production: process.env.RESEND_AUDIENCE_ID || '',
            development: process.env.RESEND_AUDIENCE_ID || '',
          },
        },
      },
    },
  }),
  s3Storage({
    collections: {
      storage: {
        disableLocalStorage: true, // Recommended for production
        prefix: '',
        generateFileURL: (args: any) => {
          if (typeof args.filename !== 'string') return null as unknown as string
          return process.env.NODE_ENV == 'development'
            ? `${getServerSideURL()}/${args.prefix}/${args.filename}`
            : `https://bucket.nalongonansamba.com/${args.prefix}/${args.filename}`
        },
      },
    },
    bucket: process.env.R2_BUCKET || '',
    config: {
      endpoint: process.env.R2_ENDPOINT || 'https://bucket.nalongonansamba.com', // Protocol is required here
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      },
      region: 'auto', // Required for R2
      forcePathStyle: true, // Required for R2
    },
    disableLocalStorage: true,
    enabled: true,
    acl: 'private',
  }),
]
