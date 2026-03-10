import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { LinkManager } from '@/components/link-manager'
import RichText from '@/components/rich-text'
import { cn } from '@/components/lib/utils'
import React from 'react'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col
            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className={cn(
                      '[&_img]:rounded-md [&_img]:shadow [&_img]:cursor-pointer [&_img]:hover:shadow-2xl',
                    )}
                  />
                )}
                {enableLink && <LinkManager {...link} className="h-10 px-5 rounded" />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
