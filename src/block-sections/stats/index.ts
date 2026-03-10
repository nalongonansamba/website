import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Stats / Numbers', plural: 'Stats' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'row',
      options: [
        { label: 'Row (inline)', value: 'row' },
        { label: 'Grid', value: 'grid' },
        { label: 'Split (text left, stats right)', value: 'split' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (for split layout)',
      admin: {
        condition: (_data, siblingData) => siblingData?.layout === 'split',
      },
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value (e.g. "500+" or "20 years")',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Short description',
        },
      ],
    },
  ],
}
