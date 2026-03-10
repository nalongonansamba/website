import type { Block } from 'payload'

export const PullQuote: Block = {
  slug: 'pullQuote',
  interfaceName: 'PullQuoteBlock',
  labels: { singular: 'Pull Quote', plural: 'Pull Quotes' },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote text',
    },
    {
      name: 'attribution',
      type: 'text',
      label: 'Attribution (name)',
    },
    {
      name: 'attributionRole',
      type: 'text',
      label: 'Role / Title',
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'centered',
      options: [
        { label: 'Centered large', value: 'centered' },
        { label: 'Left border', value: 'leftBorder' },
        { label: 'Full bleed', value: 'fullBleed' },
      ],
    },
  ],
}
