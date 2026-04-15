import type { PullQuoteBlock } from '@/payload-types'
import { cn } from '@/components/lib/utils'
import React from 'react'

export const PullQuote: React.FC<PullQuoteBlock> = ({
  quote,
  attribution,
  attributionRole,
  style = 'centered',
}) => {
  if (style === 'centered') {
    return (
      <section className="container md:max-w-7xl my-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-tight text-foreground/90 mb-8">
            "{quote}"
          </p>
          {attribution && (
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-border" />
              <div className="text-center">
                <p className="text-sm font-semibold">{attribution}</p>
                {attributionRole && (
                  <p className="text-xs text-muted-foreground">{attributionRole}</p>
                )}
              </div>
              <div className="w-8 h-px bg-border" />
            </div>
          )}
        </div>
      </section>
    )
  }

  if (style === 'leftBorder') {
    return (
      <section className="container my-16">
        <div className="max-w-2xl border-l-4 border-foreground pl-8 py-2">
          <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/90 mb-4">
            "{quote}"
          </p>
          {attribution && (
            <div>
              <p className="text-sm font-semibold">{attribution}</p>
              {attributionRole && (
                <p className="text-xs text-muted-foreground">{attributionRole}</p>
              )}
            </div>
          )}
        </div>
      </section>
    )
  }

  // Full bleed
  return (
    <section className="my-20 bg-muted/30 border-y border-border">
      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-10">
            "{quote}"
          </p>
          {attribution && (
            <div>
              <p className="text-sm font-semibold">{attribution}</p>
              {attributionRole && (
                <p className="text-xs text-muted-foreground mt-1">{attributionRole}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
