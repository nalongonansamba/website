'use client'

import useClickableCard from '@/functions/config/useClickableCard'
import { MediaPreview } from '@/components/media-storage'
import type { Content } from '@/payload-types'
import { cn } from '@/components/lib/utils'
import React, { Fragment } from 'react'
import Link from 'next/link'

export type CardPostData = Pick<Content, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'content'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-dashed border-border rounded-lg',
        'overflow-hidden bg-card hover:cursor-pointer shadow',
        'hover:shadow-2xl hover:scale-105 transition-all',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-t-md">
        {!metaImage ? (
          <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
            No image
          </div>
        ) : (
          <>
            {typeof metaImage !== 'string' && (
              <MediaPreview
                resource={metaImage}
                size="33vw"
                imgClassName="h-35 object-cover rounded-md"
              />
            )}
          </>
        )}
      </div>
      <Link
        // @ts-ignore
        href={href}
        ref={link.ref}
        className="flex flex-col gap-0 p-4 prose dark:prose-invert"
      >
        {showCategories && hasCategories && (
          <div className="uppercase text-xs">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category
                    const categoryTitle = titleFromCategory || 'Untitled category'
                    const isLast = index === categories.length - 1
                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && <h3 className="text-base">{titleToUse}</h3>}
        {description && <p className="text-xs line-clamp-3">{sanitizedDescription}</p>}
      </Link>
    </article>
  )
}
