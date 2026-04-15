'use client'

import { cn } from '@/components/lib/utils'
import { FC, useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { LinkManager, MegaLinkItem } from '../link-manager'
import { Button } from '../ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { ChevronDown } from '@hugeicons/core-free-icons'
import { MediaPreview } from '@/components/media-storage'
import { Storage } from '@/payload-types'

export const MegaMenu: FC<{
  className?: string
  links: MegaLinkItem[]
  label?: string | null
  image?: string | Storage | null | undefined
}> = ({ links, label, className, image }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [headerBottom, setHeaderBottom] = useState(48)
  const triggerRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 100)
  }, [])

  const handleTriggerEnter = () => {
    cancelClose()
    const header = triggerRef.current?.closest('header')
    if (header) setHeaderBottom(header.getBoundingClientRect().bottom)
    setIsOpen(true)
  }

  const dropdown = (
    <div
      className={cn(
        'fixed inset-x-0 z-50 w-full transition-all duration-300',
        'bg-muted/15 backdrop-blur-3xl border-b border-border',
        isOpen
          ? 'visible opacity-100 translate-y-0'
          : 'invisible opacity-0 -translate-y-2 pointer-events-none',
      )}
      style={{ top: headerBottom }}
      onMouseEnter={cancelClose} // ✅ cursor arrived — cancel the pending close
      onMouseLeave={scheduleClose} // ✅ cursor left dropdown — schedule close
    >
      <div className="container md:max-w-7xl mx-auto flex gap-5 py-10">
        {image && typeof image === 'object' && (
          <div className="w-53 h-72 rounded-2xl overflow-hidden border border-dashed shadow">
            <MediaPreview
              imgClassName="w-full z-10 object-cover"
              priority
              alt={image.alt!!}
              resource={image}
            />
          </div>
        )}
        <div className="flex flex-wrap gap-4">
          {links?.map(({ label, type, description, id }) => (
            <LinkManager
              key={id}
              label={label}
              appearance="inline"
              className="rounded-md h-fit p-5 bg-muted border border-dashed"
            >
              {type}
              {id}
              {description}
            </LinkManager>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleTriggerEnter}
      onMouseLeave={scheduleClose} // ✅ don't close immediately — give cursor time to reach dropdown
    >
      <Button
        variant="link"
        className={cn(
          'p-0 text-base text-muted-foreground hover:text-current cursor-pointer',
          className,
        )}
      >
        {label}
        <HugeiconsIcon
          icon={ChevronDown}
          className={cn('w-4 h-4 transition-transform dualTone', isOpen && 'rotate-180')}
        />
      </Button>

      {mounted && createPortal(dropdown, document.body)}
    </div>
  )
}
