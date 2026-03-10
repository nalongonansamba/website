import Image from 'next/image'

export default function Icon() {
  return (
    <div className="flex items-center space-x-2">
      <Image
        alt={'Logo'}
        width={35}
        height={35}
        className={'max-w-full w-48 h-48 shadow-2xl'}
        src={'/favicon.svg'}
      />
    </div>
  )
}
