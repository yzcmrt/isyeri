"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { isletmeler } from '@/data/mock-data';

const turkiyeIlleri = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
  'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
  'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
  'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
  'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
  'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
  'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
  'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];

export default function YeniLokasyon() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    isletmeId: '',
    sube_adi: '',
    il: '',
    ilce: '',
    adres: '',
    telefon: '',
    haritaUrl: '',
    calisma_saatleri: [
      { gun: 'Pazartesi', acilis: '09:00', kapanis: '18:00' },
      { gun: 'Salı', acilis: '09:00', kapanis: '18:00' },
      { gun: 'Çarşamba', acilis: '09:00', kapanis: '18:00' },
      { gun: 'Perşembe', acilis: '09:00', kapanis: '18:00' },
      { gun: 'Cuma', acilis: '09:00', kapanis: '18:00' },
      { gun: 'Cumartesi', acilis: '10:00', kapanis: '16:00' },
      { gun: 'Pazar', acilis: '', kapanis: '' },
    ]
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Çalışma saatleri için değişiklik işleyicisi
  const handleCalismaSaatiChange = (index: number, field: 'acilis' | 'kapanis', value: string) => {
    setFormData(prev => {
      const saatler = [...prev.calisma_saatleri];
      saatler[index] = {
        ...saatler[index],
        [field]: value
      };
      return {
        ...prev,
        calisma_saatleri: saatler
      };
    });
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.isletmeId) {
      newErrors.isletmeId = 'İşletme seçimi gereklidir.';
    }
    
    if (!formData.il) {
      newErrors.il = 'İl seçimi gereklidir.';
    }
    
    if (!formData.ilce.trim()) {
      newErrors.ilce = 'İlçe gereklidir.';
    }
    
    if (!formData.adres.trim()) {
      newErrors.adres = 'Adres gereklidir.';
    } else if (formData.adres.length < 10) {
      newErrors.adres = 'Adres en az 10 karakter olmalıdır.';
    }
    
    if (!formData.telefon.trim()) {
      newErrors.telefon = 'Telefon gereklidir.';
    } else if (!/^0[2-5][0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}$/.test(formData.telefon) && 
               !/^0[2-5][0-9]{9}$/.test(formData.telefon) &&
               !/^05[0-9]{9}$/.test(formData.telefon) &&
               !/^05[0-9]{1} [0-9]{3} [0-9]{2} [0-9]{2}$/.test(formData.telefon)) {
      newErrors.telefon = 'Geçerli bir telefon numarası giriniz. (Örn: 0212 123 45 67 veya 05XX XXX XX XX)';
    }
    
    if (formData.haritaUrl && !formData.haritaUrl.startsWith('http')) {
      newErrors.haritaUrl = 'Geçerli bir URL giriniz.';
    }
    
    // Çalışma saatleri kontrolü
    for (let i = 0; i < 6; i++) { // Pazartesi-Cumartesi zorunlu
      const saat = formData.calisma_saatleri[i];
      if (!saat.acilis || !saat.kapanis) {
        newErrors[`calisma_${i}`] = `${saat.gun} günü için çalışma saatleri belirtmelisiniz.`;
      }
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
      
      // Şube ID'si oluşturmak
      const selectedIsletme = isletmeler.find(i => i.id === formData.isletmeId);
      const subeId = `${formData.isletmeId}-${formData.il.toLowerCase()}${formData.sube_adi ? '-' + formData.sube_adi.toLowerCase().replace(/\s+/g, '-') : ''}`;
      
      console.log('Eklenecek lokasyon:', {
        ...formData,
        id: subeId,
      });
      
      alert('Lokasyon başarıyla eklendi!');
      router.push('/admin/lokasyonlar');
    } catch (error) {
      console.error('Lokasyon eklenirken hata oluştu:', error);
      alert('Lokasyon eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
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
              <Link href="/admin/lokasyonlar" className="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Yeni Lokasyon Ekle</h1>
            </div>
            <p className="text-gray-600">
              Bir işletmeye yeni lokasyon eklemek için aşağıdaki formu doldurun.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
            <div className="space-y-6">
              {/* İşletme Seçimi */}
              <div>
                <label htmlFor="isletmeId" className="block text-sm font-medium text-gray-700 mb-1">
                  İşletme
                </label>
                <select
                  id="isletmeId"
                  name="isletmeId"
                  value={formData.isletmeId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.isletmeId ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">İşletme Seçin</option>
                  {isletmeler.map(isletme => (
                    <option key={isletme.id} value={isletme.id}>{isletme.ad}</option>
                  ))}
                </select>
                {errors.isletmeId && <p className="mt-1 text-sm text-red-600">{errors.isletmeId}</p>}
              </div>
              
              {/* Şube Bilgileri */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Şube Bilgileri</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sube_adi" className="block text-sm font-medium text-gray-700 mb-1">
                      Şube Adı (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      id="sube_adi"
                      name="sube_adi"
                      value={formData.sube_adi}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Örn: Merkez, Avm, Şube 2, vb."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Boş bırakırsanız, "Merkez Şube" olarak kabul edilir.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="text"
                      id="telefon"
                      name="telefon"
                      value={formData.telefon}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.telefon ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="0212 123 45 67"
                    />
                    {errors.telefon && <p className="mt-1 text-sm text-red-600">{errors.telefon}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="il" className="block text-sm font-medium text-gray-700 mb-1">
                      İl
                    </label>
                    <select
                      id="il"
                      name="il"
                      value={formData.il}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.il ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">İl Seçin</option>
                      {turkiyeIlleri.map(il => (
                        <option key={il} value={il}>{il}</option>
                      ))}
                    </select>
                    {errors.il && <p className="mt-1 text-sm text-red-600">{errors.il}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="ilce" className="block text-sm font-medium text-gray-700 mb-1">
                      İlçe
                    </label>
                    <input
                      type="text"
                      id="ilce"
                      name="ilce"
                      value={formData.ilce}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.ilce ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Örn: Kadıköy"
                    />
                    {errors.ilce && <p className="mt-1 text-sm text-red-600">{errors.ilce}</p>}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="adres" className="block text-sm font-medium text-gray-700 mb-1">
                    Adres
                  </label>
                  <textarea
                    id="adres"
                    name="adres"
                    value={formData.adres}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.adres ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Tam adres bilgisi"
                  />
                  {errors.adres && <p className="mt-1 text-sm text-red-600">{errors.adres}</p>}
                </div>
                
                <div className="mt-4">
                  <label htmlFor="haritaUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Harita URL (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    id="haritaUrl"
                    name="haritaUrl"
                    value={formData.haritaUrl}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.haritaUrl ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="https://maps.google.com/?q=latitude,longitude"
                  />
                  {errors.haritaUrl && <p className="mt-1 text-sm text-red-600">{errors.haritaUrl}</p>}
                </div>
              </div>
              
              {/* Çalışma Saatleri */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Çalışma Saatleri</h2>
                
                <div className="space-y-3">
                  {formData.calisma_saatleri.map((saat, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-sm font-medium text-gray-700">
                        {saat.gun}
                      </div>
                      
                      <div>
                        <input
                          type="time"
                          value={saat.acilis}
                          onChange={(e) => handleCalismaSaatiChange(index, 'acilis', e.target.value)}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors[`calisma_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Açılış"
                          disabled={saat.gun === 'Pazar'}
                        />
                      </div>
                      
                      <div>
                        <input
                          type="time"
                          value={saat.kapanis}
                          onChange={(e) => handleCalismaSaatiChange(index, 'kapanis', e.target.value)}
                          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors[`calisma_${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Kapanış"
                          disabled={saat.gun === 'Pazar'}
                        />
                      </div>
                      
                      {errors[`calisma_${index}`] && (
                        <p className="col-span-3 mt-1 text-sm text-red-600">{errors[`calisma_${index}`]}</p>
                      )}
                    </div>
                  ))}
                  
                  <div className="col-span-3 mt-2 text-sm text-gray-500">
                    * Pazar günü için saat girilmezse kapalı olarak kabul edilir.
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-end">
                  <Link
                    href="/admin/lokasyonlar"
                    className="px-4 py-2 mr-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    İptal
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 bg-purple-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Kaydediliyor...' : 'Lokasyon Ekle'}
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