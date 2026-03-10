import type { TestimonialsBlock } from '@/payload-types'
import { MediaPreview } from '@/components/media-storage'
import { cn } from '@/components/lib/utils'
import React from 'react'

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-muted-foreground/30" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

const TestimonialCard = ({ testimonial, large = false }: { testimonial: any; large?: boolean }) => (
  <div
    className={cn(
      'flex flex-col border border-border rounded-lg p-6 h-full',
      large && 'p-8 md:p-10',
    )}
  >
    <QuoteIcon />
    <blockquote
      className={cn(
        'mt-4 mb-6 flex-1 leading-relaxed text-foreground/90',
        large ? 'text-xl md:text-2xl font-light' : 'text-sm',
      )}
    >
      "{testimonial.quote}"
    </blockquote>
    <div className="flex items-center gap-3 mt-auto">
      {testimonial.avatar && typeof testimonial.avatar === 'object' && (
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-muted">
          <MediaPreview resource={testimonial.avatar} imgClassName="w-full h-full object-cover" />
        </div>
      )}
      {!testimonial.avatar && (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground shrink-0">
          {testimonial.name?.[0]}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold">{testimonial.name}</p>
        {testimonial.role && <p className="text-xs text-muted-foreground">{testimonial.role}</p>}
      </div>
    </div>
  </div>
)

export const Testimonials: React.FC<TestimonialsBlock> = ({
  eyebrow,
  heading,
  layout = 'grid',
  testimonials,
}) => {
  const featured = testimonials?.find((t) => t.featured)
  const rest = testimonials?.filter((t) => !t.featured)

  return (
    <section className="container my-20">
      {(eyebrow || heading) && (
        <div className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {eyebrow}
            </p>
          )}
          {heading && <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{heading}</h2>}
        </div>
      )}

      {layout === 'featured' && (
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-5">
          {featured && <TestimonialCard testimonial={featured} large />}
          <div className="flex flex-col gap-5">
            {rest?.slice(0, 3).map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </div>
      )}

      {layout === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials?.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} large={t.featured!!} />
          ))}
        </div>
      )}

      {layout === 'masonry' && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
          {testimonials?.map((t, i) => (
            <div key={i} className="break-inside-avoid mb-5">
              <TestimonialCard testimonial={t} large={t.featured!!} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
