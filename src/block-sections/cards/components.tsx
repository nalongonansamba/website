import type { CardsBlock } from '@/payload-types'
import { LinkManager } from '@/components/link-manager'
import { MediaPreview } from '@/components/media-storage'
import RichText from '@/components/rich-text'
import { cn } from '@/components/lib/utils'
import React from 'react'

const accentMap: Record<string, string> = {
  default: 'border-border',
  earth: 'border-amber-800/40',
  sage: 'border-green-700/40',
  gold: 'border-amber-400/50',
  clay: 'border-orange-700/40',
}

const accentTextMap: Record<string, string> = {
  default: 'text-muted-foreground',
  earth: 'text-amber-800',
  sage: 'text-green-700',
  gold: 'text-amber-500',
  clay: 'text-orange-700',
}

const bentoSpanMap: Record<string, string> = {
  normal: 'col-span-1 row-span-1',
  wide: 'col-span-2 row-span-1',
  tall: 'col-span-1 row-span-2',
  large: 'col-span-2 row-span-2',
}

const colsMap: Record<string, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
}

export const Cards: React.FC<CardsBlock> = (props) => {
  const {
    eyebrow,
    heading,
    subheading,
    layout = 'grid',
    columns = '3',
    cardStyle = 'flat',
    cards,
  } = props

  const isBento = layout === 'bento'
  const isRow = layout === 'row'

  return (
    <section className="container my-20">
      {/* Section header */}
      {(eyebrow || heading || subheading) && (
        <div className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{heading}</h2>
          )}
          {subheading && (
            <p className="text-muted-foreground text-lg leading-relaxed">{subheading}</p>
          )}
        </div>
      )}

      {/* Cards grid */}
      <div
        className={cn(
          isRow
            ? 'flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory'
            : isBento
              ? 'grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[16rem]'
              : layout === 'masonry'
                ? 'columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5'
                : cn('grid grid-cols-1 gap-5', colsMap[columns as any]),
        )}
      >
        {cards?.map((card, i) => {
          const {
            bentoSize = 'normal',
            icon,
            image,
            eyebrow: cardEyebrow,
            title,
            description,
            enableLink,
            link,
            accentColor = 'default',
          } = card

          const cardEl = (
            <article
              key={i}
              className={cn(
                'group relative flex flex-col overflow-hidden transition-all duration-300',
                isBento && bentoSpanMap[bentoSize as any],
                isRow && 'shrink-0 w-72 snap-start',
                layout === 'masonry' && 'break-inside-avoid mb-5',

                // Card style variants
                cardStyle === 'flat' && 'border-b border-border pb-6',
                cardStyle === 'carded' && [
                  'border border-border rounded-lg p-6',
                  'hover:shadow-lg hover:-translate-y-0.5',
                ],
                cardStyle === 'filled' && ['bg-muted/40 rounded-lg p-6', 'hover:bg-muted/70'],
                cardStyle === 'image-bg' && [
                  'rounded-lg overflow-hidden min-h-56',
                  'hover:shadow-xl hover:-translate-y-0.5',
                ],
              )}
            >
              {/* Image background style */}
              {cardStyle === 'image-bg' && image && typeof image === 'object' && (
                <>
                  <MediaPreview
                    fill
                    resource={image}
                    imgClassName="object-cover transition-transform duration-500 group-hover:scale-105 -z-10"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent -z-5" />
                </>
              )}

              {/* Non-bg image */}
              {cardStyle !== 'image-bg' && image && typeof image === 'object' && (
                <div className="mb-5 rounded-md overflow-hidden aspect-video">
                  <MediaPreview resource={image} imgClassName="w-full h-full object-cover" />
                </div>
              )}

              {/* Icon */}
              {icon && !image && (
                <div className={cn('text-3xl mb-4', accentTextMap[accentColor as any])}>{icon}</div>
              )}

              <div
                className={cn(
                  'flex flex-col flex-1',
                  cardStyle === 'image-bg' && 'mt-auto p-6 text-white',
                  cardStyle !== 'image-bg' && cardStyle !== 'flat' && '',
                )}
              >
                {/* Accent line for flat style */}
                {cardStyle === 'flat' && (
                  <div
                    className={cn(
                      'w-8 h-0.5 mb-4',
                      accentColor !== 'default'
                        ? accentTextMap[accentColor as any].replace('text-', 'bg-')
                        : 'bg-foreground',
                    )}
                  />
                )}

                {cardEyebrow && (
                  <p
                    className={cn(
                      'text-xs font-semibold uppercase tracking-widest mb-2',
                      cardStyle === 'image-bg'
                        ? 'text-white/60'
                        : accentTextMap[accentColor as any],
                    )}
                  >
                    {cardEyebrow}
                  </p>
                )}

                <h3
                  className={cn(
                    'font-semibold leading-snug mb-3',
                    isBento && bentoSize === 'large' ? 'text-2xl' : 'text-lg',
                    cardStyle === 'image-bg' ? 'text-white' : 'text-foreground',
                  )}
                >
                  {title}
                </h3>

                {description && (
                  <div
                    className={cn(
                      'text-sm leading-relaxed flex-1',
                      cardStyle === 'image-bg' ? 'text-white/80' : 'text-muted-foreground',
                    )}
                  >
                    <RichText data={description} enableGutter={false} />
                  </div>
                )}

                {enableLink && link && (
                  <div className="mt-4">
                    <LinkManager
                      {...link}
                      className={cn(
                        'text-sm font-medium underline-offset-4 hover:underline p-0 h-auto',
                        cardStyle === 'image-bg' ? 'text-white' : accentTextMap[accentColor as any],
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Carded accent border-top color */}
              {cardStyle === 'carded' && accentColor !== 'default' && (
                <div
                  className={cn(
                    'absolute top-0 left-0 right-0 h-0.5',
                    accentMap[accentColor as any].replace('border-', 'bg-'),
                  )}
                />
              )}
            </article>
          )

          return cardEl
        })}
      </div>
    </section>
  )
}
