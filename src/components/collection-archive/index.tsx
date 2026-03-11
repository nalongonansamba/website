import { Card, CardPostData } from '@/components/card-content'
import { cn } from '../lib/utils'
import { FC } from 'react'

export type Props = {
  content: CardPostData[]
}

export const CollectionArchive: FC<Props> = (props) => {
  const { content } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {content?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-1" key={index}>
                  <Card className="h-full" doc={result} relationTo="content" showCategories />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
