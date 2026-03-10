import type { CollectionBeforeChangeHook } from 'payload'
import type { FolderInterface, Storage } from '@/payload-types'

export const beforeChangeHook: CollectionBeforeChangeHook<Storage> = async ({ data, req }) => {
  const prefix = data.prefix?.trim()
  if (!prefix || typeof prefix !== 'string') return data
  const parts = prefix.replace(/^\/|\/$/g, '').split('/')
  if (parts.length === 0) return data
  let parentId: string | null = null
  let resolvedFolder: FolderInterface | null = null
  for (const name of parts) {
    // First, try to find the folder
    const res: {
      docs: FolderInterface[]
      totalDocs: number
      hasNextPage: boolean
    } = await req.payload.find({
      collection: 'payload-folders',
      where: {
        name: { equals: name },
        ...(parentId ? { folder: { equals: parentId } } : { folder: { exists: false } }),
      },
      limit: 1,
    })

    if (res.docs.length > 0) {
      resolvedFolder = res.docs[0]
      parentId = resolvedFolder.id
    } else {
      // Create the folder if it doesn't exist
      const created = await req.payload.create({
        collection: 'payload-folders',
        data: {
          name,
          ...(parentId ? { folder: parentId } : {}),
        },
      })
      resolvedFolder = created as FolderInterface
      parentId = resolvedFolder.id
    }
  }

  if (resolvedFolder) {
    data.folder = resolvedFolder.id
  }

  return data
}
