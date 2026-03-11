import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/collection-archive'
import { PageRange } from '@/components/page-range'
import { Pagination } from '@/components/pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import PageClient from './page.client'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const content = await payload.find({
    collection: 'content',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
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

      <CollectionArchive content={content.docs} />
      <div className="container mb-3">
        <PageRange
          collection="content"
          currentPage={content.page}
          limit={12}
          totalDocs={content.totalDocs}
        />
      </div>
      <div className="container">
        {content?.page && content?.totalPages > 1 && (
          <Pagination page={content.page} totalPages={content.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Indigenous Healing & Botanical Wisdom | Traditional Healers Uganda ${pageNumber || ''}`,
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

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'content',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
