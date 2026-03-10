import type { Route } from '@/payload-types'
import { FC, Fragment } from 'react'
import { ArchiveBlock } from './archive-block/components'
import { CallToActionBlock } from './call-to-action/components'
import { ContentBlock } from './content/components'
import { MediaBlock } from './media-block/components'
import { FormBlock } from './forms/components'
import { Cards } from './cards/components'
import { HerbSpotlight } from './herb-spotlight/components'
import { ProcessSteps } from './process/components'
import { Testimonials } from './testimonials/components'
import { Stats } from './stats/components'
import { PullQuote } from './pull-quote/components'
import { Accordion } from './accordion/components'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  cards: Cards,
  herbSpotlight: HerbSpotlight,
  processSteps: ProcessSteps,
  testimonials: Testimonials,
  stats: Stats,
  pullQuote: PullQuote,
  accordion: Accordion,
}

export const RenderBlocks: FC<{
  blocks: Route['layout'][0][]
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            //@ts-ignore
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }
  return null
}
