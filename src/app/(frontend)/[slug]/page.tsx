import { RenderBlocks } from '@/block-sections/render-blocks'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { PayloadRedirects } from '@/components/payload-redirects'
import { generateMeta } from '@/functions/config/generateMeta'
import { RenderHero } from '@/heroes-sections'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const route = await payload.find({
    collection: 'route',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = route.docs
    ?.filter((doc) => {
      return doc.slug !== 'introduction'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'introduction' } = await paramsPromise

  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let route: RequiredDataFromCollectionSlug<'route'> | null

  route = await queryRouteBySlug({ slug: decodedSlug })

  if (!route) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = route

  return (
    <article className="w-full pt-16 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'introduction' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const route = await queryRouteBySlug({ slug: decodedSlug })

  return generateMeta({ doc: route, type: 'website' })
}

const queryRouteBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'route',
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: draft,
    pagination: false,
    overrideAccess: false,
  })
  return result.docs[0] || null
})
