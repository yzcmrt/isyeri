import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const ekipUyeleri = [
  {
    id: 1,
    ad: 'Ahmet Yılmaz',
    unvan: 'Kurucu & CEO',
    foto: '/images/team/team-1.jpg',
    ozgecmis: 'Teknoloji ve turizm sektöründe 15 yıllık deneyimi ile sektöre yön veren projeler geliştirmiştir.',
  },
  {
    id: 2,
    ad: 'Ayşe Demir',
    unvan: 'CTO',
    foto: '/images/team/team-2.jpg',
    ozgecmis: 'Yazılım mühendisliği alanında uzman olan Ayşe, platformumuzun teknik altyapısını yönetmektedir.',
  },
  {
    id: 3,
    ad: 'Mehmet Kaya',
    unvan: 'Pazarlama Direktörü',
    foto: '/images/team/team-3.jpg',
    ozgecmis: 'Dijital pazarlama konusunda 10 yılı aşkın deneyimi ile işletmelerimizin büyümesine katkı sağlamaktadır.',
  },
  {
    id: 4,
    ad: 'Zeynep Şahin',
    unvan: 'Müşteri İlişkileri Müdürü',
    foto: '/images/team/team-4.jpg',
    ozgecmis: 'Kullanıcı deneyimi ve müşteri memnuniyeti odaklı yaklaşımı ile platformumuzun gelişimine katkı sağlamaktadır.',
  },
];

export default function Hakkimizda() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-primary-600 py-16">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
            <p className="text-xl max-w-3xl mx-auto">
              İşletmeler ve müşteriler arasında köprü kurarak yerel ekonomiyi güçlendiriyoruz
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow">
        {/* Misyon & Vizyon */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Misyonumuz</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Yerel işletmelerin dijital dünyada daha güçlü var olmasını sağlayarak, müşteriler ile işletmeler arasında sağlam bağlar kurmayı amaçlıyoruz. Platformumuz, işletmelerin kendilerini tanıtabileceği, müşterilerin ise kaliteli hizmet alabileceği güvenilir bir ekosistem oluşturmak için tasarlanmıştır.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Vizyonumuz</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Türkiye'nin en güvenilir ve kapsamlı işletme rehberi olarak, her sektörden her büyüklükteki işletmenin dijital varlığını güçlendiren, müşterilerin bilinçli tercihler yapmasını sağlayan lider platform olmayı hedefliyoruz. Teknoloji ve yenilikçi çözümlerle sürekli kendimizi geliştirerek sektöre öncülük etmeyi amaçlıyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Hikayemiz */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Hikayemiz</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Nasıl başladık ve bugünlere nasıl geldik?
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                  <Image 
                    src="/images/about/our-story.jpg" 
                    alt="Hikayemiz" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">2020&apos;den Beri Yanınızdayız</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  2020 yılında, yerel işletmelerin dijital dönüşümüne katkıda bulunmak ve müşterilerin daha bilinçli tercihler yapmasını sağlamak amacıyla yola çıktık. Küçük bir ekiple başladığımız bu yolculukta, bugün Türkiye&apos;nin 81 ilinde binlerce işletmeyi platformumuzda ağırlıyoruz.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Pandemi döneminde işletmelerin dijital varlıklarını güçlendirme ihtiyacı doğrultusunda hızla büyüdük ve geliştirdiğimiz yenilikçi çözümlerle sektörde öncü bir konuma geldik. 
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Bugün, kullanıcı odaklı yaklaşımımız, şeffaf değerlendirme sistemimiz ve sürekli genişleyen işletme ağımızla Türkiye&apos;nin en güvenilir işletme rehberi olma yolunda emin adımlarla ilerliyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Ekibimiz */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ekibimiz</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Platformumuzu geliştiren ve büyüten tutkulu ekibimizle tanışın
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {ekipUyeleri.map((uye) => (
                <div key={uye.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
                  <div className="relative h-64 w-full">
                    <Image 
                      src={uye.foto} 
                      alt={uye.ad} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">{uye.ad}</h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">{uye.unvan}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{uye.ozgecmis}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* İletişim */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Bize Ulaşın</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize ulaşın
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition duration-300">
                <div className="flex justify-center mb-4">
                  <EnvelopeIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">E-posta</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Size en kısa sürede dönüş yapacağız
                </p>
                <a href="mailto:info@example.com" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                  info@rehberim.com
                </a>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition duration-300">
                <div className="flex justify-center mb-4">
                  <PhoneIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Telefon</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Hafta içi 09:00 - 18:00 saatleri arasında
                </p>
                <a href="tel:+902121234567" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                  +90 (212) 123 45 67
                </a>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition duration-300">
                <div className="flex justify-center mb-4">
                  <MapPinIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Adres</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Genel merkezimiz
                </p>
                <address className="text-primary-600 dark:text-primary-400 font-medium not-italic">
                  Levent, Büyükdere Cad. No:123<br />
                  34394 Şişli/İstanbul
                </address>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">Rehberimize Katılın</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Binlerce işletme ve müşteri platformumuzda buluşuyor. Siz de yerinizi alın!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/isletme-kayit" 
                className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3"
              >
                İşletmenizi Ekleyin
              </Link>
              <Link 
                href="/isletmeler" 
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3"
              >
                İşletmeleri Keşfedin
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 