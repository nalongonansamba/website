import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  LinkFields,
  ParagraphFeature,
  UnderlineFeature,
  AlignFeature,
  OrderedListFeature,
  UnorderedListFeature,
  IndentFeature,
  UploadFeature,
  EXPERIMENTAL_TableFeature,
} from '@payloadcms/richtext-lexical'

export const lexicalEditorConfig = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      AlignFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      IndentFeature(),
      UploadFeature({}),
      EXPERIMENTAL_TableFeature(),
      LinkFeature({
        enabledCollections: ['route', 'content'],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ('name' in field && field.name === 'url') return false
            return true
          })

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
              validate: ((value, options) => {
                if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                  return true // no validation needed, as no url should exist for internal links
                }
                return value ? true : 'URL is required'
              }) as TextFieldSingleValidation,
            },
          ]
        },
      }),
    ]
  },
})
