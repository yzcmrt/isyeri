"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function YeniKategori() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ad: '',
    slug: '',
    resimUrl: '',
    aciklama: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Ad değiştiğinde otomatik slug oluşturma
    if (name === 'ad') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, '-');
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: slug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.ad.trim()) {
      newErrors.ad = 'Kategori adı gereklidir.';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug gereklidir.';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug yalnızca küçük harfler, sayılar ve tire içerebilir.';
    }
    
    if (!formData.resimUrl.trim()) {
      newErrors.resimUrl = 'Resim URL gereklidir.';
    } else if (!formData.resimUrl.startsWith('http')) {
      newErrors.resimUrl = 'Geçerli bir URL giriniz.';
    }
    
    if (!formData.aciklama.trim()) {
      newErrors.aciklama = 'Açıklama gereklidir.';
    } else if (formData.aciklama.length < 10) {
      newErrors.aciklama = 'Açıklama en az 10 karakter olmalıdır.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Normalde burada API çağrısı yapılacak
      // Şimdilik ekleme simülasyonu yapıyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Kategori başarıyla eklendi!');
      router.push('/admin/kategoriler');
    } catch (error) {
      console.error('Kategori eklenirken hata oluştu:', error);
      alert('Kategori eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Başlık ve Üst Kısım */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Link href="/admin/kategoriler" className="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Yeni Kategori Ekle</h1>
            </div>
            <p className="text-gray-600">
              Sisteme yeni bir kategori eklemek için aşağıdaki formu doldurun.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="ad" className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori Adı
                </label>
                <input
                  type="text"
                  id="ad"
                  name="ad"
                  value={formData.ad}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.ad ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Örn: Yeme & İçme"
                />
                {errors.ad && <p className="mt-1 text-sm text-red-600">{errors.ad}</p>}
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.slug ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Örn: yeme-icme"
                />
                <p className="mt-1 text-xs text-gray-500">
                  URL'de kullanılacak benzersiz tanımlayıcı. Otomatik oluşturulur, gerekirse düzenleyebilirsiniz.
                </p>
                {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
              </div>
              
              <div>
                <label htmlFor="resimUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Resim URL
                </label>
                <input
                  type="text"
                  id="resimUrl"
                  name="resimUrl"
                  value={formData.resimUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.resimUrl ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.resimUrl && <p className="mt-1 text-sm text-red-600">{errors.resimUrl}</p>}
              </div>
              
              <div>
                <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  id="aciklama"
                  name="aciklama"
                  value={formData.aciklama}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.aciklama ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Kategori hakkında kısa bir açıklama yazın..."
                />
                {errors.aciklama && <p className="mt-1 text-sm text-red-600">{errors.aciklama}</p>}
              </div>
              
              <div className="flex justify-end pt-4">
                <Link
                  href="/admin/kategoriler"
                  className="px-4 py-2 mr-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Kaydediliyor...' : 'Kategori Ekle'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 