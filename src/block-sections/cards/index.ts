import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { link } from '@/functions/settings/headers/config/link'

export const Cards: Block = {
  slug: 'cards',
  interfaceName: 'CardsBlock',
  labels: { singular: 'Cards', plural: 'Cards' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
      admin: { description: 'Small label above the heading (e.g. "Our Services")' },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      label: 'Layout Style',
      options: [
        { label: 'Grid (equal columns)', value: 'grid' },
        { label: 'Bento (mixed sizes)', value: 'bento' },
        { label: 'Masonry (auto height)', value: 'masonry' },
        { label: 'Row (horizontal scroll)', value: 'row' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      label: 'Columns (grid layout)',
      admin: {
        condition: (_data, siblingData) => siblingData?.layout === 'grid',
      },
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'cardStyle',
      type: 'select',
      defaultValue: 'flat',
      label: 'Card Style',
      options: [
        { label: 'Flat (no border/shadow)', value: 'flat' },
        { label: 'Carded (border + shadow)', value: 'carded' },
        { label: 'Filled (background color)', value: 'filled' },
        { label: 'Image Background', value: 'image-bg' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'bentoSize',
          type: 'select',
          defaultValue: 'normal',
          label: 'Bento Size',
          admin: {
            description: 'Only applies when layout is set to Bento',
            condition: (_data) => _data?.layout === 'bento',
          },
          options: [
            { label: 'Normal (1×1)', value: 'normal' },
            { label: 'Wide (2×1)', value: 'wide' },
            { label: 'Tall (1×2)', value: 'tall' },
            { label: 'Large (2×2)', value: 'large' },
          ],
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (emoji or symbol)',
          admin: { description: 'e.g. 🌿 or ✦' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'storage',
          label: 'Image',
        },
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Card Eyebrow',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          editor: lexicalEditor({}),
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Add Link',
        },
        link({
          overrides: {
            admin: {
              condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
        {
          name: 'accentColor',
          type: 'select',
          label: 'Accent Color',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Earth (warm brown)', value: 'earth' },
            { label: 'Sage (muted green)', value: 'sage' },
            { label: 'Gold (amber)', value: 'gold' },
            { label: 'Clay (terracotta)', value: 'clay' },
          ],
        },
      ],
    },
  ],
}
