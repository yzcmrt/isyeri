import Link from "next/link"

const footerLinks = {
  hizmetler: [
    { name: "İşletme Değerlendirme", href: "#" },
    { name: "İşletme Kaydı", href: "#" },
    { name: "İşletme Rehberi", href: "#" },
    { name: "Premium Üyelik", href: "#" },
  ],
  hakkimizda: [
    { name: "Ekibimiz", href: "#" },
    { name: "Kariyer", href: "#" },
    { name: "Basın", href: "#" },
    { name: "Partnerler", href: "#" },
  ],
  yasal: [
    { name: "Kullanım Koşulları", href: "#" },
    { name: "Gizlilik Politikası", href: "#" },
    { name: "Çerez Politikası", href: "#" },
    { name: "KVKK", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-light-background dark:bg-dark-background border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-2xl tracking-tight">İşYorum</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              İşletmeler ve müşteriler arasında köprü kuran değerlendirme platformu.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Hakkımızda</h3>
            <ul className="space-y-3">
              {footerLinks.hakkimizda.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Yasal</h3>
            <ul className="space-y-3">
              {footerLinks.yasal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} İşYorum. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
} 