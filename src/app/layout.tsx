import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'İşyeri Değerlendirme Platformu',
  description: 'İşyerlerini değerlendirin, yorum yapın ve diğer kullanıcılarla etkileşime geçin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
