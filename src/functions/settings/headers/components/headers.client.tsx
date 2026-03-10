'use client'

import { useAuth } from '@/components/auth-provider'
import { cn } from '@/components/lib/utils'
import { LinkManager } from '@/components/link-manager'
import { Button, buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Header } from '@/payload-types'
import { useHeaderTheme } from '@/theme-provider/header-theme'
import { ThemeSelector } from '@/theme-provider/theme/theme-selector'
import { Menu11Icon, Search } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

type HeadersClientProps = Header

export const HeadersClient: FC<HeadersClientProps> = (props) => {
  const navItems = props?.navItems || []
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const { user } = useAuth()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className={cn(
        'sticky inset-x-0 z-55 flex items-center',
        {
          ...(theme ? { 'data-theme': theme } : {}),
        },
        user ? 'top-11' : 'top-0',
      )}
    >
      <div className="container flex items-center justify-between py-5">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-extrabold cursor-pointer">
            {props?.title}
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <nav className="relative hidden md:flex items-center gap-3">
            {navItems.map(({ link }, i) => {
              return (
                <LinkManager
                  key={i}
                  {...link}
                  className={cn(
                    'p-0 text-base text-current/55 hover:text-current',
                    'hover:decoration-wavy cursor-pointer',
                  )}
                  appearance="link"
                />
              )
            })}
          </nav>

          <nav className="flex items-center gap-2">
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/contact-us" />}
            >
              Join us today
            </Button>
            <Button size="icon-lg" variant="secondary">
              <HugeiconsIcon icon={Search} className="dualTone" />
            </Button>
            <Sheet>
              <SheetTrigger
                className={cn(
                  buttonVariants({
                    size: 'lg',
                    variant: 'secondary',
                  }),
                  'flex md:hidden',
                )}
              >
                <HugeiconsIcon icon={Menu11Icon} className="dualTone" />
              </SheetTrigger>

              <SheetContent side="left" className="z-60">
                <SheetHeader>
                  <SheetTitle>{props.title}</SheetTitle>
                  <SheetDescription className="hidden"></SheetDescription>
                </SheetHeader>
                <section className="flex flex-col justify-between h-full">
                  <div className="flex flex-col justify-start items-start gap-2 px-5">
                    {navItems.map(({ link }, i) => {
                      return (
                        <LinkManager
                          key={i}
                          {...link}
                          className={cn(
                            'p-0 w-fit text-xl text-current/55 hover:text-current',
                            'hover:decoration-wavy cursor-pointer border',
                          )}
                          appearance="link"
                        />
                      )
                    })}
                  </div>

                  <span className="text-muted-foreground p-5">
                    Copyright © 2026 Nalongo Nasamba
                  </span>
                </section>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}
