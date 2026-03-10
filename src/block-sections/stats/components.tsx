import type { StatsBlock } from '@/payload-types'
import { cn } from '@/components/lib/utils'
import React from 'react'

export const Stats: React.FC<StatsBlock> = ({
  eyebrow,
  heading,
  description,
  layout = 'row',
  stats,
}) => {
  const statItems = (
    <>
      {stats?.map((stat, i) => (
        <div
          key={i}
          className={cn(
            'flex flex-col',
            layout === 'row' &&
              'items-center text-center px-6 first:pl-0 last:pr-0 border-r border-border last:border-0',
            layout === 'grid' && 'border border-border rounded-lg p-6',
            layout === 'split' && '',
          )}
        >
          <span
            className={cn(
              'font-bold tracking-tight leading-none',
              layout === 'grid' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl',
            )}
          >
            {stat.value}
          </span>
          <span className="text-sm font-semibold mt-2 text-foreground/80">{stat.label}</span>
          {stat.description && (
            <span className="text-xs text-muted-foreground mt-1">{stat.description}</span>
          )}
        </div>
      ))}
    </>
  )

  return (
    <section className="container my-20">
      {layout === 'split' ? (
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {eyebrow}
              </p>
            )}
            {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
            {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}
          </div>
          <div className="grid grid-cols-2 gap-6">{statItems}</div>
        </div>
      ) : (
        <>
          {(eyebrow || heading) && (
            <div className="mb-10 text-center">
              {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {eyebrow}
                </p>
              )}
              {heading && <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>}
            </div>
          )}
          <div
            className={cn(
              layout === 'row' && 'flex flex-wrap justify-center divide-x divide-border',
              layout === 'grid' && 'grid grid-cols-2 md:grid-cols-4 gap-5',
            )}
          >
            {statItems}
          </div>
        </>
      )}
    </section>
  )
}
