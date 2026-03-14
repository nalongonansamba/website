import type { Metadata } from 'next'

import type { Storage, Route, Content, Config } from '@/payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Storage | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/website-template-OG.webp'
  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.thumbnail?.url
    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }
  return url
}

export const generateMeta = async (args: {
  doc: Partial<Route> | Partial<Content> | null
  type: 'website' | 'article' | 'blog' | 'news' | 'video' | 'audio' | 'image' | 'other'
}): Promise<Metadata> => {
  const { doc } = args
  const ogImage = getImageURL(doc?.meta?.image)
  const title = doc?.meta?.title ? doc?.meta?.title : ''
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug || ''
  const canonicalUrl = `${getServerSideURL()}/${slug}`
  const keywords: string[] =
    doc?.meta?.keywords
      ?.map((keyword) => (typeof keyword === 'object' ? keyword.title : keyword))
      .filter(Boolean) || []

  const isBlog = doc && 'authors' in doc && Array.isArray(doc.authors) && doc.authors.length > 0

  return {
    metadataBase: new URL(getServerSideURL()),
    description: doc?.meta?.description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      type: ((args.type as any) ?? isBlog) ? 'article' : 'website',
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      ...(isBlog && {
        other: {
          'article:published_time': doc.publishedAt || '',
          'article:author': doc.authors
            ?.map((a) => (typeof a === 'object' ? a.username : a))
            .join(', '),
        },
      }),
    }),
    title,
  }
}
