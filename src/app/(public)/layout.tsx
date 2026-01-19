"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RxHamburgerMenu } from "react-icons/rx";
import { DM_Serif_Text } from 'next/font/google'
import { usePathname } from "next/navigation";

const dm_serif = DM_Serif_Text({
    weight: '400',
    subsets: ['latin'],
    variable:"--font-dm-serif-text"
})
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const pathname = usePathname();
    const [open,setOpen] = useState(false);
  return (
    <>
        <header className='z-50 bg-background w-screen flex items-center justify-between h-16 px-10 shadow-2xl gap-2'>
        <button onClick={() => setOpen(true)}
          className="p-2 focus:outline-none md:hidden"
          aria-label='القائمة الجانبية'
        >
          
          <RxHamburgerMenu className='w-8 h-8 cursor-pointer text-primary hover:w-9'/>
        </button>
            <span className={`flex flex-row-reverse md:flex-row items-center  text-primary  font-dm-serif! ${dm_serif.className} text-[#1C4D46]`}>
                <Image width={40} height={40} src="/emerald-logo.png" alt="Emerald" className='w-10 h-10'/>
                <span className='text-center text-lg leading-4'>
                    EMERALD <br/>
                    <span className='text-xs'>
                        Granite&Marble
                    </span>
                </span>
            </span>
            <nav className='md:flex items-end gap-6 hidden [&>a:hover]:border-b-2 [&>a:hover]:pb-1   [&>a]:duration-200  '>
                <Link
                    href={"/"}
                    className={`${pathname === "/" ? "text-[#427a5f] border-[#427a5f] border-b-2 pb-1 ": ""}`}
                >
                    الرئيسية
                </Link>
                <Link
                    href={"/contact"}
                    className={`${pathname === "/contact" ? "text-[#427a5f] border-[#427a5f] border-b-2 pb-1 ": ""}`}
                >
                    تواصل معنا
                </Link>
                <Link
                    href={"/about"}
                    className={`${pathname === "/about" ? "text-[#427a5f] border-[#427a5f] border-b-2 pb-1 ": ""}`}
                >
                    من نكون    
                </Link>
                 <Link
                    href={"/stones"}
                    className={`${pathname === "/stones" ? "text-[#427a5f] border-[#427a5f] border-b-2 pb-1 ": ""}`}
                >
                    منتجاتنا
                </Link>
            </nav>
            <a href="tel:+963997882244" dir='ltr' className='bg-primary text-background px-4 py-2 rounded-full hidden md:block'>
                +963 997 882 244
            </a>
        </header>
            <div className={`fixed z-50 inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${ open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" }`} onClick={() => setOpen(false)}
      />

      {/* Drawer Panel */}
      <aside className={`fixed z-50 top-0 right-0 h-full w-64 bg-background shadow-xl p-6 transform transition-transform duration-300 ${ open ? "translate-x-0" : "translate-x-full" }`} >
        <span className={`flex items-center  pb-2 mb-2 border-b-2 border-primary  text-primary  font-dm-serif! ${dm_serif.className} text-[#1C4D46]`}>
                <Image width={40} height={40} src="/emerald-logo.png" alt="Emerald" className='w-10 h-10'/>
                <span className='text-center text-lg leading-4'>
                    EMERALD <br/>
                    <span className='text-xs'>
                        Granite&Marble
                    </span>
                </span>
        </span>
        <nav className='flex flex-col gap-4 text-lg [&>a:hover]:border-r-2 [&>a:hover]:pr-2   [&>a]:duration-200'>
                <Link
                    href={"/"}
                    className={`${pathname === "/" ? "text-[#427a5f] border-[#427a5f] border-r-2 pr-2 ": ""}`}
                >
                    الرئيسية
                </Link>
                <Link
                    href={"/contact"}
                    className={`${pathname === "/contact" ? "text-[#427a5f] border-[#427a5f] border-r-2 pr-2 ": ""}`}
                >
                    تواصل معنا
                </Link>
                <Link
                    href={"/about"}
                    className={`${pathname === "/about" ? "text-[#427a5f] border-[#427a5f] border-r-2 pr-2 ": ""}`}

                >
                    من نكون    
                </Link>
                 <Link
                    href={"/stones"}
                    className={`${pathname === "/stones" ? "text-[#427a5f] border-[#427a5f] border-r-2 pr-2 ": ""}`}
                >
                    منتجاتنا
                </Link>
            </nav>
      </aside>
         <main className='hero w-screen pb-4 flex flex-col gap-5 pt-24   text-center md:text-start  text-background px-6  md:px-10  '>

            {children}
        </main>
        

    </>
  )
}

export default Layout
