import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { CollectionConfig, slugField } from 'payload'
import { revalidateDelete, revalidateRoute } from './hooks/revalidateRoute'
import { populatePublishedAt } from '@/functions/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/functions/config/generatePreviewPath'
import {
  Accordion,
  Archive,
  CallToAction,
  Cards,
  Content,
  HerbSpotlight,
  MediaBlock,
  ProcessSteps,
  PullQuote,
  Stats,
  Testimonials,
} from '@/block-sections'
import { Banner } from '@/block-sections/banner'
import { heroes } from '@/heroes-sections'
import { FormBlock } from '@/block-sections/forms'
import { anyone, isModerator } from '@/functions/permissions'

export const Routes: CollectionConfig = {
  slug: 'route',
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
    group: 'Website Content',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'route',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'route',
        req,
      }),
  },
  defaultPopulate: {
    title: true,
    slug: true,
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [heroes],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Content,
                Banner,
                Archive,
                CallToAction,
                MediaBlock,
                FormBlock,
                Accordion,
                Cards,
                HerbSpotlight,
                ProcessSteps,
                PullQuote,
                Stats,
                Testimonials,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'storage',
            }),
            {
              name: 'keywords',
              type: 'relationship',
              relationTo: 'keywords',
              hasMany: true,
            },
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateRoute],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 10, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
