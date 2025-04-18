"use client";

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getKategoriById, getIsletmelerByKategori, Isletme } from '@/data/mock-data';
import { StarIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { 
  FunnelIcon, 
  ArrowsUpDownIcon, 
  TagIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ArrowLongLeftIcon
} from '@heroicons/react/24/outline';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt } from "react-icons/fa";

interface KategoriDetayProps {
  params: {
    kategoriId: string;
  };
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
const fiyatSeviyeleri = [
  { id: "$", etiket: "Ekonomik" },
  { id: "$$", etiket: "Uygun" },
  { id: "$$$", etiket: "Pahalı" },
  { id: "$$$$", etiket: "Lüks" }
];

// Yıldız puanı bileşeni
const YildizPuani = ({ puan }: { puan: number }) => {
  const yildizlar = [];
  const tamYildiz = Math.floor(puan);
  const yarimYildiz = puan - tamYildiz >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < tamYildiz) {
      yildizlar.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (i === tamYildiz && yarimYildiz) {
      yildizlar.push(<FaStar key={i} className="text-yellow-500" />);
    } else {
      yildizlar.push(<FaStar key={i} className="text-gray-300" />);
    }
  }

  return <div className="flex">{yildizlar}</div>;
};

export default function KategoriDetay({ params }: KategoriDetayProps) {
  const { kategoriId } = use(params);
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliAltKategoriler, setSeciliAltKategoriler] = useState<string[]>([]);
  const [acikMekanlar, setAcikMekanlar] = useState(false);
  const [seciliFiyatSeviyeleri, setSeciliFiyatSeviyeleri] = useState<string[]>([]);
  const [siralamaKriteri, setSiralamaKriteri] = useState("puan");
  const [kategori, setKategori] = useState<any>(null);
  const [filtrelenmisIsletmeler, setFiltrelenmisIsletmeler] = useState<any[]>([]);
  
  // URL parametresinden kategoriyi al
  useEffect(() => {
    if (kategorilerDetay[kategoriId as keyof typeof kategorilerDetay]) {
      setKategori(kategorilerDetay[kategoriId as keyof typeof kategorilerDetay]);
    }
  }, [kategoriId]);

  // İşletmeleri filtrele
  useEffect(() => {
    if (!kategori) return;
    
    let sonuc = isletmeler.filter(isletme => isletme.kategoriId === kategori.id);
    
    // Arama metni filtreleme
    if (aramaMetni) {
      sonuc = sonuc.filter(isletme => 
        isletme.ad.toLowerCase().includes(aramaMetni.toLowerCase()) ||
        isletme.adres.toLowerCase().includes(aramaMetni.toLowerCase())
      );
    }
    
    // Alt kategori filtreleme
    if (seciliAltKategoriler.length > 0) {
      // Not: Gerçek uygulamada işletmelerin alt kategorileri olacaktır
      // Bu mock veride sadece örnek gösterim için dahil etmedik
    }
    
    // Sadece açık mekanlar
    if (acikMekanlar) {
      sonuc = sonuc.filter(isletme => isletme.acik);
    }
    
    // Fiyat seviyesi filtreleme
    if (seciliFiyatSeviyeleri.length > 0) {
      sonuc = sonuc.filter(isletme => 
        seciliFiyatSeviyeleri.includes(isletme.fiyat_seviyesi)
      );
    }
    
    // Sıralama
    sonuc.sort((a, b) => {
      if (siralamaKriteri === "puan") {
        return b.puan - a.puan;
      } else if (siralamaKriteri === "yorum") {
        return b.yorum_sayisi - a.yorum_sayisi;
      }
      return 0;
    });
    
    setFiltrelenmisIsletmeler(sonuc);
  }, [kategori, aramaMetni, seciliAltKategoriler, acikMekanlar, seciliFiyatSeviyeleri, siralamaKriteri]);

  // Alt kategori seçimi değiştirme
  const altKategoriToggle = (altKategori: string) => {
    if (seciliAltKategoriler.includes(altKategori)) {
      setSeciliAltKategoriler(seciliAltKategoriler.filter(k => k !== altKategori));
    } else {
      setSeciliAltKategoriler([...seciliAltKategoriler, altKategori]);
    }
  };

  // Fiyat seviyesi seçimi değiştirme
  const fiyatSeviyesiToggle = (fiyat: string) => {
    if (seciliFiyatSeviyeleri.includes(fiyat)) {
      setSeciliFiyatSeviyeleri(seciliFiyatSeviyeleri.filter(f => f !== fiyat));
    } else {
      setSeciliFiyatSeviyeleri([...seciliFiyatSeviyeleri, fiyat]);
    }
  };

  // Kategori bulunamazsa
  if (!kategori) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Kategori Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız kategori mevcut değil veya kaldırılmış olabilir.</p>
            <Link href="/kategoriler" className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-hover)]">
              <ArrowLongLeftIcon className="w-5 h-5 mr-2" />
              Kategorilere Dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <main className="container-custom py-8">
        {!kategori ? (
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">Kategori Bulunamadı</h1>
            <p className="text-[var(--text-body)] mb-6">Aradığınız kategori mevcut değil veya kaldırılmış olabilir.</p>
            <Link href="/kategoriler" className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-dark)]">
              <ArrowLongLeftIcon className="w-5 h-5 mr-2" />
              Kategorilere Dön
            </Link>
          </div>
        ) : (
          <div>
            {/* Kategori başlık */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">{kategori.baslik}</h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filtreler - Sol taraf */}
              <div className="lg:col-span-1">
                <div className="bg-[var(--card-bg)] p-6 rounded-lg shadow-sm border border-[var(--border)]">
                  <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">Filtreler</h2>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Alt Kategoriler</h3>
                    <div className="flex flex-wrap gap-2">
                      {kategori.alt_kategoriler.map((altKategori, idx) => (
                        <button
                          key={idx}
                          onClick={() => altKategoriToggle(altKategori)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            seciliAltKategoriler.includes(altKategori)
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--card-bg)] text-[var(--text-body)] border border-[var(--border)] hover:bg-[var(--border)]"
                          }`}
                        >
                          {altKategori}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        id="sadece-acik"
                        type="checkbox"
                        checked={acikMekanlar}
                        onChange={() => setAcikMekanlar(!acikMekanlar)}
                        className="w-4 h-4 text-[var(--primary)] bg-[var(--card-bg)] border-[var(--border)] rounded focus:ring-[var(--primary)] focus:ring-2"
                      />
                      <label htmlFor="sadece-acik" className="ml-2 text-[var(--text-body)] text-sm font-medium">
                        Sadece Açık Mekanlar
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Fiyat Seviyesi</h3>
                    <div className="flex flex-wrap gap-2">
                      {fiyatSeviyeleri.map((fiyat) => (
                        <button
                          key={fiyat.id}
                          onClick={() => fiyatSeviyesiToggle(fiyat.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            seciliFiyatSeviyeleri.includes(fiyat.id)
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--card-bg)] text-[var(--text-body)] border border-[var(--border)] hover:bg-[var(--border)]"
                          }`}
                        >
                          {fiyat.id}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">Kategori Hakkında</h2>
                  <p className="text-[var(--text-body)] mb-4">
                    {kategori.aciklama}
                  </p>
                  <div className="text-sm text-[var(--text-muted)]">
                    Bu kategoride toplam <span className="font-semibold">{kategori.isletme_sayisi}</span> işletme bulunuyor.
                  </div>
                </div>
              </div>
              
              {/* İşletmeler - Sağ taraf */}
              <div className="lg:col-span-3">
                {/* Arama ve Filtreleme */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--border)]">
                  <div className="flex items-center mb-4 md:mb-0">
                    <FunnelIcon className="h-5 w-5 text-[var(--text-muted)] mr-2" />
                    <span className="text-[var(--foreground)] font-medium">Filtrele:</span>
                    <div className="flex ml-4 space-x-2">
                      <button className="px-3 py-1 border border-[var(--border)] rounded-full text-sm text-[var(--text-body)] hover:bg-[var(--border)]">Özellikler</button>
                      <button className="px-3 py-1 border border-[var(--border)] rounded-full text-sm text-[var(--text-body)] hover:bg-[var(--border)]">Konum</button>
                      <button className="px-3 py-1 border border-[var(--border)] rounded-full text-sm text-[var(--text-body)] hover:bg-[var(--border)]">Puan</button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <ArrowsUpDownIcon className="h-5 w-5 text-[var(--text-muted)] mr-2" />
                    <span className="text-[var(--foreground)] font-medium mr-2">Sırala:</span>
                    <select 
                      className="px-3 py-1.5 border border-[var(--border)] rounded text-sm bg-[var(--card-bg)] text-[var(--text-body)]"
                      value={siralamaKriteri}
                      onChange={(e) => setSiralamaKriteri(e.target.value)}
                    >
                      <option value="puan">En Yüksek Puan</option>
                      <option value="yorum">En Çok Yorum</option>
                    </select>
                  </div>
                </div>
                
                {/* Arama ve Sıralama */}
                <div className="bg-[var(--card-bg)] p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="relative w-full md:w-2/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-[var(--text-muted)]" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-[var(--card-bg)] text-[var(--text-body)]"
                      placeholder={`${kategori.baslik} ara...`}
                      value={aramaMetni}
                      onChange={(e) => setAramaMetni(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* İşletme Kartları */}
                {filtrelenmisIsletmeler.length > 0 ? (
                  <div className="space-y-6">
                    {filtrelenmisIsletmeler.map((isletme) => (
                      <Link 
                        key={isletme.id} 
                        href={`/isletmeler/${isletme.id}`}
                        className="block bg-[var(--card-bg)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row">
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
                          
                          <div className="p-6 md:w-2/3">
                            <div className="flex justify-between items-start mb-2">
                              <h2 className="text-xl font-bold text-[var(--foreground)]">{isletme.ad}</h2>
                              <div className="flex items-center">
                                <span className="mr-1 font-semibold text-[var(--foreground)]">{isletme.puan}</span>
                                <YildizPuani puan={isletme.puan} />
                              </div>
                            </div>
                            
                            <div className="flex items-center text-[var(--text-muted)] mb-4">
                              <FaMapMarkerAlt className="mr-2" />
                              <span>{isletme.adres}, {isletme.sehir}</span>
                            </div>
                            
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-2">
                                {isletme.ozellikler.map((ozellik: string) => (
                                  <span 
                                    key={ozellik} 
                                    className="inline-block px-2 py-1 text-xs bg-[var(--border)] text-[var(--text-body)] rounded-full"
                                  >
                                    {ozellik}
                                  </span>
                                ))}
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
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[var(--card-bg)] p-8 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">Hiç sonuç bulunamadı</h3>
                    <p className="text-[var(--text-body)] mb-4">Arama kriterlerinize uygun işletme bulunamadı. Lütfen filtrelerinizi değiştirin.</p>
                    <button 
                      onClick={() => {
                        setAramaMetni("");
                        setSeciliAltKategoriler([]);
                        setAcikMekanlar(false);
                        setSeciliFiyatSeviyeleri([]);
                      }}
                      className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition"
                    >
                      Filtreleri Temizle
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
} 