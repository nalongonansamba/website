import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Image
        alt={'Logo'}
        width={420}
        height={220}
        className={'w-48 h-48 shadow-2xl'}
        src={'/nalongo-nansamba-banner.svg'}
      />
    </div>
  )
}
