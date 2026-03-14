import { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '../ui/button'
import { Content, Route, Storage } from '@/payload-types'
import { FC } from 'react'
import { cn } from '../lib/utils'
import Link from 'next/link'
import { MegaMenu } from '../mega-menu'

type buttonVar = VariantProps<typeof buttonVariants>

// A single mega menu item — flat, no nesting
export type MegaLinkItem = {
  type?: 'custom' | 'reference' | 'mega' | null
  url?: string | null
  label?: string | null
  description?: string | null
  id?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'route' | 'content'
    value: Route | Content | string
  } | null
}

export type defaultLinksProps = {
  appearance?: 'inline' | buttonVar['variant'] | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  image?: (string | null) | Storage
  reference?: {
    relationTo: 'route' | 'content'
    value: Route | Content | string | number
  } | null
  size?: buttonVar['size'] | null
  type?: 'custom' | 'reference' | 'mega' | null
  url?: string | null
  id?: string | null
  megaLinks?: MegaLinkItem[] | null
  onClick?: () => void
}

export const LinkManager: FC<defaultLinksProps> = (props) => {
  const {
    id,
    type,
    megaLinks,
    label,
    image,
    appearance = 'link',
    children,
    className,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    onClick,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value?.slug
      ? `${reference?.relationTo !== 'route' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  // ✅ type === 'mega' with actual links → render MegaMenu
  if (type === 'mega' && megaLinks && megaLinks.length > 0) {
    return <MegaMenu key={id} label={label} image={image} links={megaLinks} />
  }

  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className, 'flex flex-col')}
        // @ts-ignore
        href={href!! || url!! || '#'}
        {...newTabProps}
      >
        <span className="text-base text-muted-foreground hover:text-current">{label}</span>
        {children}
      </Link>
    )
  }

  return (
    <Button
      variant={appearance as buttonVar['variant']}
      size={(size as any) ?? 'default'}
      className={cn('cursor-pointer', className)}
      nativeButton={false}
      // @ts-ignore
      onClick={onClick}
      render={<Link href={href!! || url!! || '#'} {...newTabProps} />}
    >
      {label}
      {children}
    </Button>
  )
}
