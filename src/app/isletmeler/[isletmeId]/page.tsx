"use client";

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getIsletmeById, getKategoriById } from '@/data/mock-data';
import { 
  StarIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  GlobeAltIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/solid';
import { 
  ClockIcon, 
  TagIcon, 
  ShareIcon, 
  ArrowLeftIcon,
  HeartIcon,
  ArrowLongLeftIcon
} from '@heroicons/react/24/outline';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoCall, IoLocationSharp, IoGlobeOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

interface IsletmeDetayProps {
  params: {
    isletmeId: string;
  };
}

// Yıldız puanlama bileşeni
const PuanYildizlari = ({ puan }: { puan: number }) => {
  const tamYildizlar = Math.floor(puan);
  const yarimYildiz = puan % 1 >= 0.5;
  const bosYildizlar = 5 - tamYildizlar - (yarimYildiz ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(tamYildizlar)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-[var(--primary)] mr-0.5" />
      ))}
      {yarimYildiz && <FaStarHalfAlt className="text-[var(--primary)] mr-0.5" />}
      {[...Array(bosYildizlar)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-[var(--primary)] mr-0.5" />
      ))}
    </div>
  );
};

export default function IsletmeDetay({ params }: IsletmeDetayProps) {
  const { isletmeId } = use(params);
  const isletme = getIsletmeById(isletmeId);
  
  // İşletme bulunamazsa
  if (!isletme) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">İşletme Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız işletme mevcut değil veya kaldırılmış olabilir.</p>
            <Link href="/kategoriler" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLongLeftIcon className="w-5 h-5 mr-2" />
              Kategorilere Dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const [seciliResim, setSeciliResim] = useState(isletme.ana_fotograf || isletme.kapakResmi);
  const kategori = getKategoriById(isletme.kategoriId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-96 w-full">
          <Image 
            src={isletme.kapakResmi} 
            alt={isletme.ad} 
            className="object-cover"
            fill 
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50">
            <div className="container mx-auto px-4 h-full flex items-end pb-10">
              <div className="flex items-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mr-6 shadow-lg">
                  <Image 
                    src={isletme.logo} 
                    alt={`${isletme.ad} Logo`} 
                    width={64} 
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-2">{isletme.ad}</h1>
                  <div className="flex items-center mb-2">
                    <PuanYildizlari puan={isletme.ortalamaPuan} />
                    <span className="font-semibold mr-2">{isletme.ortalamaPuan.toFixed(1)}</span>
                    <span className="text-white/80">({isletme.yorumSayisi} yorum)</span>
                    {kategori && (
                      <>
                        <span className="mx-2">•</span>
                        <Link href={`/kategoriler/${kategori.id}`} className="text-white/80 hover:text-white">
                          {kategori.ad}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* İşletme İçeriği */}
        <div className="container mx-auto px-4 py-8">
          {/* Üst Aksiyon Butonları */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <Link href={kategori ? `/kategoriler/${kategori.id}` : '/kategoriler'} className="inline-flex items-center text-[var(--text-body)] hover:text-[var(--foreground)]">
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              {kategori ? kategori.ad : 'Kategoriler'} Listesine Dön
            </Link>

            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-body)] hover:bg-[var(--border)]">
                <HeartIcon className="w-5 h-5 mr-2 text-[var(--error)]" />
                Favori
              </button>
              <button className="inline-flex items-center px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-body)] hover:bg-[var(--border)]">
                <ShareIcon className="w-5 h-5 mr-2 text-[var(--primary)]" />
                Paylaş
              </button>
            </div>
          </div>

          {/* İçerik Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ana İçerik - Sol Taraf */}
            <div className="lg:col-span-2">
              {/* Hakkında */}
              <section className="bg-[var(--card-bg)] rounded-xl shadow-sm p-6 mb-8 border border-[var(--border)]">
                <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Hakkında</h2>
                <p className="text-[var(--text-body)] mb-6">
                  {isletme.aciklama}
                </p>

                {/* Özellikler */}
                {isletme.ozellikler.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-[var(--foreground)]">Özellikler</h3>
                    <div className="flex flex-wrap gap-2">
                      {isletme.ozellikler.map((ozellik, idx) => (
                        <div key={idx} className="flex items-center">
                          <FaCheck className="text-[var(--success)] mr-2" />
                          <span className="text-[var(--text-body)]">{ozellik}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Fotoğraf Galerisi */}
              <section className="bg-[var(--card-bg)] rounded-xl shadow-sm p-6 mb-8 border border-[var(--border)]">
                <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Fotoğraf Galerisi</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {isletme.galeriResimleri.map((resim, idx) => (
                    <div key={idx} className="relative h-40 rounded-lg overflow-hidden">
                      <Image 
                        src={resim} 
                        alt={`${isletme.ad} - Galeri ${idx+1}`} 
                        fill
                        className="object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Yorumlar */}
              <section className="bg-[var(--card-bg)] rounded-xl shadow-sm p-6 mb-8 border border-[var(--border)]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[var(--foreground)]">Yorumlar & Değerlendirmeler</h2>
                  <div className="flex items-center">
                    <PuanYildizlari puan={isletme.ortalamaPuan} />
                    <span className="font-semibold text-[var(--foreground)]">{isletme.ortalamaPuan.toFixed(1)}</span>
                    <span className="text-[var(--text-muted)] ml-1">({isletme.yorumSayisi})</span>
                  </div>
                </div>

                {isletme.yorumlar.length === 0 ? (
                  <p className="text-[var(--text-muted)] italic">Henüz yorum bulunmuyor. İlk yorumu siz yapın!</p>
                ) : (
                  <div className="space-y-6">
                    {isletme.yorumlar.map((yorum, idx) => (
                      <div key={idx} className="border-b border-[var(--border)] pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[var(--border)] flex items-center justify-center text-[var(--text-body)] font-semibold mr-3">
                              {yorum.kullaniciAdi.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-medium text-[var(--foreground)]">{yorum.kullaniciAdi}</h4>
                              <p className="text-sm text-[var(--text-muted)]">{yorum.tarih}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <PuanYildizlari puan={yorum.puan} />
                          </div>
                        </div>
                        <p className="text-[var(--text-body)]">{yorum.yorum}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Yorum Yap Butonu */}
                <div className="mt-8">
                  <button className="inline-flex items-center px-5 py-3 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition">
                    <ChatBubbleLeftEllipsisIcon className="w-5 h-5 mr-2" />
                    Yorum Yap
                  </button>
                </div>
              </section>
            </div>

            {/* Yan Panel - Sağ Taraf */}
            <div>
              {/* İletişim Bilgileri */}
              <section className="bg-[var(--card-bg)] rounded-xl shadow-sm p-6 mb-6 border border-[var(--border)]">
                <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">İletişim Bilgileri</h2>
                
                {isletme.lokasyonlar.length > 0 && (
                  <div className="flex items-start mb-4">
                    <MapPinIcon className="w-5 h-5 text-[var(--text-muted)] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-[var(--foreground)]">Adres</h3>
                      <div className="space-y-2 mt-1">
                        {isletme.lokasyonlar.map((lokasyon, idx) => (
                          <div key={idx} className="text-[var(--text-body)]">
                            <p className="font-medium">{lokasyon.sube_adi || 'Merkez Şube'}</p>
                            <p>{lokasyon.adres}</p>
                            <p>{lokasyon.ilce}, {lokasyon.il}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start mb-4">
                  <PhoneIcon className="w-5 h-5 text-[var(--text-muted)] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">Telefon</h3>
                    <p className="text-[var(--text-body)] mt-1">
                      {isletme.lokasyonlar && isletme.lokasyonlar.length > 0
                        ? isletme.lokasyonlar[0].telefon
                        : "Telefon bilgisi mevcut değil"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <EnvelopeIcon className="w-5 h-5 text-[var(--text-muted)] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">E-posta</h3>
                    <p className="text-[var(--text-body)] mt-1">iletisim@{isletme.slug}.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <GlobeAltIcon className="w-5 h-5 text-[var(--text-muted)] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">Web Sitesi</h3>
                    <a 
                      href={`https://www.${isletme.slug}.com`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline mt-1 inline-block"
                    >
                      www.{isletme.slug}.com
                    </a>
                  </div>
                </div>
              </section>
              
              {/* Çalışma Saatleri */}
              <section className="bg-[var(--card-bg)] rounded-xl shadow-sm p-6 mb-6 border border-[var(--border)]">
                <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">Çalışma Saatleri</h2>
                {isletme.lokasyonlar && isletme.lokasyonlar.length > 0 && isletme.lokasyonlar[0].calisma_saatleri ? (
                  <div className="space-y-2">
                    {isletme.lokasyonlar[0].calisma_saatleri.map((saat, idx) => (
                      <div key={idx} className="flex justify-between py-1">
                        <span className="text-[var(--text-body)]">{saat.gun}</span>
                        <span className="text-[var(--foreground)]">
                          {saat.acilis} - {saat.kapanis}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[var(--text-muted)]">Çalışma saatleri bilgisi mevcut değil</p>
                )}
              </section>
              
              {/* Konum Haritası (Placeholder) */}
              <section className="bg-[var(--card-bg)] rounded-xl shadow-sm p-6 mb-6 border border-[var(--border)]">
                <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">Konum</h2>
                <div className="w-full h-64 bg-[var(--border)] rounded-lg flex items-center justify-center">
                  <p className="text-[var(--text-muted)]">Harita görünümü burada yer alacak</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 