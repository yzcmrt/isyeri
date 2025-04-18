"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { isletmeler, getKategoriById } from '@/data/mock-data';
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  ArrowLeftIcon,
  MapPinIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export default function IsletmelerAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('');
  
  // Arama ve kategori filtrelemesi
  const filteredIsletmeler = isletmeler.filter(isletme => {
    const matchesSearch = 
      isletme.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      isletme.aciklama.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesKategori = selectedKategori ? isletme.kategoriId === selectedKategori : true;
    
    return matchesSearch && matchesKategori;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Başlık ve Üst Kısım */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <Link href="/admin" className="text-gray-500 hover:text-gray-700 mr-2">
                  <ArrowLeftIcon className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">İşletmeler</h1>
              </div>
              <p className="text-gray-600">Toplam {isletmeler.length} işletme bulunmaktadır.</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link 
                href="/admin/isletmeler/yeni" 
                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Yeni İşletme
              </Link>
            </div>
          </div>
          
          {/* Arama ve Filtreler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="İşletme ara..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
              >
                <option value="">Tüm Kategoriler</option>
                {/* Mevcut kategorilerden dinamik olarak oluşturulacak */}
                <option value="yeme-icme">Yeme & İçme</option>
                <option value="alisveris">Alışveriş</option>
                <option value="saglik-guzellik">Sağlık & Güzellik</option>
                <option value="konaklama">Konaklama</option>
                <option value="egitim">Eğitim</option>
                <option value="eglence">Eğlence & Aktivite</option>
              </select>
            </div>
          </div>
          
          {/* İşletme Tablosu */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşletme
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bilgiler
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIsletmeler.map((isletme) => {
                  const kategori = getKategoriById(isletme.kategoriId);
                  
                  return (
                    <tr key={isletme.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <Image
                              className="h-10 w-10 rounded-md object-contain bg-gray-100 p-1"
                              src={isletme.logo}
                              alt={isletme.ad}
                              fill
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{isletme.ad}</div>
                            <div className="text-sm text-gray-500">{isletme.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                          {kategori?.ad || 'Bilinmiyor'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-sm text-gray-900">
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{isletme.lokasyonlar.length} Lokasyon</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{isletme.ortalamaPuan.toFixed(1)} ({isletme.yorumSayisi} değerlendirme)</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/admin/isletmeler/${isletme.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5 inline" />
                        </Link>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => alert(`${isletme.ad} işletmesini silmek istediğinize emin misiniz?`)}
                        >
                          <TrashIcon className="h-5 w-5 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Boş Durum */}
          {filteredIsletmeler.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm mt-6">
              <p className="text-gray-500 text-lg">Aranan kriterlere uygun işletme bulunamadı.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 