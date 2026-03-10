import { getCachedGlobal } from '@/functions/config/getGlobals'
import { Header } from '@/payload-types'
import { HeadersClient } from './headers.client'

export async function Headers() {
  // @ts-ignore
  const headerData: Header = await getCachedGlobal('headers', 1)()

  return <HeadersClient {...headerData} />
}
