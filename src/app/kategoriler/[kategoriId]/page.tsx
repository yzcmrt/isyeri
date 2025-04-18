import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getKategoriById, getIsletmelerByKategori } from '@/data/mock-data';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { 
  FunnelIcon, 
  ArrowsUpDownIcon, 
  TagIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ArrowLongLeftIcon
} from '@heroicons/react/24/outline';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt } from "react-icons/fa";

interface KategoriData {
  id: string;
  baslik: string;
  aciklama: string;
  gorsel: string;
  alt_kategoriler: string[];
  isletme_sayisi: number;
  ozet: string;
}

// Mock veri için Isletme tipi tanımı
interface MockIsletme {
  id: string;
  kategoriId: string;
  ad: string;
  adres: string;
  sehir: string;
  puan: number;
  fiyat_seviyesi: string;
  kapak_fotografi: string;
  fotograf_sayisi: number;
  yorum_sayisi: number;
  ozellikler: string[];
  acik: boolean;
  calisma_saatleri: string;
}

// Kategori verisi
const kategorilerDetay = {
  "restoranlar": {
    id: "restoranlar",
    baslik: "Restoranlar",
    aciklama: "Şehrin en iyi restoranlarını keşfedin. Farklı mutfaklar, özel lezzetler ve unutulmaz yemek deneyimleri için ideal mekanlar burada listeleniyor.",
    gorsel: "/images/category-restaurant.jpg",
    alt_kategoriler: ["Türk Mutfağı", "İtalyan", "Uzak Doğu", "Fast Food", "Deniz Ürünleri", "Vejeteryan", "Vegan", "Cafe", "Pastane", "Steakhouse"],
    isletme_sayisi: 248,
    ozet: "İster rahat bir kahvaltı, lezzetli bir öğle yemeği ya da romantik bir akşam yemeği olsun, damak tadınıza uygun her türlü seçeneği bulabilirsiniz."
  },
  "oteller": {
    id: "oteller",
    baslik: "Oteller & Konaklama",
    aciklama: "Konforlu ve kaliteli konaklama seçenekleriyle seyahatinizi unutulmaz kılın. Lüks otellerden butik pansiyonlara kadar çeşitli konaklama alternatifleri.",
    gorsel: "/images/category-hotel.jpg",
    alt_kategoriler: ["5 Yıldızlı", "Butik", "Apart", "Pansiyon", "Tatil Köyleri", "Dağ Evleri", "Villa", "Hostel", "Kamp Alanları"],
    isletme_sayisi: 124,
    ozet: "Uygun fiyatlı hosteller, aile dostu tatil köyleri ve lüks spa otelleri dahil olmak üzere her bütçeye uygun konaklama seçenekleri sunuyoruz."
  },
  "alisveris": {
    id: "alisveris",
    baslik: "Alışveriş",
    aciklama: "En iyi alışveriş merkezleri, mağazalar ve butikler. Moda, elektronik, hediyelik eşya ve daha fazlası için alışveriş rehberiniz.",
    gorsel: "/images/category-shopping.jpg",
    alt_kategoriler: ["AVM'ler", "Giyim", "Elektronik", "Hediyelik Eşya", "Antika", "Kitapçılar", "Spor Malzemeleri", "Oyuncakçılar", "Mücevherat"],
    isletme_sayisi: 312,
    ozet: "Yerel zanaatkarların el yapımı ürünlerinden uluslararası markalara kadar uzanan geniş bir alışveriş yelpazesini keşfedin."
  }
};

// Mock işletme verisi
const isletmeler = [
  {
    id: "sofram-restaurant",
    kategoriId: "restoranlar",
    ad: "Sofram Restaurant",
    adres: "Atatürk Cad. No:120, Kadıköy",
    sehir: "İstanbul",
    puan: 4.8,
    fiyat_seviyesi: "$$",
    kapak_fotografi: "/images/restaurant-1.jpg",
    fotograf_sayisi: 24,
    yorum_sayisi: 127,
    ozellikler: ["Wifi", "Otopark", "Dış Mekan", "Rezervasyon"],
    acik: true,
    calisma_saatleri: "09:00 - 23:00"
  },
  {
    id: "anatolia-cuisine",
    kategoriId: "restoranlar",
    ad: "Anatolia Cuisine",
    adres: "Bağdat Cad. No:46, Maltepe",
    sehir: "İstanbul",
    puan: 4.6,
    fiyat_seviyesi: "$$$",
    kapak_fotografi: "/images/restaurant-2.jpg",
    fotograf_sayisi: 18,
    yorum_sayisi: 96,
    ozellikler: ["Alkollü İçecek", "Otopark", "Canlı Müzik", "Manzara"],
    acik: true,
    calisma_saatleri: "12:00 - 00:00"
  },
  {
    id: "pizza-gusto",
    kategoriId: "restoranlar",
    ad: "Pizza Gusto",
    adres: "İstiklal Cad. No:78, Beyoğlu",
    sehir: "İstanbul",
    puan: 4.2,
    fiyat_seviyesi: "$$",
    kapak_fotografi: "/images/restaurant-3.jpg",
    fotograf_sayisi: 14,
    yorum_sayisi: 85,
    ozellikler: ["Paket Servis", "Temassız Teslimat", "Vejetaryen Dostu"],
    acik: false,
    calisma_saatleri: "10:00 - 22:00"
  },
  {
    id: "zen-hotel",
    kategoriId: "oteller",
    ad: "Zen Hotel & Spa",
    adres: "Cumhuriyet Cad. No:12, Şişli",
    sehir: "İstanbul",
    puan: 4.9,
    fiyat_seviyesi: "$$$$",
    kapak_fotografi: "/images/hotel-1.jpg",
    fotograf_sayisi: 35,
    yorum_sayisi: 214,
    ozellikler: ["Spa", "Havuz", "Fitness Merkezi", "Restoran", "Bar"],
    acik: true,
    calisma_saatleri: "24 saat açık"
  },
  {
    id: "golden-bazaar",
    kategoriId: "alisveris",
    ad: "Golden Bazaar AVM",
    adres: "Barbaros Bulvarı No:145, Beşiktaş",
    sehir: "İstanbul",
    puan: 4.5,
    fiyat_seviyesi: "$$$",
    kapak_fotografi: "/images/shopping-1.jpg",
    fotograf_sayisi: 42,
    yorum_sayisi: 176,
    ozellikler: ["Otopark", "Food Court", "Sinema", "Çocuk Oyun Alanı"],
    acik: true,
    calisma_saatleri: "10:00 - 22:00"
  },
  {
    id: "serra-butik-otel",
    kategoriId: "oteller",
    ad: "Serra Butik Otel",
    adres: "Caferağa Mah. Moda Cad. No:185, Kadıköy",
    sehir: "İstanbul",
    puan: 4.7,
    fiyat_seviyesi: "$$$",
    kapak_fotografi: "/images/hotel-2.jpg",
    fotograf_sayisi: 28,
    yorum_sayisi: 92,
    ozellikler: ["Ücretsiz Kahvaltı", "Deniz Manzarası", "Teras", "Ücretsiz Wi-Fi"],
    acik: true,
    calisma_saatleri: "24 saat açık"
  }
];

// Fiyat seviyesi filtreleme için seçenekler
const fiyatSeviyeleri = ["$", "$$", "$$$", "$$$$"];

// Yıldız puanı bileşeni
const YildizPuani = ({ puan }: { puan: number }) => {
  const yildizlar = [];
  
  for (let i = 1; i <= 5; i++) {
    yildizlar.push(
      <StarIcon 
        key={i} 
        className={`h-4 w-4 ${i <= puan ? 'text-yellow-400' : 'text-gray-300'}`} 
      />
    );
  }
  
  return (
    <div className="flex space-x-0.5">
      {yildizlar}
    </div>
  );
};

// Sayfa parametresi için tip tanımı
interface PageProps {
  params: Promise<{
    kategoriId: string;
  }>;
}

// Kategori Detay Sayfası - Server Component
export default function KategoriDetay({ params }: PageProps) {
  // Next.js 15.3.1'de params Promise'dir
  const resolvedParams = React.use(params);
  const { kategoriId } = resolvedParams;
  
  // Kategori bilgisini al
  const kategori = kategorilerDetay[kategoriId as keyof typeof kategorilerDetay] || null;
  
  // İşletmeleri filtrele
  const filtrelenmisIsletmeler = isletmeler.filter(
    isletme => isletme.kategoriId === kategoriId
  );
  
  // Kategori bulunamadıysa
  if (!kategori) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Kategori Bulunamadı</h1>
            <p className="text-gray-600 mb-6">
              Aradığınız kategori bulunamadı veya kaldırılmış olabilir.
            </p>
            <Link 
              href="/kategoriler" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLongLeftIcon className="h-5 w-5 mr-1" />
              Tüm Kategorilere Dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={kategori.gorsel} 
            alt={kategori.baslik}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container mx-auto h-full flex flex-col justify-center px-4 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">{kategori.baslik}</h1>
          <p className="mt-2 max-w-3xl">{kategori.ozet}</p>
        </div>
      </div>
      
      <main className="flex-grow bg-[var(--light-bg)] dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Üst Bilgi */}
          <div className="mb-6">
            <p className="text-[var(--text-body)]">
              <span className="font-semibold">{filtrelenmisIsletmeler.length}</span> işletme bulundu
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sol Sidebar - Filtreler */}
            <div className="lg:w-1/4">
              <div className="bg-[var(--card-bg)] rounded-lg p-5 shadow-sm mb-4">
                <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Arama</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="İşletme adı veya özellik ara..."
                    className="w-full border border-[var(--border)] rounded p-2 pl-10 bg-[var(--input-bg)] text-[var(--text-body)]"
                  />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                </div>
              </div>
              
              <div className="bg-[var(--card-bg)] rounded-lg p-5 shadow-sm mb-4">
                <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Alt Kategoriler</h2>
                <div className="space-y-2">
                  {kategori.alt_kategoriler.map((altKategori, index) => (
                    <div
                      key={index}
                      className="bg-[var(--card-alt-bg)] text-[var(--text-body)] px-3 py-2 rounded-md hover:bg-[var(--primary-light)] transition-colors"
                    >
                      <span>{altKategori}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[var(--card-bg)] rounded-lg p-5 shadow-sm mb-4">
                <h2 className="text-lg font-semibold mb-3 text-[var(--foreground)]">Fiyat Aralığı</h2>
                <div className="space-y-2 mt-2">
                  {fiyatSeviyeleri.map((fiyat, index) => (
                    <div
                      key={index}
                      className="bg-[var(--card-alt-bg)] text-[var(--text-body)] px-4 py-2 rounded-md hover:bg-[var(--primary-light)] transition-colors"
                    >
                      <span>{fiyat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sağ İçerik - İşletme Listesi */}
            <div className="lg:w-3/4">
              {/* İşletme Listesi */}
              <div className="space-y-4">
                {filtrelenmisIsletmeler.map(isletme => (
                  <Link key={isletme.id} href={`/isletmeler/${isletme.id}`}>
                    <div className="bg-[var(--card-bg)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-60 md:h-auto relative">
                          <Image 
                            src={isletme.kapak_fotografi} 
                            alt={isletme.ad}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-[var(--card-bg)] px-2 py-1 rounded text-sm font-medium text-[var(--text-body)]">
                            {isletme.fiyat_seviyesi}
                          </div>
                          <div className="absolute top-2 right-2 bg-[var(--card-bg)] px-2 py-1 rounded text-xs text-[var(--text-body)]">
                            {isletme.fotograf_sayisi} fotoğraf
                          </div>
                          {!isletme.acik && (
                            <div className="absolute bottom-2 left-2 bg-[var(--error)] text-white px-3 py-1 rounded-full text-sm">
                              Kapalı
                            </div>
                          )}
                        </div>
                        
                        <div className="md:w-2/3 p-5">
                          <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-bold text-[var(--foreground)]">{isletme.ad}</h2>
                            <div className="flex items-center">
                              <span className="mr-1 font-semibold text-[var(--foreground)]">{isletme.puan}</span>
                              <YildizPuani puan={isletme.puan} />
                            </div>
                          </div>
                          
                          <div className="flex items-center text-[var(--text-muted)] mb-4">
                            <MapPinIcon className="h-4 w-4 mr-2" />
                            <span>{isletme.adres}, {isletme.sehir}</span>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {isletme.ozellikler.slice(0, 4).map((ozellik, index) => (
                                <span key={index} className="bg-[var(--card-alt-bg)] px-2 py-1 rounded-md text-xs text-[var(--text-body)]">
                                  {ozellik}
                                </span>
                              ))}
                              {isletme.ozellikler.length > 4 && (
                                <span className="bg-[var(--card-alt-bg)] px-2 py-1 rounded-md text-xs text-[var(--text-body)]">
                                  +{isletme.ozellikler.length - 4} daha
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-[var(--text-muted)]">
                              {isletme.yorum_sayisi} değerlendirme
                            </div>
                            <div className="text-sm">
                              <span className={isletme.acik ? "text-[var(--success)]" : "text-[var(--text-muted)]"}>
                                {isletme.calisma_saatleri}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 