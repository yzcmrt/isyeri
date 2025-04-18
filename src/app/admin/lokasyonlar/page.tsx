"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { isletmeler } from '@/data/mock-data';
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  ArrowLeftIcon,
  MapPinIcon,
  PhoneIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';

// Tüm lokasyonları çıkarıyoruz
const tumLokasyonlar = isletmeler.flatMap(isletme => 
  isletme.lokasyonlar.map(lokasyon => ({
    ...lokasyon,
    isletmeAdi: isletme.ad,
    isletmeId: isletme.id
  }))
);

export default function LokasyonlarAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIsletme, setSelectedIsletme] = useState('');
  const [selectedSehir, setSelectedSehir] = useState('');
  
  // Benzersiz şehir listesi
  const sehirler = Array.from(new Set(tumLokasyonlar.map(lok => lok.il))).sort();
  
  // Benzersiz işletme listesi
  const isletmeListesi = Array.from(new Set(isletmeler.map(i => i.id))).map(id => {
    const isletme = isletmeler.find(i => i.id === id);
    return {
      id: isletme?.id || '',
      ad: isletme?.ad || ''
    };
  }).sort((a, b) => a.ad.localeCompare(b.ad));
  
  // Filtreleme
  const filteredLokasyonlar = tumLokasyonlar.filter(lokasyon => {
    const matchesSearch = lokasyon.adres.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         lokasyon.il.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lokasyon.ilce.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIsletme = selectedIsletme ? lokasyon.isletmeId === selectedIsletme : true;
    const matchesSehir = selectedSehir ? lokasyon.il === selectedSehir : true;
    
    return matchesSearch && matchesIsletme && matchesSehir;
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
                <h1 className="text-2xl font-bold text-gray-900">Lokasyonlar</h1>
              </div>
              <p className="text-gray-600">Toplam {tumLokasyonlar.length} lokasyon bulunmaktadır.</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link 
                href="/admin/lokasyonlar/yeni" 
                className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Yeni Lokasyon
              </Link>
            </div>
          </div>
          
          {/* Arama ve Filtreler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Lokasyon ara..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedIsletme}
                onChange={(e) => setSelectedIsletme(e.target.value)}
              >
                <option value="">Tüm İşletmeler</option>
                {isletmeListesi.map(isletme => (
                  <option key={isletme.id} value={isletme.id}>{isletme.ad}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={selectedSehir}
                onChange={(e) => setSelectedSehir(e.target.value)}
              >
                <option value="">Tüm Şehirler</option>
                {sehirler.map(sehir => (
                  <option key={sehir} value={sehir}>{sehir}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Lokasyon Tablosu */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşletme
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Şehir/İlçe
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adres/İletişim
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLokasyonlar.map((lokasyon) => (
                  <tr key={lokasyon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BuildingOffice2Icon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lokasyon.isletmeAdi}</div>
                          <div className="text-sm text-gray-500">
                            {lokasyon.id.includes("-") && lokasyon.id.split("-")[1] !== lokasyon.isletmeId 
                              ? "Şube: " + lokasyon.id.split("-")[1] 
                              : "Merkez Şube"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{lokasyon.il}</div>
                          <div className="text-sm text-gray-500">{lokasyon.ilce}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{lokasyon.adres}</div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <PhoneIcon className="h-4 w-4 text-gray-400 mr-1" />
                        {lokasyon.telefon}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/admin/lokasyonlar/${lokasyon.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <PencilIcon className="h-5 w-5 inline" />
                      </Link>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => alert(`${lokasyon.isletmeAdi} - ${lokasyon.il} lokasyonunu silmek istediğinize emin misiniz?`)}
                      >
                        <TrashIcon className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Boş Durum */}
          {filteredLokasyonlar.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm mt-6">
              <p className="text-gray-500 text-lg">Aranan kriterlere uygun lokasyon bulunamadı.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 