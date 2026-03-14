import type { CollectionConfig } from 'payload'
import { Accounts } from './accounts'
import { Storage } from './storage'
import { Routes } from './route'
import { Contents } from './content'
import { Categories } from './categories'
import { Keywords } from './keywords'

export const collections: CollectionConfig[] = [
  Routes,
  Contents,
  Keywords,
  Categories,
  Accounts,
  Storage,
]
