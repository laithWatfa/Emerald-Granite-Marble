'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { RxHamburgerMenu } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'الأحجار', href: '/admin/stones' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const linkClasses = (href: string) =>
    `block w-full rounded-lg px-4 py-2 text-sm text-right transition ${
      pathname === href
        ? 'bg-background text-primary'
        : 'text-background hover:text-accent hover:bg-background'
    }`

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-stone">
      {/* ================= Desktop Sidebar ================= */}
      <aside className="hidden w-64 flex-col bg-primary shadow-md md:flex">
        <div className="border-b border-background px-6 py-4">
          <h2 className="text-lg font-semibold text-background">
            لوحة التحكم
          </h2>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClasses(item.href)}
              role='button'
              aria-label={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className=" w-full flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 transition hover:bg-red-100"
            aria-label='تسجيل الخروج'
          >
            <BiLogOut className='w-5 h-5' />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* ================= Mobile Header ================= */}
      <header className="fixed top-0 z-40 flex w-full items-center justify-between bg-background px-4 py-3 shadow md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-sm"
          aria-label='القائمة الجانبية'
        >
          <RxHamburgerMenu className='w-8 h-8 cursor-pointer text-primary hover:text-accent duration-150'/>
        </button>

        <span className="font-medium text-primary">
          لوحة التحكم
        </span>

        <button
          onClick={handleLogout}
          className="text-sm flex items-center gap-2 text-red-600 cursor-pointer"
          aria-label='تسجيل الخروج'
        >
             
            تسجيل الخروج
            <BiLogOut className='w-5 h-5' />
        </button>
      </header>

      {/* ================= Mobile Drawer ================= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Drawer */}
          <div className="w-64  bg-primary shadow-lg">
            <div className="border-b border-background px-6 py-4">
              <h2 className="font-semibold text-background">
                لوحة التحكم
              </h2>
            </div>

            <nav className="space-y-1 p-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClasses(item.href)}
                  onClick={() => setDrawerOpen(false)}
                  role='button'
                  aria-label={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          {/* Overlay */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="flex-1 bg-black/40 backdrop-blur-sm"
          />

          
        </div>
      )}

      {/* ================= Page Content ================= */}
      <main className="flex-1 px-4 pt-20 md:px-8 md:pt-8">
        {children}
      </main>
    </div>
  )
}
