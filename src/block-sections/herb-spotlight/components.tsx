import type { HerbSpotlightBlock } from '@/payload-types'
import { LinkManager } from '@/components/link-manager'
import { MediaPreview } from '@/components/media-storage'
import RichText from '@/components/rich-text'
import { cn } from '@/components/lib/utils'
import React from 'react'

export const HerbSpotlight: React.FC<HerbSpotlightBlock> = ({
  eyebrow,
  layout = 'imageLeft',
  image,
  name,
  localName,
  scientificName,
  description,
  properties,
  enableLink,
  link,
}) => {
  const isImageBg = layout === 'imageBg'
  const isImageRight = layout === 'imageRight'

  if (isImageBg) {
    return (
      <section className="relative my-20 overflow-hidden rounded-xl min-h-[60vh] flex items-end">
        {image && typeof image === 'object' && (
          <MediaPreview fill resource={image} imgClassName="object-cover -z-10" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent -z-5" />
        <div className="relative z-10 p-10 md:p-14 text-white max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl font-bold mb-1">{name}</h2>
          {localName && <p className="text-white/70 text-lg mb-1">{localName}</p>}
          {scientificName && <p className="italic text-white/50 text-sm mb-6">{scientificName}</p>}
          {description && (
            <div className="text-white/80 leading-relaxed mb-6 max-w-lg">
              <RichText data={description} enableGutter={false} />
            </div>
          )}
          {properties && properties.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {properties.map((p, i) => (
                <span
                  key={i}
                  className="text-xs border border-white/30 text-white/80 px-3 py-1 rounded-full"
                >
                  {p.property}
                </span>
              ))}
            </div>
          )}
          {enableLink && link && <LinkManager {...link} className="h-10 px-6 rounded" />}
        </div>
      </section>
    )
  }

  return (
    <section className="container my-20">
      <div
        className={cn(
          'grid md:grid-cols-2 gap-10 md:gap-16 items-center',
          isImageRight && 'md:[&>*:first-child]:order-last',
        )}
      >
        {/* Image */}
        <div className="relative max-h-[380px]">
          <div className="rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
            {image && typeof image === 'object' && (
              <MediaPreview
                resource={image}
                imgClassName="w-full h-full rounded-md object-contain p-5 mix-blend-multiply dark:mix-blend-lighten max-h-[360px]"
              />
            )}
          </div>
          {/* Decorative botanical frame */}
          <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl border border-border -z-10" />
        </div>

        {/* Content */}
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-1">{name}</h2>
          {localName && <p className="text-muted-foreground text-lg mb-1">{localName}</p>}
          {scientificName && (
            <p className="italic text-muted-foreground/60 text-sm mb-6">{scientificName}</p>
          )}

          {description && (
            <div className="text-muted-foreground leading-relaxed mb-8">
              <RichText data={description} enableGutter={false} />
            </div>
          )}

          {properties && properties.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Healing Properties
              </p>
              <div className="flex flex-wrap gap-2">
                {properties.map((p, i) => (
                  <span
                    key={i}
                    className="text-xs border border-border px-3 py-1.5 rounded-full text-foreground/80 hover:border-foreground/40 transition-colors"
                  >
                    {p.property}
                  </span>
                ))}
              </div>
            </div>
          )}

          {enableLink && link && <LinkManager {...link} className="h-10 px-6 rounded" />}
        </div>
      </div>
    </section>
  )
}
