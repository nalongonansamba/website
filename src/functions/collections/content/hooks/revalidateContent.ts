import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Content } from '@/payload-types'

export const revalidatePost: CollectionAfterChangeHook<Content> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/content/${doc.slug}`
      payload.logger.info(`Revalidating content at path: ${path}`)
      revalidatePath(path)
      revalidateTag('content-sitemap', { expire: 0 })
    }
    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/content/${previousDoc.slug}`
      payload.logger.info(`Revalidating old content at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag('content-sitemap', { expire: 0 })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Content> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/content/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('content-sitemap', { expire: 0 })
  }
  return doc
}
