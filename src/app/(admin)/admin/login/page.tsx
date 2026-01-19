'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Metadata } from 'next'


export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('بيانات الدخول غير صحيحة')
      setLoading(false)
      return
    }

    router.push('/admin/stones')
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-stone px-4"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
        className="w-full  max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg"
      >
        {/* Logo / Title */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-primary">
            لوحة تحكم الإدارة
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            تسجيل الدخول
          </p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            placeholder="admin@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none transition focus:border-primary"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm text-neutral-600">
            كلمة المرور
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm outline-none transition focus:border-primary"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl py-2 text-background transition ${
            loading
              ? 'cursor-not-allowed bg-primary/70'
              : 'cursor-pointer bg-primary hover:bg-primary-dark'
          }`}
        >
          {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>
    </div>
  )
}
