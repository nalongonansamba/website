import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { link } from '@/functions/settings/headers/config/link'

export const HerbSpotlight: Block = {
  slug: 'herbSpotlight',
  interfaceName: 'HerbSpotlightBlock',
  labels: { singular: 'Herb / Remedy Spotlight', plural: 'Herb Spotlights' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Featured Remedy',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'imageLeft',
      options: [
        { label: 'Image left', value: 'imageLeft' },
        { label: 'Image right', value: 'imageRight' },
        { label: 'Image background (full bleed)', value: 'imageBg' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'storage',
      required: true,
      label: 'Herb / Plant Image',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'localName',
      type: 'text',
      label: 'Local / Traditional Name',
    },
    {
      name: 'scientificName',
      type: 'text',
      label: 'Scientific Name',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({}),
    },
    {
      name: 'properties',
      type: 'array',
      label: 'Healing Properties / Uses',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'property',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Add link (Learn more)',
    },
    link({
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
  ],
}
