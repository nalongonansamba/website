import type { Account } from '@/payload-types'
import type { Permissions } from 'payload'

export type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<Account>

export type ForgotPassword = (args: { email: string }) => Promise<Account>
export type Create = (args: {
  email: string
  username: string
  password: string
}) => Promise<Account>

export type Login = (args: {
  email?: string
  username?: string
  password: string
}) => Promise<Account>

export type Logout = () => Promise<void>

export interface AuthContext {
  create: Create
  forgotPassword: ForgotPassword
  login: Login
  logout: Logout
  permissions?: null | Permissions
  resetPassword: ResetPassword
  setPermissions: (permissions: null | Permissions) => void
  setUser: (user: null | Account) => void
  user?: null | Account
}
