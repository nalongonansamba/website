'use client'

import { useAuth } from '@/components/auth-provider'
import { cn } from '@/components/lib/utils'
import { LinkManager } from '@/components/link-manager'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { Menu11Icon, Search } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

type HeadersClientProps = Header

export const HeadersClient: FC<HeadersClientProps> = (props) => {
  const navItems = props?.navItems || []
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const [open, setClose] = useState<boolean>(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const currentPath = (path: string) => {
    return pathname === path
  }

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
        'sticky inset-x-0 z-55 flex items-center transition-colors duration-300',
        'bg-background backdrop-blur-sm',
        {
          ...(theme ? { 'data-theme': theme } : {}),
        },
        user ? 'top-11' : 'top-0',
      )}
    >
      <div className="container md:max-w-7xl flex items-center justify-between py-3">
        <div className="flex items-center gap-1">
          <Image
            src="/favicon.svg"
            alt="Footer Logo"
            width={10}
            height={10}
            className="size-8 rounded-full"
          />
          <Link href="/" className="text-lg font-extrabold cursor-pointer">
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
                  headers
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
              className="hidden md:flex"
              render={<Link href="/contact-us" />}
            >
              Join us today
            </Button>
            <Button size="icon-lg" variant="secondary">
              <HugeiconsIcon icon={Search} className="dualTone" />
            </Button>
            <Sheet open={open} onOpenChange={setClose}>
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
                          onClick={() => setClose(!open)}
                          className={cn(
                            'p-0 w-fit text-xl text-current/55 hover:text-current',
                            'hover:decoration-wavy cursor-pointer border',
                          )}
                          appearance="link"
                        />
                      )
                    })}
                  </div>

                  <div className="flex flex-col gap-5 p-5">
                    <Button size="icon-lg" variant="secondary">
                      <HugeiconsIcon icon={Search} className="dualTone" />
                    </Button>
                    <Button
                      size="lg"
                      variant="secondary"
                      nativeButton={false}
                      className="w-fit"
                      render={<Link href="/contact-us" />}
                    >
                      Join us today
                    </Button>
                    <span className="text-muted-foreground">Copyright © 2026 Nalongo Nasamba</span>
                  </div>
                </section>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  )
}
