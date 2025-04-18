"use client";

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"

// Kategori mockup verisi
const kategoriler = [
  {
    id: "restoranlar",
    baslik: "Restoranlar",
    aciklama: "En iyi yemek mekanları ve restoranlar",
    gorsel: "/images/category-restaurant.jpg",
    alt_kategoriler: ["Türk Mutfağı", "İtalyan", "Uzak Doğu", "Fast Food", "Deniz Ürünleri"],
    isletme_sayisi: 248
  },
  {
    id: "oteller",
    baslik: "Oteller & Konaklama",
    aciklama: "Konforlu ve kaliteli konaklama seçenekleri",
    gorsel: "/images/category-hotel.jpg",
    alt_kategoriler: ["5 Yıldızlı", "Butik", "Apart", "Pansiyon", "Tatil Köyleri"],
    isletme_sayisi: 124
  },
  {
    id: "alisveris",
    baslik: "Alışveriş",
    aciklama: "Alışveriş merkezleri ve özel mağazalar",
    gorsel: "/images/category-shopping.jpg",
    alt_kategoriler: ["AVM'ler", "Giyim", "Elektronik", "Hediyelik Eşya", "Antika"],
    isletme_sayisi: 312
  },
  {
    id: "saglik",
    baslik: "Sağlık",
    aciklama: "Hastaneler, klinikler ve sağlık hizmetleri",
    gorsel: "/images/category-health.jpg",
    alt_kategoriler: ["Hastaneler", "Diş Klinikleri", "Spor Salonları", "Spa & Masaj", "Eczaneler"],
    isletme_sayisi: 185
  },
  {
    id: "egitim",
    baslik: "Eğitim",
    aciklama: "Okullar, kurslar ve eğitim merkezleri",
    gorsel: "/images/category-education.jpg",
    alt_kategoriler: ["Üniversiteler", "Liseler", "Dil Kursları", "Sanat Okulları", "Etüt Merkezleri"],
    isletme_sayisi: 97
  },
  {
    id: "eglence",
    baslik: "Eğlence & Aktivite",
    aciklama: "Eğlence mekanları ve aktivite merkezleri",
    gorsel: "/images/category-entertainment.jpg",
    alt_kategoriler: ["Sinema", "Tiyatro", "Konser Alanları", "Oyun Salonları", "Parklar"],
    isletme_sayisi: 156
  },
  {
    id: "guzellik",
    baslik: "Güzellik & Bakım",
    aciklama: "Güzellik salonları ve kişisel bakım merkezleri",
    gorsel: "/images/category-beauty.jpg",
    alt_kategoriler: ["Kuaförler", "Berberler", "Güzellik Salonları", "Cilt Bakımı", "Manikür & Pedikür"],
    isletme_sayisi: 203
  },
  {
    id: "spor",
    baslik: "Spor & Fitness",
    aciklama: "Spor tesisleri ve fitness merkezleri",
    gorsel: "/images/category-sport.jpg",
    alt_kategoriler: ["Spor Salonları", "Yüzme Havuzları", "Tenis Kortları", "Futbol Sahaları", "Yoga Stüdyoları"],
    isletme_sayisi: 118
  },
];

// Popüler şehirler verisi
const populerSehirler = [
  { id: "istanbul", ad: "İstanbul", gorsel: "/images/istanbul.jpg", isletme_sayisi: 2547 },
  { id: "ankara", ad: "Ankara", gorsel: "/images/ankara.jpg", isletme_sayisi: 1248 },
  { id: "izmir", ad: "İzmir", gorsel: "/images/izmir.jpg", isletme_sayisi: 1089 },
  { id: "antalya", ad: "Antalya", gorsel: "/images/antalya.jpg", isletme_sayisi: 876 },
  { id: "bursa", ad: "Bursa", gorsel: "/images/bursa.jpg", isletme_sayisi: 654 },
  { id: "adana", ad: "Adana", gorsel: "/images/adana.jpg", isletme_sayisi: 432 },
];

export default function Kategoriler() {
  const [aramaMetni, setAramaMetni] = useState("");
  
  // Arama fonksiyonu
  const filtrelenmisKategoriler = kategoriler.filter(kategori => 
    kategori.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    kategori.aciklama.toLowerCase().includes(aramaMetni.toLowerCase()) ||
    kategori.alt_kategoriler.some(alt => alt.toLowerCase().includes(aramaMetni.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-primary-600 py-16">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-6">İşletme Kategorileri</h1>
              <p className="text-primary-100 max-w-2xl mx-auto mb-10">
                İhtiyacınız olan hizmet veya ürünleri sunan işletmeleri kategoriler halinde keşfedin. 
                Yorumları okuyun, puanları görün ve en iyi seçimi yapın.
              </p>
              
              <div className="max-w-xl mx-auto relative">
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Kategori ara..."
                    className="w-full py-4 px-6 text-light-text dark:text-dark-text bg-white dark:bg-gray-800 border-0 focus:outline-none focus:ring-0"
                    value={aramaMetni}
                    onChange={(e) => setAramaMetni(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Kategoriler Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtrelenmisKategoriler.map((kategori) => (
                <Link 
                  href={`/kategoriler/${kategori.id}`} 
                  key={kategori.id}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={kategori.gorsel} 
                      alt={kategori.baslik}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {kategori.baslik}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {kategori.aciklama}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {kategori.isletme_sayisi.toLocaleString()} işletme
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:translate-x-2 transition-transform">
                        Detayları Gör →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">İşletmenizi Ekleyin</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Siz de işletmenizi platformumuza ekleyerek binlerce potansiyel müşteriye ulaşabilir, 
              yorumlar ve puanlamalar alarak işletmenizin bilinirliğini artırabilirsiniz.
            </p>
            <Link 
              href="/isletme-kayit" 
              className="btn-primary px-8 py-3"
            >
              Hemen Kaydolun
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 