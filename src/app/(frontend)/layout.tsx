import { BackgroundCover } from '@/components/background-cover'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import '@/components/styles/globals.css'
import { Headers } from '@/functions'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { AdminBar } from '@/components/admin-bar'
import { draftMode } from 'next/headers'
import { InitTheme } from '@/theme-provider/theme/init-theme'
import { Providers } from '@/theme-provider'
import { Footer } from '@/functions/settings/footers/components/footers'
import { getServerSideURL } from '@/functions/config/getURL'
import { mergeOpenGraph } from '@/functions/config/mergeOpenGraph'
import { AuthProvider } from '@/components/auth-provider'

export default async function RootLayout(props: { children: ReactNode }) {
  const { isEnabled } = await draftMode()
  const { children } = props

  return (
    <html lang="en" className="font-sans antialiased wrap-anywhere" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="relative flex flex-col min-h-svh">
        <Providers>
          <AuthProvider>
            <TooltipProvider>
              <AdminBar adminBarProps={{ preview: isEnabled }} />
              <Headers /> {/* sticky/fixed header sits here */}
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
              <BackgroundCover />
              <BackgroundCover placement="bottom" />
              <Toaster richColors />
            </TooltipProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@nalongo_nansamba',
  },
}
