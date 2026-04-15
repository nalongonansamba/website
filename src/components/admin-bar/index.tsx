'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'
import { useSelectedLayoutSegments } from 'next/navigation'
import { getClientSideURL } from '@/functions/config/getURL'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import '@/components/styles/globals.css'
import { cn } from '../lib/utils'

const baseClass = 'admin-bar'

const collectionLabels = {
  route: { plural: 'Routes', singular: 'Route' },
  content: { plural: 'Contents', singular: 'Content' },
}

const Title: React.FC = () => <span className="font-semibold">Nalongo Nansamba</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const router = useRouter()

  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'route'
  ) as keyof typeof collectionLabels

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  return (
    <div
      className={cn(
        baseClass,
        'py-3 bg-black text-white sticky top-0 left-0 w-full z-60', // Added sticky and high z-index
        {
          block: show,
          hidden: !show,
        },
      )}
    >
      <div className="container md:max-w-7xl mx-auto">
        <PayloadAdminBar
          {...adminBarProps}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          authCollectionSlug="account"
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Routes',
            singular: collectionLabels[collection]?.singular || 'Route',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
          classNames={{
            controls: 'text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
        />
      </div>
    </div>
  )
}
