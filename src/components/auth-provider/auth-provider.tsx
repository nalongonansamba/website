'use client'

import type { Permissions } from 'payload'
import React, { createContext, useCallback, use, useEffect, useState } from 'react'
import type { AuthContext, Create, ForgotPassword, Login, Logout, ResetPassword } from './types'
import type { Account } from '@/payload-types'
import { rest } from './rest'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | Account>()
  const [permissions, setPermissions] = useState<null | Permissions>(null)

  const create = useCallback<Create>(async (args) => {
    const user = await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account`, args)
    setUser(user)
    return user as Account // ← assert
  }, [])

  const login = useCallback<Login>(async (args) => {
    const user = await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/login`, args) // ← fix endpoint
    setUser(user)
    return user as Account // ← assert
  }, [])

  const logout = useCallback<Logout>(async () => {
    await rest(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/logout`) // ← fix endpoint
    setUser(null)
  }, [])

  useEffect(() => {
    const fetchMe = async () => {
      const user = await rest(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/me`,
        {},
        {
          method: 'GET',
        },
      )
      setUser(user)
    }
    void fetchMe()
  }, [])

  const forgotPassword = useCallback<ForgotPassword>(async (args) => {
    const user = await rest(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/forgot-password`, // ← fix endpoint
      args,
    )
    setUser(user)
    return user as Account // ← assert
  }, [])

  const resetPassword = useCallback<ResetPassword>(async (args) => {
    const user = await rest(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/reset-password`, // ← fix endpoint
      args,
    )
    setUser(user)
    return user as Account // ← assert
  }, [])

  return (
    <Context
      value={{
        create,
        forgotPassword,
        login,
        logout,
        permissions,
        resetPassword,
        setPermissions,
        setUser,
        user,
      }}
    >
      {children}
    </Context>
  )
}

type UseAuth<T = Account> = () => AuthContext
export const useAuth: UseAuth = () => use(Context)
