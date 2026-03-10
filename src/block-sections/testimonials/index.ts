import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Label',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Large featured (1 big + side list)', value: 'featured' },
        { label: 'Masonry', value: 'masonry' },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Quote',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role / Location',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'storage',
          label: 'Avatar Image',
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured (larger display)',
          defaultValue: false,
        },
      ],
    },
  ],
}
