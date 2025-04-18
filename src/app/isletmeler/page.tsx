import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { isletmeler, Isletme } from '@/data/mock-data';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { FunnelIcon, ArrowsUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Isletmeler() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-primary-600 py-12">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">İşletmeler</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Binlerce işletme arasından seçim yapın, yorumları okuyun ve kendi deneyimlerinizi paylaşın
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Arama ve Filtreler */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Arama */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="İşletme adı, özellik veya konum ara..."
              />
            </div>
            
            {/* Filtreler */}
            <div className="flex gap-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none">
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filtrele
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none">
                <ArrowsUpDownIcon className="h-4 w-4 mr-2" />
                Sırala
              </button>
            </div>
          </div>
        </div>
        
        {/* İşletme Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isletmeler.map((isletme: Isletme) => (
            <Link href={`/isletmeler/${isletme.id}`} key={isletme.id} className="group">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200">
                <div className="relative h-48 w-full">
                  <Image 
                    src={isletme.kapakResmi} 
                    alt={isletme.ad} 
                    className="object-cover"
                    fill
                  />
                  <div className="absolute top-3 left-3">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow">
                      <Image 
                        src={isletme.logo.includes('freepik.com') ? '/images/default-logo.png' : isletme.logo} 
                        alt={`${isletme.ad} Logo`} 
                        width={32} 
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">{isletme.ad}</h3>
                  
                  <div className="flex items-center mt-2 mb-3">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-500" />
                      <span className="ml-1 text-gray-700 dark:text-gray-300 font-medium">{isletme.ortalamaPuan}</span>
                    </div>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{isletme.yorumSayisi} yorum</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                    {isletme.kisa_aciklama}
                  </p>
                  
                  {isletme.lokasyonlar[0] && (
                    <div className="flex items-start text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <MapPinIcon className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-0.5 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">
                        {isletme.lokasyonlar[0].il}, {isletme.lokasyonlar[0].ilce}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Sayfalama */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-1">
            <button className="px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              &laquo; Önceki
            </button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              3
            </button>
            <button className="px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Sonraki &raquo;
            </button>
          </nav>
        </div>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 mt-16 rounded-lg">
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
  );
} 