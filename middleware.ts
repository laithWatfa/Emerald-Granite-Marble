// middleware.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req : any) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options) {
          res.cookies.set(name, value, options)
        },
        remove(name) {
          res.cookies.delete(name)
        },
      },
    }
  )

  await supabase.auth.getSession()

  return res
}


export const config = {
    matcher: ['/admin/:path*'],
}
