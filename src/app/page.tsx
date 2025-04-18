import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRightIcon, StarIcon, BuildingOfficeIcon, UserGroupIcon, FireIcon, MapPinIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

const categories = [
  { id: 1, name: "Yeme & İçme", count: "1,500+" },
  { id: 2, name: "Alışveriş", count: "1,200+" },
  { id: 3, name: "Sağlık", count: "800+" },
  { id: 4, name: "Eğitim", count: "600+" },
  { id: 5, name: "Güzellik & Bakım", count: "450+" },
  { id: 6, name: "Konaklama", count: "350+" },
]

const popularBusinesses = [
  {
    id: 1,
    name: "Deniz Cafe & Restaurant",
    category: "Yeme & İçme",
    rating: 4.8,
    reviews: 342,
    location: "İstanbul, Kadıköy",
  },
  {
    id: 2,
    name: "Elite Fitness Center",
    category: "Spor",
    rating: 4.6,
    reviews: 187,
    location: "İzmir, Karşıyaka",
  },
  {
    id: 3,
    name: "Mavi Saç Tasarım",
    category: "Güzellik & Bakım",
    rating: 4.9,
    reviews: 215,
    location: "Ankara, Çankaya",
  },
]

const testimonials = [
  {
    id: 1,
    content: "İşYorum sayesinde şehrimde en kaliteli restoranları kolayca bulabiliyorum. Kullanıcı yorumları çok yardımcı oluyor!",
    author: "Ayşe K.",
    role: "Aktif Kullanıcı",
    rating: 5
  },
  {
    id: 2,
    content: "İşletme sahibi olarak platformdaki geri bildirimler sayesinde hizmet kalitemizi sürekli artırıyoruz.",
    author: "Mehmet A.",
    role: "İşletme Sahibi",
    rating: 4
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        {/* Arka plan görsel */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.jpg"
            alt="İşYorum Hero"
            className="object-cover"
            priority
            fill
          />
          <div className="absolute inset-0 bg-[var(--overlay)]"></div>
        </div>
        
        {/* Hero içerik */}
        <div className="relative z-10 container-custom h-full flex flex-col justify-center">
          <div className="max-w-3xl text-white animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              İşletmeler Hakkında Gerçek Değerlendirmeler
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              İş Yorum ile şehrinizdeki en iyi işletmeleri keşfedin, deneyimlerinizi paylaşın ve doğru kararlar verin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/kayit" className="btn-primary px-8 py-3">
                Ücretsiz Katıl
              </Link>
              <Link href="/isletmeler" className="btn-ghost px-8 py-3">
                İşletmeleri Keşfet
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Popüler Kategoriler</h2>
            <p className="text-[var(--text-body)] max-w-2xl mx-auto">
              İlgilendiğiniz kategoriye göre işletmeleri keşfedin ve size en uygun hizmetleri bulun.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/kategoriler/${category.id}`}
                className="category-card group"
              >
                <div className="h-32 w-32 rounded-full bg-[var(--primary-light)] mx-auto flex items-center justify-center mb-4">
                  <BuildingOfficeIcon className="h-16 w-16 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-medium transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-2">
                  {category.count} işletme
                </p>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/kategoriler" className="link-with-arrow group">
              Tüm kategorileri görüntüle
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Popular Businesses */}
      <section className="py-16 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Öne Çıkan İşletmeler</h2>
            <p className="text-[var(--text-body)] max-w-2xl mx-auto">
              Kullanıcılarımızın en çok değerlendirdiği ve yüksek puan alan işletmeleri keşfedin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularBusinesses.map((business) => (
              <Link
                key={business.id}
                href={`/isletme/${business.id}`}
                className="business-card group"
              >
                <div className="relative h-60">
                  <Image 
                    src={`/images/business-${business.id}.jpg`} 
                    alt={business.name}
                    className="object-cover"
                    fill
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-primary">
                      {business.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-medium text-lg transition-colors">
                    {business.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">{business.category}</p>
                  
                  <div className="flex items-center mt-4">
                    <div className="business-card-rating">
                      <StarIcon className="h-5 w-5 text-[var(--star-color)] fill-current" />
                      <span className="ml-1 font-medium">{business.rating}</span>
                    </div>
                    <span className="mx-2 text-[var(--border)]">•</span>
                    <span className="text-sm text-[var(--text-muted)]">{business.reviews} değerlendirme</span>
                  </div>
                  
                  <p className="text-sm text-[var(--text-muted)] mt-4 flex items-center">
                    <MapPinIcon className="h-4 w-4 text-[var(--primary)] mr-1" />
                    {business.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/isletmeler" className="link-with-arrow group">
              Tüm işletmeleri keşfet
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Neden İşYorum?</h2>
            <p className="text-[var(--text-body)] max-w-2xl mx-auto">
              Platformumuz size en iyi işletmeleri keşfetme ve deneyimlerinizi paylaşma imkanı sunar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <BuildingOfficeIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              <h3 className="mt-4 text-xl font-medium">Gerçek İşletmeler</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Tüm işletmeler doğrulanarak platformumuza eklenir, böylece güvenilir içeriğe ulaşırsınız.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <UserGroupIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              <h3 className="mt-4 text-xl font-medium">Gerçek Yorumlar</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Kullanıcılarımızın deneyimleri, işletmeleri seçmenize yardımcı olur ve beklentilerinizi şekillendirir.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <FireIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              <h3 className="mt-4 text-xl font-medium">Güncel Bilgiler</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                İşletmeler profillerini sürekli güncelleyerek size en doğru ve güncel bilgileri sunar.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-[var(--background)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Kullanıcılarımız Ne Diyor?</h2>
            <p className="text-[var(--text-body)] max-w-2xl mx-auto">
              İş Yorum kullanıcılarının platform hakkındaki düşünceleri ve deneyimleri.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <Image 
                        src={`/images/testimonial-${testimonial.id}.jpg`} 
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">{testimonial.author}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? "star" : "star-empty"}`} 
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[var(--text-body)]">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white">Hemen Katılın</h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            İşletmeleri keşfedin, yorumlayın ve deneyimlerinizi paylaşın. İşYorum&apos;la kaliteli hizmet almanın ve doğru bilgiye ulaşmanın keyfini çıkarın.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kayit" className="btn-white px-8 py-3">
              Ücretsiz Katıl
            </Link>
            <Link href="/isletme-kayit" className="btn-ghost px-8 py-3">
              İşletmenizi Ekleyin
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
