import { getServerSideURL } from '@/functions/config/getURL'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const url: string = getServerSideURL()

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/admin',
      },
      {
        userAgent: ['Bingbot', 'SemrushBot', 'ChatGPT'],
        disallow: '/',
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  }
}
