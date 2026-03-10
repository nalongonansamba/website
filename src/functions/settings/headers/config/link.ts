import deepMerge from '@/functions/config/deepMerge'
import type { Field, GroupField } from 'payload'

export type LinkAppearances = 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: { label: 'Default', value: 'default' },
  outline: { label: 'Outline', value: 'outline' },
  ghost: { label: 'Ghost', value: 'ghost' },
  link: { label: 'Link', value: 'link' },
  destructive: { label: 'Destructive', value: 'destructive' },
  secondary: { label: 'Secondary', value: 'secondary' },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
              {
                label: 'Mega menu',
                value: 'mega',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
              condition: (_, siblingData) => siblingData?.type !== 'mega',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['route', 'content'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '100%',
      },
    }))
    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'storage',
          admin: {
            width: '100%',
            condition: (_, siblingData) => siblingData?.type === 'mega',
          },
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  const megaLinks = linkResult.fields.push({
    name: 'megaLinks',
    type: 'array',
    fields: [
      ...linkResult.fields,
      {
        name: 'description',
        type: 'textarea',
        admin: {
          width: '100%',
        },
      },
    ],
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'mega',
    },
  })

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.outline,
      appearanceOptions.ghost,
      appearanceOptions.link,
      appearanceOptions.destructive,
      appearanceOptions.secondary,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.type !== 'mega',
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  megaLinks

  return deepMerge(linkResult, overrides)
}
