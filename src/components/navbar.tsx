"use client"

import { useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Kategoriler", href: "/kategoriler" },
  { name: "İşletmeler", href: "/isletmeler" },
  { name: "Hakkımızda", href: "/hakkimizda" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-light-background dark:bg-dark-background sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <nav className="container-custom flex items-center justify-between py-4">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tight">İşYorum</span>
          </Link>
        </div>
        
        <div className="hidden md:flex md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                pathname === item.href 
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-light-text dark:text-dark-text"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Link 
            href="/giris" 
            className="hidden md:block btn-outline"
          >
            Giriş Yap
          </Link>
          
          <Link 
            href="/kayit" 
            className="hidden md:block btn-primary"
          >
            Kayıt Ol
          </Link>
          
          <button
            type="button"
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      
      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-light-background dark:bg-dark-background"
        >
          <div className="container-custom py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-2xl tracking-tight">İşYorum</span>
            </Link>
            <button
              type="button"
              className="p-2 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="container-custom py-8 flex flex-col gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg font-medium transition-colors ${
                  pathname === item.href 
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-light-text dark:text-dark-text"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex flex-col gap-4 mt-4">
              <Link 
                href="/giris" 
                className="btn-outline w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Giriş Yap
              </Link>
              
              <Link 
                href="/kayit" 
                className="btn-primary w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
} 