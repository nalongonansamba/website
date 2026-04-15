import { ThemeSelector } from '@/theme-provider/theme/theme-selector'
import { getCachedGlobal } from '@/functions/config/getGlobals'
import { LinkManager } from '@/components/link-manager'
import { SubscriptionForm } from './subscription-form'
import { SocialMedia } from './social-media'
import { cn } from '@/components/lib/utils'
import type { Footer } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

export async function Footer() {
  // @ts-ignore
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer
      className={cn(
        'mt-auto backdrop-blur bg-card/15 text-card-foreground',
        'border-t border-border/50',
      )}
    >
      <section className="container md:max-w-7xl flex flex-col gap-10 md:gap-20 py-20 md:py-32">
        <div className="grid grid-cols-12">
          <nav className="col-span-12 md:col-span-3 flex flex-col">
            <Image
              src="/favicon.svg"
              alt="Footer Logo"
              width={16}
              height={16}
              className="size-16 rounded-full"
            />
            <Link className="text-lg font-bold " href="/">
              {footerData?.title}
            </Link>
          </nav>

          <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {navItems.map(({ link }, i) => {
              const { label, megaLinks } = link
              return (
                <nav key={i} className="flex flex-col gap-5 col-span-1">
                  <h2 className="uppercase text-base font-semibold">{label}</h2>
                  <div className="flex flex-col gap-2">
                    {megaLinks?.map((link) => (
                      <LinkManager
                        key={link.id}
                        {...link}
                        label={link.label}
                        appearance="inline"
                        className="text-3xl"
                      >
                        {link.description}
                      </LinkManager>
                    ))}
                  </div>
                </nav>
              )
            })}

            <nav className="flex flex-col gap-5 col-span-1">
              <h2 className="uppercase text-base font-semibold">THEME SETTINGS</h2>
              <ThemeSelector />
            </nav>
          </div>
        </div>

        <SocialMedia links={footerData?.socialMediaHandles} />
        <div className="flex flex-col gap-5 md:max-w-sm">
          <div className="flex flex-col">
            <h2 className="uppercase text-base font-semibold">Stay connected</h2>
            <p className="text-xs text-muted-foreground md:max-w-3xs">
              Get the latest updates and stay in touch with us
            </p>
          </div>
          <SubscriptionForm />
        </div>
        <span className="text-xs text-muted-foreground">{footerData?.copyright}</span>
      </section>
    </footer>
  )
}
