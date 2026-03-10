import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Card } from '@/components/card-content'
import type { Content } from '@/payload-types'
import RichText from '@/components/rich-text'
import { FC } from 'react'
import clsx from 'clsx'

export type RelatedContentProps = {
  className?: string
  docs?: Content[]
  introContent?: DefaultTypedEditorState
}

export const RelatedContent: FC<RelatedContentProps> = (props) => {
  const { className, docs, introContent } = props
  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null
          return (
            <div className="col-span-1" key={index}>
              <Card className="h-full" doc={doc} relationTo="content" showCategories />
            </div>
          )
        })}
      </div>
    </div>
  )
}
