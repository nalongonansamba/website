import type { CollectionConfig } from 'payload'
import { Accounts } from './accounts'
import { Storage } from './storage'
import { Routes } from './route'
import { Contents } from './content'
import { Categories } from './categories'

export const collections: CollectionConfig[] = [Routes, Contents, Categories, Accounts, Storage]
