import React from 'react'

import type { Route } from '@/payload-types'
import RichText from '@/components/rich-text'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Route['hero'], 'richText'> & {
      children?: never
      richText?: Route['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container md:max-w-7xl mt-16">
      <div className="max-w-3xl">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
