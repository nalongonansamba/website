'use client'

import { useHeaderTheme } from '@/theme-provider/header-theme'
import { MediaPreview } from '@/components/media-storage'
import { LinkManager } from '@/components/link-manager'
import RichText from '@/components/rich-text'
import type { Route } from '@/payload-types'
import { FC, useEffect } from 'react'

export const HighImpactHero: FC<Route['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] h-[90vh] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mt-[10.4rem] z-10 relative flex flex-col h-full justify-center">
        <div className="max-w-146 md:text-start">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-start gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <LinkManager {...link} className="h-10 px-5 rounded" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[90vh] select-none">
        {media && typeof media === 'object' && (
          <MediaPreview
            fill
            className=""
            imgClassName="-z-10 object-cover"
            priority
            resource={media}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-5/6 bg-linear-to-t from-background dark:from-background to-background/5 via-transparent" />
      </div>
    </div>
  )
}
