'use client'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { getClientSideURL } from '@/functions/config/getURL'
import { Mail01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '@/components/lib/utils'
import { toast } from 'sonner'

export function SubscriptionForm({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: '' },
  })

  // ✅ added [reset] deps array
  const onSubmit = useCallback(
    async (data: { email: string }) => {
      const loadingTimer = setTimeout(() => setIsLoading(true), 500)

      try {
        const req = await fetch(`${getClientSideURL()}/api/newsletter/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email }),
        })

        clearTimeout(loadingTimer)
        setIsLoading(false)

        if (!req.ok) {
          const res = await req.json()
          toast.error(res.message || res.errors?.[0]?.message || 'Subscription failed.')
          return
        }

        reset()
        // ✅ sonner success with description uses data object, not second string arg
        toast.success("You're subscribed!", {
          description: 'Check your inbox to confirm your subscription.',
        })
      } catch (err) {
        clearTimeout(loadingTimer)
        setIsLoading(false)
        toast.error('Something went wrong. Please try again.')
      }
    },
    [reset],
  ) // ✅ deps array added

  return (
    <div className={cn('w-full', className)}>
      <form id="subscription" onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputGroup className="py-4.5">
          <InputGroupAddon align="inline-start">
            <HugeiconsIcon icon={Mail01Icon} className="dualTone" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Enter your email"
            type="email"
            autoComplete="email"
            disabled={isLoading}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email',
              },
            })}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              className="h-8 px-5"
              variant="default"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing…' : 'Subscribe'}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        {/* ✅ errors is now correctly in scope from useForm destructure above */}
        {errors.email && (
          <p className="text-xs text-destructive mt-1.5 ml-1">{errors.email.message}</p>
        )}
      </form>
    </div>
  )
}
