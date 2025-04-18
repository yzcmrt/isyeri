"use client"

import { useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const navigation = [
  { name: "Kategoriler", href: "/kategoriler" },
  { name: "İşletmeler", href: "/isletmeler" },
  { name: "Hakkımızda", href: "/hakkimizda" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogout = () => {
    // Implement the logout logic here
    console.log("Logout clicked")
  }

  return (
    <header className="bg-[var(--card-bg)] shadow-sm border-b border-[var(--border)] sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="İşYorum Logo" width={40} height={40} />
            <span className="text-xl font-bold text-[var(--foreground)]">İş<span className="text-[var(--primary)]">Yorum</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <Link href="/kategoriler" className={`nav-link ${pathname.startsWith('/kategoriler') ? 'nav-link-active' : ''}`}>
              Kategoriler
            </Link>
            <Link href="/isletmeler" className={`nav-link ${pathname.startsWith('/isletmeler') ? 'nav-link-active' : ''}`}>
              İşletmeler
            </Link>
            <Link href="/hakkimizda" className={`nav-link ${pathname === '/hakkimizda' ? 'nav-link-active' : ''}`}>
              Hakkımızda
            </Link>
          </div>
          
          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-medium">
                    M
                  </div>
                  <span className="text-[var(--text-body)]">Mert</span>
                  <ChevronDownIcon className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <div className="nav-dropdown animate-fade-in">
                    <Link href="/profil" className="nav-dropdown-item">
                      Profilim
                    </Link>
                    <Link href="/favoriler" className="nav-dropdown-item">
                      Favorilerim
                    </Link>
                    <Link href="/yorumlarim" className="nav-dropdown-item">
                      Yorumlarım
                    </Link>
                    <div className="border-t border-[var(--border)] my-1"></div>
                    <button 
                      className="nav-dropdown-item w-full text-left text-[var(--error)]"
                      onClick={handleLogout}
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/giris" className="btn-outline">
                  Giriş Yap
                </Link>
                <Link href="/kayit" className="btn-primary">
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-[var(--border)] transition-colors"
              aria-label="Menüyü aç/kapat"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-[var(--text-body)]" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-[var(--text-body)]" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-[var(--border)] animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Link href="/kategoriler" className={`nav-link ${pathname.startsWith('/kategoriler') ? 'nav-link-active' : ''}`}>
                Kategoriler
              </Link>
              <Link href="/isletmeler" className={`nav-link ${pathname.startsWith('/isletmeler') ? 'nav-link-active' : ''}`}>
                İşletmeler
              </Link>
              <Link href="/hakkimizda" className={`nav-link ${pathname === '/hakkimizda' ? 'nav-link-active' : ''}`}>
                Hakkımızda
              </Link>
              
              {isAuthenticated ? (
                <>
                  <div className="divider"></div>
                  <Link href="/profil" className="nav-link">
                    Profilim
                  </Link>
                  <Link href="/favoriler" className="nav-link">
                    Favorilerim
                  </Link>
                  <Link href="/yorumlarim" className="nav-link">
                    Yorumlarım
                  </Link>
                  <button 
                    className="text-left px-3 py-2 text-[var(--error)] hover:bg-[var(--border)] rounded-md transition-colors"
                    onClick={handleLogout}
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mt-2 pt-4 border-t border-[var(--border)]">
                  <Link href="/giris" className="btn-outline w-full text-center">
                    Giriş Yap
                  </Link>
                  <Link href="/kayit" className="btn-primary w-full text-center">
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 