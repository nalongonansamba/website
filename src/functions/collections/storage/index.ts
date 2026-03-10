import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import { anyone, isModerator } from '@/functions/permissions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Storage: CollectionConfig = {
  slug: 'storage',
  admin: {
    group: 'Management',
  },
  access: {
    admin: isModerator,
    read: anyone,
    update: isModerator,
    delete: isModerator,
    unlock: isModerator,
    readVersions: isModerator,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
    ],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
  },
}
