import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { anyone, isModerator } from '@/functions/permissions'
import type { CollectionConfig } from 'payload'

export const Storage: CollectionConfig = {
  slug: 'storage',
  admin: {
    group: 'Management',
  },
  folders: true,
  trash: true,
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
    {
      name: 'prefix',
      type: 'text',
      defaultValue: '',
      admin: {
        description: 'Prefix is basically path name to which to structure the files',
        position: 'sidebar',
      },
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    disableLocalStorage: true,
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
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
