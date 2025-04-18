import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getIsletmeById, getKategoriById } from '@/data/mock-data';
import { 
  MapPinIcon, 
  PhoneIcon, 
  GlobeAltIcon, 
  ChatBubbleLeftIcon,
  HeartIcon,
  ShoppingBagIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { FaWifi, FaParking, FaAccessibleIcon, FaCreditCard, FaChild } from 'react-icons/fa';
import { MdPets, MdOutlineDeliveryDining } from 'react-icons/md';

// Yıldızları çizme yardımcı fonksiyonu
function PuanYildizlari({ puan }: { puan: number }) {
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
}

// İşletme Bulunamadı komponentini ayrı tanımlayalım
function IsletmeBulunamadi() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">İşletme Bulunamadı</h1>
          <p className="text-gray-600 mb-6">
            Aradığınız işletme bulunamadı veya kaldırılmış olabilir.
          </p>
          <Link 
            href="/kategoriler" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Kategorilere Dön
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Sayfa parametresi için tip tanımı
interface PageProps {
  params: Promise<{
    isletmeId: string;
  }>;
}

// İşletme Detay Sayfası - Server Component
export default function IsletmeDetay({ params }: PageProps) {
  // Next.js 15.3.1'de params bir Promise'dir, React.use ile çözümlenmesi gerekir
  const resolvedParams = React.use(params);
  const { isletmeId } = resolvedParams;
  
  // Veri çekme
  const isletme = getIsletmeById(isletmeId);
  const kategori = isletme ? getKategoriById(isletme.kategoriId) : null;
  
  // İşletme bulunamadıysa
  if (!isletme) {
    return <IsletmeBulunamadi />;
  }
  
  // Kapak fotoğrafı ve diğer fotoğraflar için güvenli kontroller
  const kapakFotografi = isletme.kapakFotografi || (isletme.fotograflar && isletme.fotograflar.length > 0 ? isletme.fotograflar[0] : '/images/placeholder.jpg');
  const fotograflar = isletme.fotograflar || [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Bölümü */}
        <div className="relative h-64 md:h-96">
          <div className="absolute inset-0">
            <Image 
              src={kapakFotografi} 
              alt={isletme.ad} 
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="container-custom pb-8">
              <h1 className="text-white text-3xl md:text-4xl font-bold">{isletme.ad}</h1>
              <div className="flex items-center mt-2">
                <PuanYildizlari puan={isletme.ortalamaPuan} />
                <span className="text-white ml-2">
                  {isletme.ortalamaPuan.toFixed(1)} ({isletme.degerlendirmeSayisi} değerlendirme)
                </span>
              </div>
              <div className="flex items-center mt-2">
                <Link 
                  href={`/kategoriler/${isletme.kategoriId}`}
                  className="text-white bg-primary-500 bg-opacity-90 rounded-full px-3 py-1 text-sm"
                >
                  {kategori?.ad || 'Kategori'}
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ana İçerik */}
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sol Sütun - İşletme Bilgileri */}
            <div className="w-full lg:w-2/3">
              {/* Açıklama */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Hakkında</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{isletme.aciklama}</p>
                </div>
              </div>
              
              {/* Özellikler */}
              {isletme.ozellikler && isletme.ozellikler.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Özellikler</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {isletme.ozellikler.map((ozellik, index) => (
                      <div key={index} className="flex items-center">
                        <div className="bg-primary-100 rounded-full p-2 mr-3">
                          {ozellik === 'wifi' && <FaWifi className="h-5 w-5 text-primary-600" />}
                          {ozellik === 'parking' && <FaParking className="h-5 w-5 text-primary-600" />}
                          {ozellik === 'delivery' && <MdOutlineDeliveryDining className="h-5 w-5 text-primary-600" />}
                          {ozellik === 'credit_card' && <FaCreditCard className="h-5 w-5 text-primary-600" />}
                          {ozellik === 'pets' && <MdPets className="h-5 w-5 text-primary-600" />}
                          {ozellik === 'accessible' && <FaAccessibleIcon className="h-5 w-5 text-primary-600" />}
                          {ozellik === 'child_friendly' && <FaChild className="h-5 w-5 text-primary-600" />}
                        </div>
                        <span className="text-gray-700">
                          {ozellik === 'wifi' && 'Ücretsiz Wi-Fi'}
                          {ozellik === 'parking' && 'Otopark'}
                          {ozellik === 'delivery' && 'Paket Servis'}
                          {ozellik === 'credit_card' && 'Kredi Kartı'}
                          {ozellik === 'pets' && 'Evcil Hayvan Dostu'}
                          {ozellik === 'accessible' && 'Engelli Erişimi'}
                          {ozellik === 'child_friendly' && 'Çocuk Dostu'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Fotoğraf Galerisi */}
              {fotograflar.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Fotoğraflar</h2>
                  
                  <div className="mb-4">
                    <div className="relative h-80 w-full rounded-lg overflow-hidden">
                      <Image
                        src={fotograflar[0]}
                        alt={isletme.ad}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {fotograflar.map((foto, index) => (
                      <div 
                        key={index} 
                        className={`relative h-20 rounded-lg overflow-hidden cursor-pointer transition border-2 ${foto === fotograflar[0] ? 'border-primary-500' : 'border-transparent'}`}
                      >
                        <Image
                          src={foto}
                          alt={`${isletme.ad} - Fotoğraf ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Yorumlar */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Değerlendirmeler</h2>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Yorum Ekle
                  </button>
                </div>
                
                {isletme.degerlendirmeler && isletme.degerlendirmeler.length > 0 ? (
                  <div className="space-y-6">
                    {isletme.degerlendirmeler.map((yorum, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                        <div className="flex items-start">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4">
                            <Image
                              src={yorum.kullaniciResim || '/images/avatars/default.png'}
                              alt={yorum.kullaniciAdi}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-900">{yorum.kullaniciAdi}</h3>
                              <span className="text-gray-500 text-sm">{yorum.tarih}</span>
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              <PuanYildizlari puan={yorum.puan} />
                            </div>
                            <p className="text-gray-700">{yorum.yorum}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ChatBubbleLeftIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Henüz değerlendirme yok.</p>
                    <button className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition">
                      İlk Değerlendirmeyi Yap
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sağ Sütun - İletişim Bilgileri */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">İletişim Bilgileri</h2>
                
                {/* Adres */}
                {isletme.lokasyonlar && isletme.lokasyonlar.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Adres</h3>
                    {isletme.lokasyonlar.map((lokasyon, index) => (
                      <div key={index} className="flex mb-3 last:mb-0">
                        <MapPinIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-600">
                            {lokasyon.adres}<br />
                            {lokasyon.ilce}, {lokasyon.il}
                          </p>
                          <a 
                            href={`https://maps.google.com/?q=${lokasyon.adres} ${lokasyon.ilce} ${lokasyon.il}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-1 inline-block"
                          >
                            Haritada Göster
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Telefon */}
                {isletme.lokasyonlar && isletme.lokasyonlar.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Telefon</h3>
                    {isletme.lokasyonlar.map((lokasyon, index) => (
                      <div key={index} className="flex mb-2 last:mb-0">
                        <PhoneIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                        <a 
                          href={`tel:${lokasyon.telefon}`} 
                          className="text-gray-600 hover:text-primary-600"
                        >
                          {lokasyon.telefon}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Web Sitesi */}
                {isletme.webSite && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Web Sitesi</h3>
                    <div className="flex">
                      <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <a 
                        href={isletme.webSite} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary-600 hover:text-primary-700 break-words"
                      >
                        {isletme.webSite.replace(/^https?:\/\//i, '')}
                      </a>
                    </div>
                  </div>
                )}
                
                {/* Çalışma Saatleri */}
                {isletme.calismaGunleri && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Çalışma Saatleri</h3>
                    <div className="space-y-2">
                      {Object.entries(isletme.calismaGunleri).map(([gun, saat]) => (
                        <div key={gun} className="flex justify-between">
                          <span className="text-gray-600">
                            {gun === 'pazartesi' && 'Pazartesi'}
                            {gun === 'sali' && 'Salı'}
                            {gun === 'carsamba' && 'Çarşamba'}
                            {gun === 'persembe' && 'Perşembe'}
                            {gun === 'cuma' && 'Cuma'}
                            {gun === 'cumartesi' && 'Cumartesi'}
                            {gun === 'pazar' && 'Pazar'}
                          </span>
                          <span className={`font-medium ${saat === 'Kapalı' ? 'text-red-500' : 'text-gray-800'}`}>
                            {saat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Eylem Butonları */}
                <div className="space-y-3">
                  <a 
                    href="#" 
                    className="group flex items-center justify-center w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition"
                  >
                    <ShoppingBagIcon className="h-5 w-5 mr-2" />
                    <span>Rezervasyon Yap</span>
                  </a>
                  <button className="group flex items-center justify-center w-full py-2 px-4 border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium rounded-md transition">
                    <HeartIcon className="h-5 w-5 mr-2" />
                    <span>Favorilere Ekle</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 