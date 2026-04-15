'use client'

import type { AccordionBlock as AccoundionBlockProps } from '@/payload-types'
import RichText from '@/components/rich-text'
import { cn } from '@/components/lib/utils'
import React, { useState } from 'react'

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={cn('w-4 h-4 shrink-0 transition-transform duration-300', open && 'rotate-180')}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

export const Accordion: React.FC<AccoundionBlockProps> = ({
  eyebrow,
  heading,
  layout,
  style = 'bordered',
  allowMultiple,
  items,
}) => {
  const defaultOpen =
    items?.reduce((acc: Record<number, boolean>, item, i) => {
      if (item.defaultOpen) acc[i] = true
      return acc
    }, {}) || {}

  const [openItems, setOpenItems] = useState<Record<number, boolean>>(defaultOpen)

  const toggle = (i: number) => {
    setOpenItems((prev) => {
      if (allowMultiple) return { ...prev, [i]: !prev[i] }
      return prev[i] ? {} : { [i]: true }
    })
  }

  const accordionList = (
    <div
      className={cn(
        style === 'carded' && 'space-y-3',
        style === 'bordered' && 'divide-y divide-border',
        style === 'minimal' && 'space-y-1',
      )}
    >
      {items?.map((item, i) => {
        const isOpen = Boolean(openItems[i])
        return (
          <div
            key={i}
            className={cn(
              style === 'carded' && [
                'border border-border rounded-lg overflow-hidden',
                isOpen && 'border-foreground/20',
              ],
            )}
          >
            <button
              onClick={() => toggle(i)}
              className={cn(
                'w-full flex items-center justify-between gap-4 text-left transition-colors',
                'font-medium text-base',
                style === 'bordered' && 'py-5',
                style === 'carded' && 'px-5 py-4',
                style === 'minimal' && 'py-3',
                isOpen ? 'text-foreground' : 'text-foreground/80 hover:text-foreground',
              )}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronIcon open={isOpen} />
            </button>

            <div
              className={cn(
                'grid transition-all duration-300 ease-in-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    'text-muted-foreground text-sm leading-relaxed',
                    style === 'bordered' && 'pb-5',
                    style === 'carded' && 'px-5 pb-5',
                    style === 'minimal' && 'pb-3',
                  )}
                >
                  <RichText data={item.answer} enableGutter={false} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <section className="container md:max-w-7xl my-20">
      {layout === 'split' ? (
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20 items-start">
          <div className="md:sticky md:top-24">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {eyebrow}
              </p>
            )}
            {heading && <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>}
          </div>
          <div>{accordionList}</div>
        </div>
      ) : (
        <>
          {(eyebrow || heading) && (
            <div className="mb-10 max-w-2xl">
              {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{heading}</h2>
              )}
            </div>
          )}
          <div className="max-w-3xl">{accordionList}</div>
        </>
      )}
    </section>
  )
}
