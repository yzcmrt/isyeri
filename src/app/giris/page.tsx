"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MotionDiv } from "@/components/motion-wrapper"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada giriş işlemleri yapılacak
    console.log("Giriş yapılıyor:", { email, password })
  }
  
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <Navbar />
      
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto">
          <MotionDiv 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Giriş Yap</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Hesabınıza giriş yaparak işletmeleri değerlendirin.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-posta Adresi
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-light-text dark:text-dark-text"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Şifre
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-light-text dark:text-dark-text"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Beni hatırla
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link 
                    href="/sifremi-unuttum" 
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Şifremi unuttum
                  </Link>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full btn-primary py-3"
              >
                Giriş Yap
              </button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    veya şununla devam et
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22,12.1c0-0.6,0-1.2-0.1-1.8H12v3.4h5.6c-0.2,1.4-1,2.5-2.2,3.3v2.6h3.6C21.2,17.1,22,14.8,22,12.1z M12,22c3,0,5.5-1,7.3-2.7l-3.6-2.6c-1,0.7-2.3,1.1-3.7,1.1c-2.8,0-5.2-1.9-6.1-4.4H2.1v2.7C4,19.5,7.7,22,12,22z M5.9,13.4c-0.2-0.6-0.3-1.3-0.3-2c0-0.7,0.1-1.4,0.3-2v-2.7H2.1C1.4,8.1,1,10,1,12s0.4,3.9,1.1,5.3L5.9,13.4z M12,2c2.8,0,4.5,1.2,5.5,2.2l3.2-3.2C18.6,0.9,15.6,0,12,0C7.7,0,4,2.5,2.1,6.1l3.8,2.7C6.8,5.7,9.2,2,12,2z"/>
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hesabınız yok mu?{" "}
                <Link 
                  href="/kayit" 
                  className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                >
                  Kayıt Ol
                </Link>
              </p>
            </div>
          </MotionDiv>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 