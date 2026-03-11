import type { Metadata } from 'next'

import { RelatedContent } from '@/block-sections/related-content'
import { PayloadRedirects } from '@/components/payload-redirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import RichText from '@/components/rich-text'
import { ContentHero } from '@/heroes-sections/content-hero'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { generateMeta } from '@/functions/config/generateMeta'
import PageClient from '../page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const content = await payload.find({
    collection: 'content',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = content.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function RouteComponent({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/content/' + decodedSlug
  const content = await queryPostBySlug({ slug: decodedSlug })

  if (!content) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />
      {/* Allows redirects for valid Route too */}
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <ContentHero post={content} />
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-3xl mx-auto" data={content.content} enableGutter={false} />
          {content.relatedContent && content.relatedContent.length > 0 && (
            <RelatedContent
              className="mt-12 max-w-208 lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={content.relatedContent.filter((ctn) => typeof ctn === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'content',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
