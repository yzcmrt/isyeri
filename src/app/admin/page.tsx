"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { 
  BuildingStorefrontIcon, 
  TagIcon, 
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function AdminPanel() {
  const modules = [
    {
      id: 'kategoriler',
      title: 'Kategoriler',
      description: 'Tüm kategorileri görüntüle, düzenle, ekle veya kaldır',
      icon: TagIcon,
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      link: '/admin/kategoriler'
    },
    {
      id: 'isletmeler',
      title: 'İşletmeler',
      description: 'Tüm işletmeleri görüntüle, düzenle, ekle veya kaldır',
      icon: BuildingStorefrontIcon,
      color: 'bg-green-100',
      textColor: 'text-green-700',
      link: '/admin/isletmeler'
    },
    {
      id: 'lokasyonlar',
      title: 'Lokasyonlar',
      description: 'İşletmelere ait lokasyonları görüntüle, düzenle, ekle veya kaldır',
      icon: MapPinIcon,
      color: 'bg-purple-100',
      textColor: 'text-purple-700',
      link: '/admin/lokasyonlar'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Paneli</h1>
          <p className="text-gray-600 mb-8">
            İşletmeleri ve kategorileri yönetmek için aşağıdaki modülleri kullanabilirsiniz.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Link 
                key={module.id}
                href={module.link}
                className="block p-6 bg-white rounded-xl shadow-sm transition hover:shadow-md border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${module.color}`}>
                    <module.icon className={`w-6 h-6 ${module.textColor}`} />
                  </div>
                  <h2 className="text-xl font-bold ml-3 text-gray-900">{module.title}</h2>
                </div>
                <p className="text-gray-600">{module.description}</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 p-6 bg-gray-50 rounded-xl">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Hızlı İstatistikler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Toplam Kategori</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Toplam İşletme</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Toplam Lokasyon</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 