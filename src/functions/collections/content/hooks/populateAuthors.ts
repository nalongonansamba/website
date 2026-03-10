import type { CollectionAfterReadHook } from 'payload'
import { Account, Content } from '@/payload-types'

export const populateAuthors: CollectionAfterReadHook<Content> = async ({
  doc,
  req,
  req: { payload },
}) => {
  if (doc?.authors && doc?.authors?.length > 0) {
    const authorDocs: Account[] = []
    for (const author of doc.authors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'account',
          depth: 0,
        })

        if (authorDoc) {
          authorDocs.push(authorDoc)
        }

        if (authorDocs.length > 0) {
          doc.populatedAuthors = authorDocs.map((authorDoc) => ({
            id: authorDoc.id,
            name: authorDoc.username,
            bio: authorDoc.bio,
            email: authorDoc.email,
          }))
        }
      } catch {
        // swallow error
      }
    }
  }

  return doc
}
