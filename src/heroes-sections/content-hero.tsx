import { formatDateTime } from '@/functions/config/formatDateTime'
import { formatAuthors } from '@/functions/config/formatAuthors'
import type { Content } from '@/payload-types'
import React from 'react'
import { MediaPreview } from '@/components/media-storage'
import { cn } from '@/components/lib/utils'

export const ContentHero: React.FC<{ post: Content }> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-[10.4rem] min-h-[92vh] flex items-end">
      {/* Background image — full bleed */}
      {heroImage && typeof heroImage !== 'string' && (
        <MediaPreview
          fill
          priority
          imgClassName="object-cover object-center -z-10"
          resource={heroImage}
        />
      )}

      {/* Gradient — stronger, longer fade for legibility */}
      <div className="absolute inset-0 -z-5 bg-linear-to-t from-black via-black/60 to-transparent" />
      {/* Left-edge darkening so text on left always reads clearly */}
      <div className="absolute inset-0 -z-5 bg-linear-to-r from-black/50 to-transparent" />

      {/* Content — anchored to bottom */}
      <div className="container relative z-10 pb-12 md:pb-16 pt-32 max-w-5xl">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {categories.map((category, index) => {
              if (typeof category !== 'object' || !category) return null
              return (
                <span
                  key={index}
                  className="text-xs font-semibold uppercase tracking-widest text-white/70 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                >
                  {category.title || 'Untitled'}
                </span>
              )
            })}
          </div>
        )}

        {/* Title */}
        <h1
          className={cn(
            'text-white font-bold leading-[1.05] tracking-tight mb-8',
            'text-2xl sm:text-3xl md:text-5xl',
            'max-w-4xl',
          )}
        >
          {title}
        </h1>

        {/* Divider */}
        <div className="w-16 h-px bg-white/30 mb-6" />

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {hasAuthors && (
            <div className="flex flex-col gap-0.5">
              <p className="text-white/50 text-xs uppercase tracking-wider">Author</p>
              <p className="text-white text-sm font-medium">{formatAuthors(populatedAuthors)}</p>
            </div>
          )}
          {publishedAt && (
            <div className="flex flex-col gap-0.5">
              <p className="text-white/50 text-xs uppercase tracking-wider">Date Published</p>
              <time className="text-white text-sm font-medium" dateTime={publishedAt}>
                {formatDateTime(publishedAt)}
              </time>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
