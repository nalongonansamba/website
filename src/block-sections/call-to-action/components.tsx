import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { LinkManager } from '@/components/link-manager'
import RichText from '@/components/rich-text'
import { FC } from 'react'

export const CallToActionBlock: FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-3xl flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <LinkManager key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
