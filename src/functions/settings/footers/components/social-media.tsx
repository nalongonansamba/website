'use client'

import { cn } from '@/components/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Footer } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type SocialMediaProps = {
  links: Footer['socialMediaHandles']
}

type SocialDetails = {
  brand: string
  label: string
  logo: string
  color: string
}

const BRAND_MAP: Record<string, Omit<SocialDetails, 'logo'>> = {
  // Short domains / aliases
  t: { brand: 'telegram', label: 'Telegram', color: '#229ED9' },
  wa: { brand: 'whatsapp', label: 'WhatsApp', color: '#25D366' },
  x: { brand: 'x', label: 'X', color: '#000000' },
  // Full hostnames (before first dot)
  twitter: { brand: 'x', label: 'X', color: '#000000' },
  telegram: { brand: 'telegram', label: 'Telegram', color: '#229ED9' },
  whatsapp: { brand: 'whatsapp', label: 'WhatsApp', color: '#25D366' },
  github: { brand: 'github', label: 'GitHub', color: '#181717' },
  linkedin: { brand: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
  instagram: { brand: 'instagram', label: 'Instagram', color: '#E4405F' },
  facebook: { brand: 'facebook', label: 'Facebook', color: '#1877F2' },
  fb: { brand: 'facebook', label: 'Facebook', color: '#1877F2' },
  youtube: { brand: 'youtube', label: 'YouTube', color: '#FF0000' },
  youtu: { brand: 'youtube', label: 'YouTube', color: '#FF0000' },
  tiktok: { brand: 'tiktok', label: 'TikTok', color: '#010101' },
  discord: { brand: 'discord', label: 'Discord', color: '#5865F2' },
  reddit: { brand: 'reddit', label: 'Reddit', color: '#FF4500' },
  pinterest: { brand: 'pinterest', label: 'Pinterest', color: '#E60023' },
  twitch: { brand: 'twitch', label: 'Twitch', color: '#9146FF' },
  snapchat: { brand: 'snapchat', label: 'Snapchat', color: '#FFFC00' },
  threads: { brand: 'threads', label: 'Threads', color: '#000000' },
  mastodon: { brand: 'mastodon', label: 'Mastodon', color: '#6364FF' },
  bluesky: { brand: 'bluesky', label: 'Bluesky', color: '#0085FF' },
  bsky: { brand: 'bluesky', label: 'Bluesky', color: '#0085FF' },
  medium: { brand: 'medium', label: 'Medium', color: '#000000' },
  substack: { brand: 'substack', label: 'Substack', color: '#FF6719' },
  behance: { brand: 'behance', label: 'Behance', color: '#1769FF' },
  dribbble: { brand: 'dribbble', label: 'Dribbble', color: '#EA4C89' },
  figma: { brand: 'figma', label: 'Figma', color: '#F24E1E' },
  producthunt: { brand: 'producthunt', label: 'Product Hunt', color: '#DA552F' },
}

const FALLBACK: SocialDetails = {
  brand: 'googlechrome',
  label: 'Website',
  logo: 'https://cdn.simpleicons.org/googlechrome',
  color: '#6B7280',
}

function getSocialDetails(raw: string | null | undefined): SocialDetails {
  if (!raw) return FALLBACK
  const input = raw.trim()

  let hostname = ''
  try {
    const withScheme = /^https?:\/\//i.test(input) ? input : `https://${input}`
    hostname = new URL(withScheme).hostname
  } catch {}

  if (hostname) {
    const clean = hostname.replace(/^(www\.|m\.)/, '')
    const key = clean.split('.')[0].toLowerCase()
    const match = BRAND_MAP[key]
    if (match) return { ...match, logo: `https://cdn.simpleicons.org/${match.brand}` }
    return { brand: 'link', label: clean, logo: FALLBACK.logo, color: FALLBACK.color }
  }

  if (input.startsWith('@')) return { ...FALLBACK, label: input }

  const key = input.toLowerCase().replace(/[^a-z]/g, '')
  const match = BRAND_MAP[key]
  if (match) return { ...match, logo: `https://cdn.simpleicons.org/${match.brand}` }

  return FALLBACK
}

function buildHref(raw: string | null | undefined): string {
  if (!raw) return '#'
  const input = raw.trim()
  if (/^https?:\/\//i.test(input)) return input
  if (input.startsWith('@') || !input.includes('.')) return '#'
  return `https://${input}`
}

export function SocialMedia({ links }: SocialMediaProps) {
  if (!links || links.length === 0) return null

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold tracking-tight">Our social media handles</h2>
      <div className="flex flex-wrap gap-3">
        {links.map(({ id, name, url }, index) => {
          const details = getSocialDetails(url)
          const href = buildHref(url)
          const isExternal = href !== '#'
          const displayName = name?.trim() || details.label
          const key = id ?? url ?? `social-${index}`

          return (
            <Link
              key={key}
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              aria-disabled={!isExternal || undefined}
              className={cn(
                buttonVariants({
                  size: 'lg',
                  variant: 'secondary',
                  className:
                    'group h-fit flex items-center gap-1 rounded-full border py-2 pl-2 pr-4 transition-all duration-200',
                }),
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200">
                <Image
                  src={details.logo}
                  alt=""
                  aria-hidden
                  width={18}
                  height={18}
                  className="transition-all duration-200 group-hover:invert"
                  unoptimized // SVGs from CDN don't need Next.js optimisation
                />
              </div>
              <span className="text-sm font-medium transition-colors duration-200">
                {displayName}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
