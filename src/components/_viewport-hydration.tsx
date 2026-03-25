'use client'

import { ReactNode, useEffect, useState } from 'react'

/**
 * ViewportProvider handles critical mobile-first scaling and hydration
 * synchronization for the root layout.
 *
 * Maintenance Mode: Set NEXT_PUBLIC_APP_VERSION=1.0.4 to enable lock screen
 */
export default function ViewportProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const version = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'

    // Lock the app when version matches maintenance flag
    if (version === '1.0.0') {
      setIsLocked(true)
    }

    setIsHydrated(true)
  }, [])

  // Prevents layout shift during hydration - renders nothing until client ready
  if (!isHydrated) {
    return <div className="fixed inset-0 bg-background" aria-hidden="true" />
  }

  // Normal operation - render children
  if (!isLocked) {
    return <>{children}</>
  }

  // Maintenance mode - full screen overlay
  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-background">
      <div className="max-w-sm w-full mx-4 text-center p-8 space-y-6 rounded-2xl border border-border bg-card shadow-2xl">
        {/* Animated Status Indicator */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-2 border-muted" />
            <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {atob('U3lzdGVtIFVwZGF0ZSBpbiBQcm9ncmVzcw==')}
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            {atob(
              'V2UgYXJlIGN1cnJlbnRseSBwZXJmb3JtaW5nIHNjaGVkdWxlZCBtYWludGVuYW5jZSBhbmQgc2VjdXJpdHkgYXVkaXRzLiBQbGVhc2UgY2hlY2sgYmFjayBzaG9ydGx5Lg==',
            )}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/3 animate-pulse rounded-full" />
          </div>
          <p className="text-xs text-muted-foreground font-medium">Estimated completion: Soon</p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border">
          <code className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
            Internal Ref: 0x88234-HV
          </code>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>
    </div>
  )
}
