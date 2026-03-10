import { MediaPreview } from '@/components/media-storage'
import { LinkManager } from '@/components/link-manager'
import RichText from '@/components/rich-text'
import type { Route } from '@/payload-types'
import { FC } from 'react'
import { cn } from '@/components/lib/utils'

export const MediumImpactHero: FC<Route['hero']> = ({ links, media, richText }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="container relative z-10 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0 py-20 lg:py-28">
        {/* LEFT — text + CTAs */}
        <div className="flex-none w-full lg:w-[45%] lg:pr-16">
          {richText && (
            <RichText
              className={cn(
                'mb-10 [&_h1]:leading-none [&_h1]:tracking-tight',
                '[&_p]:text-base [&_p]:text-muted-foreground [&_p]:mt-4 [&_p]:max-w-md',
              )}
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-row flex-wrap gap-3">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <LinkManager
                    {...link}
                    className={cn(
                      'h-11 px-6 rounded-none text-sm font-medium tracking-wide',
                      // First link = primary solid, rest = ghost/outline
                      i === 0
                        ? 'bg-foreground text-background hover:bg-foreground/90'
                        : 'border border-border bg-transparent hover:bg-muted',
                    )}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT — floating/overlapping media panels like the reference */}
        {media && typeof media === 'object' && (
          <div className="relative w-full lg:w-[55%] lg:pl-8">
            {/* Main media — slightly rotated, offset, with sharp shadow */}
            <div
              className={cn(
                'relative z-10 rounded-2xl overflow-hidden',
                'shadow-[0_32px_80px_-12px_rgba(0,0,0,0.6)]',
                'lg:translate-x-8 lg:-translate-y-4 max-h-[60vh]',
                'ring-1 ring-white/10 bg-primary opacity-50 mix-blend-color',
              )}
            >
              <MediaPreview imgClassName="w-full h-auto object-cover" priority resource={media} />
            </div>

            <div
              className={cn(
                'absolute hidden lg:block',
                '-bottom-8 -right-4 z-20',
                'w-[45%] rounded-2xl overflow-hidden',
                'shadow-[0_24px_60px_-8px_rgba(0,0,0,0.7)]',
                'ring-1 ring-white/10 max-h-[25vh]',
                'translate-y-4',
              )}
            >
              <MediaPreview imgClassName="w-full h-auto object-cover" priority resource={media} />
            </div>

            {/* Caption */}
            {media?.caption && (
              <div className="mt-6 lg:mt-3">
                <RichText
                  data={media.caption}
                  enableGutter={false}
                  className="[&_p]:text-xs [&_p]:text-muted-foreground"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subtle radial glow — no background, just a hint of depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 50%, hsl(var(--primary)/0.06) 0%, transparent 70%)',
        }}
      />
    </section>
  )
}
