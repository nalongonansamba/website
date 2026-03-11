import type { Content, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import { CollectionArchive } from '@/components/collection-archive'
import RichText from '@/components/rich-text'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let content: Content[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedContent = await payload.find({
      collection: 'content',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    content = fetchedContent.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedContent = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Content[]
      content = filteredSelectedContent
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-3xl" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive content={content} />
    </div>
  )
}
