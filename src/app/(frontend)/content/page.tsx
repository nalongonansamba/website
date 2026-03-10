import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/collection-archive'
import { PageRange } from '@/components/page-range'
import { Pagination } from '@/components/pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const content = await payload.find({
    collection: 'content',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="flex flex-col gap-0 max-w-none">
          <h1 className="text-3xl font-bold">Indigenous Healing & Botanical Wisdom</h1>
          <p className="text-muted-foreground md:max-w-md">
            Preserving our heritage through structured education on local herbs and sacred healing
            traditions.
          </p>
        </div>
      </div>

      <CollectionArchive posts={content.docs} />
      <div className="container mt-8">
        <PageRange
          collection="content"
          currentPage={content.page}
          limit={12}
          totalDocs={content.totalDocs}
        />
      </div>
      <div className="container">
        {content.totalPages > 1 && content.page && (
          <Pagination page={content.page} totalPages={content.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Indigenous Healing & Botanical Wisdom | Traditional Healers Uganda',
    description:
      'Master the sacred art of Ugandan traditional medicine. Authentic lessons on herbalism and ancestral healing methods from the President of Traditional Healers.',
    openGraph: {
      title: 'Indigenous Healing & Botanical Wisdom',
      description:
        'Preserving Ugandan heritage through structured education on local herbs and sacred healing traditions.',
      locale: 'en_UG',
      type: 'website',
    },
    keywords: [
      'Traditional Healing Uganda',
      'Ugandan Herbalism',
      'Indigenous Knowledge',
      'Botanical Medicine',
      'President of Traditional Healers',
      'Nalongo Nansamba',
    ],
  }
}
