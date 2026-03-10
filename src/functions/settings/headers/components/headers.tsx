import { getCachedGlobal } from '@/functions/config/getGlobals'
import { Header } from '@/payload-types'
import { HeadersClient } from './headers.client'

export async function Headers() {
  const headerData: Header = await getCachedGlobal('headers', 1)()

  return <HeadersClient {...headerData} />
}
