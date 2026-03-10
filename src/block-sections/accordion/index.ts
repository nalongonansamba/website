import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  labels: { singular: 'Accordion / FAQ', plural: 'Accordions' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'full',
      label: 'Layout',
      options: [
        { label: 'Full width', value: 'full' },
        { label: 'Two column (heading + items)', value: 'split' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'bordered',
      label: 'Style',
      options: [
        { label: 'Bordered (lines between)', value: 'bordered' },
        { label: 'Carded (each item boxed)', value: 'carded' },
        { label: 'Minimal (no lines)', value: 'minimal' },
      ],
    },
    {
      name: 'allowMultiple',
      type: 'checkbox',
      label: 'Allow multiple items open',
      defaultValue: false,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question / Title',
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          label: 'Answer / Content',
          editor: lexicalEditor({}),
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          label: 'Open by default',
          defaultValue: false,
        },
      ],
    },
  ],
}
