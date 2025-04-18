"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { kategoriler } from '@/data/mock-data';

export default function YeniIsletme() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ad: '',
    slug: '',
    logo: '',
    kapakResmi: '',
    kategoriId: '',
    aciklama: '',
    kisa_aciklama: '',
    ozellikler: [''],
    galeriResimleri: [''],
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  
  // Diziler için değişiklik işleme
  const handleArrayChange = (name: string, index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[name as keyof typeof prev] as string[]];
      newArray[index] = value;
      return {
        ...prev,
        [name]: newArray
      };
    });
  };
  
  // Diziye yeni öğe ekleme
  const handleAddArrayItem = (name: string) => {
    setFormData(prev => {
      const newArray = [...prev[name as keyof typeof prev] as string[], ''];
      return {
        ...prev,
        [name]: newArray
      };
    });
  };
  
  // Diziden öğe silme
  const handleRemoveArrayItem = (name: string, index: number) => {
    setFormData(prev => {
      const newArray = [...prev[name as keyof typeof prev] as string[]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [name]: newArray.length ? newArray : [''] // En az bir boş alan kalmasını sağla
      };
    });
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.ad.trim()) {
      newErrors.ad = 'İşletme adı gereklidir.';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug gereklidir.';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug yalnızca küçük harfler, sayılar ve tire içerebilir.';
    }
    
    if (!formData.logo.trim()) {
      newErrors.logo = 'Logo URL gereklidir.';
    } else if (!formData.logo.startsWith('http')) {
      newErrors.logo = 'Geçerli bir URL giriniz.';
    }
    
    if (!formData.kapakResmi.trim()) {
      newErrors.kapakResmi = 'Kapak resmi URL gereklidir.';
    } else if (!formData.kapakResmi.startsWith('http')) {
      newErrors.kapakResmi = 'Geçerli bir URL giriniz.';
    }
    
    if (!formData.kategoriId) {
      newErrors.kategoriId = 'Kategori seçimi gereklidir.';
    }
    
    if (!formData.aciklama.trim()) {
      newErrors.aciklama = 'Açıklama gereklidir.';
    } else if (formData.aciklama.length < 50) {
      newErrors.aciklama = 'Açıklama en az 50 karakter olmalıdır.';
    }
    
    if (!formData.kisa_aciklama.trim()) {
      newErrors.kisa_aciklama = 'Kısa açıklama gereklidir.';
    } else if (formData.kisa_aciklama.length < 10) {
      newErrors.kisa_aciklama = 'Kısa açıklama en az 10 karakter olmalıdır.';
    }
    
    // Galeri resimleri kontrolü
    const invalidGaleri = formData.galeriResimleri.some(url => url.trim() && !url.startsWith('http'));
    if (invalidGaleri) {
      newErrors.galeriResimleri = 'Tüm galeri resimleri geçerli URL olmalıdır.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Boş dizi öğelerini temizle
    const cleanedFormData = {
      ...formData,
      ozellikler: formData.ozellikler.filter(o => o.trim()),
      galeriResimleri: formData.galeriResimleri.filter(g => g.trim())
    };
    
    setLoading(true);
    
    try {
      // Normalde burada API çağrısı yapılacak
      // Şimdilik ekleme simülasyonu yapıyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Eklenecek işletme:', cleanedFormData);
      alert('İşletme başarıyla eklendi!');
      router.push('/admin/isletmeler');
    } catch (error) {
      console.error('İşletme eklenirken hata oluştu:', error);
      alert('İşletme eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Başlık ve Üst Kısım */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Link href="/admin/isletmeler" className="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Yeni İşletme Ekle</h1>
            </div>
            <p className="text-gray-600">
              Sisteme yeni bir işletme eklemek için aşağıdaki formu doldurun.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
            <div className="space-y-6">
              {/* Temel Bilgiler */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Temel Bilgiler</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ad" className="block text-sm font-medium text-gray-700 mb-1">
                      İşletme Adı
                    </label>
                    <input
                      type="text"
                      id="ad"
                      name="ad"
                      value={formData.ad}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.ad ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Örn: McDonald's"
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
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.slug ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Örn: mcdonalds"
                    />
                    {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                      Logo URL
                    </label>
                    <input
                      type="text"
                      id="logo"
                      name="logo"
                      value={formData.logo}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.logo ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="https://example.com/logo.png"
                    />
                    {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="kapakResmi" className="block text-sm font-medium text-gray-700 mb-1">
                      Kapak Resmi URL
                    </label>
                    <input
                      type="text"
                      id="kapakResmi"
                      name="kapakResmi"
                      value={formData.kapakResmi}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.kapakResmi ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="https://example.com/cover.jpg"
                    />
                    {errors.kapakResmi && <p className="mt-1 text-sm text-red-600">{errors.kapakResmi}</p>}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="kategoriId" className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    id="kategoriId"
                    name="kategoriId"
                    value={formData.kategoriId}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.kategoriId ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Kategori Seçin</option>
                    {kategoriler.map((kategori) => (
                      <option key={kategori.id} value={kategori.id}>
                        {kategori.ad}
                      </option>
                    ))}
                  </select>
                  {errors.kategoriId && <p className="mt-1 text-sm text-red-600">{errors.kategoriId}</p>}
                </div>
              </div>
              
              {/* Açıklamalar */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Açıklamalar</h2>
                
                <div>
                  <label htmlFor="kisa_aciklama" className="block text-sm font-medium text-gray-700 mb-1">
                    Kısa Açıklama
                  </label>
                  <input
                    type="text"
                    id="kisa_aciklama"
                    name="kisa_aciklama"
                    value={formData.kisa_aciklama}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.kisa_aciklama ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Kart görünümünde gösterilecek kısa açıklama"
                  />
                  {errors.kisa_aciklama && <p className="mt-1 text-sm text-red-600">{errors.kisa_aciklama}</p>}
                </div>
                
                <div className="mt-4">
                  <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700 mb-1">
                    Detaylı Açıklama
                  </label>
                  <textarea
                    id="aciklama"
                    name="aciklama"
                    value={formData.aciklama}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.aciklama ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="İşletme hakkında detaylı açıklama yazın..."
                  />
                  {errors.aciklama && <p className="mt-1 text-sm text-red-600">{errors.aciklama}</p>}
                </div>
              </div>
              
              {/* Özellikler */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Özellikler</h2>
                  <button 
                    type="button"
                    onClick={() => handleAddArrayItem('ozellikler')}
                    className="inline-flex items-center p-1.5 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
                
                {formData.ozellikler.map((ozellik, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={ozellik}
                      onChange={(e) => handleArrayChange('ozellikler', index, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Örn: Wi-Fi, Otopark, Çocuk Oyun Alanı, vb."
                    />
                    <button 
                      type="button"
                      onClick={() => handleRemoveArrayItem('ozellikler', index)}
                      className="ml-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                      disabled={formData.ozellikler.length === 1 && !ozellik}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Galeri Resimleri */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Galeri Resimleri</h2>
                  <button 
                    type="button"
                    onClick={() => handleAddArrayItem('galeriResimleri')}
                    className="inline-flex items-center p-1.5 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
                
                {formData.galeriResimleri.map((resim, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={resim}
                      onChange={(e) => handleArrayChange('galeriResimleri', index, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="https://example.com/gallery-image.jpg"
                    />
                    <button 
                      type="button"
                      onClick={() => handleRemoveArrayItem('galeriResimleri', index)}
                      className="ml-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                      disabled={formData.galeriResimleri.length === 1 && !resim}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                {errors.galeriResimleri && <p className="mt-1 text-sm text-red-600">{errors.galeriResimleri}</p>}
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-end">
                  <Link
                    href="/admin/isletmeler"
                    className="px-4 py-2 mr-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    İptal
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Kaydediliyor...' : 'İşletme Ekle'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 