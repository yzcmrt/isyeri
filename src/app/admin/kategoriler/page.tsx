"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { kategoriler } from '@/data/mock-data';
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function KategorilerAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Arama filtrelemesi
  const filteredKategoriler = kategoriler.filter(kategori => 
    kategori.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kategori.aciklama.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-2xl font-bold text-gray-900">Kategoriler</h1>
              </div>
              <p className="text-gray-600">Toplam {kategoriler.length} kategori bulunmaktadır.</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link 
                href="/admin/kategoriler/yeni" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Yeni Kategori
              </Link>
            </div>
          </div>
          
          {/* Arama */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Kategori ara..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          
          {/* Kategori Tablosu */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Açıklama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşletme Sayısı
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredKategoriler.map((kategori) => (
                  <tr key={kategori.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <Image
                            className="h-10 w-10 rounded-md object-cover"
                            src={kategori.resimUrl}
                            alt={kategori.ad}
                            fill
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{kategori.ad}</div>
                          <div className="text-sm text-gray-500">{kategori.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-md truncate">{kategori.aciklama}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {kategori.isletmeSayisi}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/admin/kategoriler/${kategori.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <PencilIcon className="h-5 w-5 inline" />
                      </Link>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => alert(`${kategori.ad} kategorisini silmek istediğinize emin misiniz?`)}
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
          {filteredKategoriler.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm mt-6">
              <p className="text-gray-500 text-lg">Aranan kriterlere uygun kategori bulunamadı.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 