import { lexicalEditorConfig } from './functions/lexical-editor'
import { collections, plugins, settings } from './functions'
import { getServerSideURL } from './functions/config/getURL'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import path from 'path'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: getServerSideURL() || 'https://nalongonansamba.com',
  cookiePrefix: 'nalongo',
  admin: {
    user: 'account',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  auth: {
    jwtOrder: ['cookie', 'Bearer', 'JWT'],
  },
  collections: collections,
  globals: settings,
  editor: lexicalEditorConfig,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
    connectOptions: {
      dbName: 'test',
    },
  }),
  sharp,
  plugins: plugins,
  cors: [getServerSideURL(), 'https://nalongonansamba.com'].filter(Boolean),
  csrf: [getServerSideURL(), 'https://nalongonansamba.com'].filter(Boolean),
  email: resendAdapter({
    defaultFromAddress: process.env.WEBSITE_EMAIL || '',
    defaultFromName: process.env.RESEND_DEFALUT_NAME || '',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
