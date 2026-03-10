import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ProcessSteps: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  labels: { singular: 'Process / Steps', plural: 'Process Steps' },
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
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'vertical',
      options: [
        { label: 'Vertical (numbered list)', value: 'vertical' },
        { label: 'Horizontal (timeline)', value: 'horizontal' },
        { label: 'Alternating (zigzag)', value: 'alternating' },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (emoji)',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({}),
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'storage',
          label: 'Step Image (for alternating layout)',
        },
      ],
    },
  ],
}
