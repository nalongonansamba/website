import type { ProcessStepsBlock } from '@/payload-types'
import { MediaPreview } from '@/components/media-storage'
import RichText from '@/components/rich-text'
import { cn } from '@/components/lib/utils'
import React from 'react'

export const ProcessSteps: React.FC<ProcessStepsBlock> = ({
  eyebrow,
  heading,
  subheading,
  layout = 'vertical',
  steps,
}) => {
  return (
    <section className="container my-20">
      {(eyebrow || heading || subheading) && (
        <div className="mb-14 max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{heading}</h2>
          )}
          {subheading && <p className="text-muted-foreground leading-relaxed">{subheading}</p>}
        </div>
      )}

      {/* Vertical */}
      {layout === 'vertical' && (
        <div className="max-w-2xl space-y-0">
          {steps?.map((step, i) => (
            <div key={i} className="flex gap-6 group">
              {/* Number + connector line */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  {step.icon || String(i + 1).padStart(2, '0')}
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-border my-2 min-h-8" />}
              </div>
              <div className={cn('pb-10', i === steps.length - 1 && 'pb-0')}>
                <h3 className="font-semibold text-lg mb-2 leading-snug">{step.title}</h3>
                {step.description && (
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    <RichText data={step.description} enableGutter={false} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Horizontal timeline */}
      {layout === 'horizontal' && (
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-0 right-0 h-px bg-border hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps?.map((step, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center gap-3 md:flex-col md:items-start mb-4">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-background border-2 border-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    {step.icon || i + 1}
                  </div>
                  <span className="text-xs text-muted-foreground md:mt-2">Step {i + 1}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                {step.description && (
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <RichText data={step.description} enableGutter={false} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alternating zigzag */}
      {layout === 'alternating' && (
        <div className="space-y-20">
          {steps?.map((step, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={i}
                className={cn(
                  'grid md:grid-cols-2 gap-10 items-center',
                  !isEven && 'md:[&>*:first-child]:order-last',
                )}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-black text-muted-foreground/20 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {step.icon && <span className="text-2xl">{step.icon}</span>}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  {step.description && (
                    <div className="text-muted-foreground leading-relaxed">
                      <RichText data={step.description} enableGutter={false} />
                    </div>
                  )}
                </div>
                {step.image && typeof step.image === 'object' ? (
                  <div className="rounded-lg overflow-hidden aspect-4/3">
                    <MediaPreview resource={step.image} imgClassName="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="rounded-lg bg-muted aspect-4/3 flex items-center justify-center text-6xl">
                    {step.icon || '✦'}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
