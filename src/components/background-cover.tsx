import { cn } from '@/components/lib/utils'
import type { FC } from 'react'

type BackgroundCoverProps = {
  placement?: 'top' | 'bottom'
}

export const BackgroundCover: FC<BackgroundCoverProps> = ({ placement = 'top' }) => {
  const top = placement === 'top' ? '-top-40' : '-bottom-40'
  const smTop = placement === 'top' ? '-top-80' : '-bottom-80'
  const side =
    placement === 'top'
      ? 'left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)]'
      : 'left-[calc(90%-11rem)] sm:left-[calc(90%-30rem)]'

  return (
    <div
      aria-hidden="true"
      className={cn('fixed inset-x-0', top, '-z-10 transform-gpu overflow-hidden blur-3xl', smTop)}
    >
      <div
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
        className={cn(
          'relative w-xl sm:w-6xl',
          '-translate-x-1/2 rotate-30 opacity-45 aspect-1155/678',
          'bg-linear-to-tr from-[#3e2723] via-[#5d4037] to-[#8d6e63]',
          'dark:from-[#1b110f] dark:via-[#3e2723] dark:to-[#5d4037]',
          side,
        )}
      />
    </div>
  )
}
