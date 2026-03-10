import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Image alt={'Logo'} fill className={'max-w-full shadow-2xl'} src={'/favicon.svg'} />
    </div>
  )
}
