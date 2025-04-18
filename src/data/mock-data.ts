export interface Kategori {
  id: string;
  ad: string;
  slug: string;
  resimUrl: string;
  aciklama: string;
  isletmeSayisi: number;
}

export interface Lokasyon {
  id: string;
  isletmeId: string;
  il: string;
  ilce: string;
  adres: string;
  telefon: string;
  haritaUrl?: string;
  calisma_saatleri: {
    gun: string;
    acilis: string;
    kapanis: string;
  }[];
}

export interface Yorum {
  id: string;
  isletmeId: string;
  kullaniciAdi: string;
  kullaniciResim: string;
  puan: number;
  tarih: string;
  yorum: string;
}

export interface Isletme {
  id: string;
  ad: string;
  slug: string;
  logo: string;
  kapakResmi: string;
  kategoriId: string;
  aciklama: string;
  kisa_aciklama: string;
  ortalamaPuan: number;
  yorumSayisi: number;
  galeriResimleri: string[];
  ozellikler: string[];
  lokasyonlar: Lokasyon[];
  yorumlar: Yorum[];
}

// Kategoriler
export const kategoriler: Kategori[] = [
  {
    id: "yeme-icme",
    ad: "Yeme & İçme",
    slug: "yeme-icme",
    resimUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    aciklama: "Restoranlar, kafeler, pastaneler ve daha fazlası.",
    isletmeSayisi: 158
  },
  {
    id: "alisveris",
    ad: "Alışveriş",
    slug: "alisveris",
    resimUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    aciklama: "Mağazalar, butikler, alışveriş merkezleri ve daha fazlası.",
    isletmeSayisi: 92
  },
  {
    id: "saglik-guzellik",
    ad: "Sağlık & Güzellik",
    slug: "saglik-guzellik",
    resimUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    aciklama: "Kuaförler, spa merkezleri, klinikler ve daha fazlası.",
    isletmeSayisi: 73
  },
  {
    id: "konaklama",
    ad: "Konaklama",
    slug: "konaklama",
    resimUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    aciklama: "Oteller, pansiyonlar, tatil köyleri ve daha fazlası.",
    isletmeSayisi: 45
  },
  {
    id: "egitim",
    ad: "Eğitim",
    slug: "egitim",
    resimUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    aciklama: "Okullar, kurslar, dil okulları ve daha fazlası.",
    isletmeSayisi: 67
  },
  {
    id: "eglence",
    ad: "Eğlence & Aktivite",
    slug: "eglence",
    resimUrl: "https://images.unsplash.com/photo-1586899028174-e7098604235b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    aciklama: "Sinemalar, tiyatrolar, oyun salonları ve daha fazlası.",
    isletmeSayisi: 39
  }
];

// İşletmeler
export const isletmeler: Isletme[] = [
  {
    id: "mcdonalds",
    ad: "McDonald's",
    slug: "mcdonalds",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/2339px-McDonald%27s_Golden_Arches.svg.png",
    kapakResmi: "https://images.unsplash.com/photo-1619881590738-a111d176d906?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    kategoriId: "yeme-icme",
    aciklama: "McDonald's, dünya çapında tanınan bir fast food restoranlar zinciridir. 1940 yılında Richard ve Maurice McDonald kardeşler tarafından Amerika Birleşik Devletleri'nin Kaliforniya eyaletinde kurulmuştur. McDonald's, özellikle hamburger, cheeseburger, patates kızartması, tavuk ürünleri, kahvaltı ürünleri, tatlılar ve meşrubatlar sunan bir fast food restoranıdır.\n\nMcDonald's, dünya genelinde 100'den fazla ülkede 38.000'den fazla restoranıyla hizmet vermektedir. Şirket, dünya çapında tanınan logosu, standart menüsü ve hızlı servisi ile bilinmektedir. McDonald's'ın en popüler ürünleri arasında Big Mac, Quarter Pounder, Chicken McNuggets ve McFlurry bulunmaktadır.",
    kisa_aciklama: "Hızlı ve lezzetli fast food deneyimi sunan dünya çapında tanınan restoran zinciri.",
    ortalamaPuan: 4.2,
    yorumSayisi: 1243,
    galeriResimleri: [
      "https://images.unsplash.com/photo-1619881590738-a111d176d906?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1631168228401-d37bb7c80f8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1552526881-5517a57b6d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
    ozellikler: ["Wi-Fi", "Paket Servis", "Otopark", "Çocuk Dostu", "Engelli Erişimi", "24 Saat Açık"],
    lokasyonlar: [
      {
        id: "mcdonalds-izmir",
        isletmeId: "mcdonalds",
        il: "İzmir",
        ilce: "Konak",
        adres: "Alsancak Mah., Atatürk Cad. No:123, 35220 Konak/İzmir",
        telefon: "0232 123 45 67",
        haritaUrl: "https://maps.google.com/?q=38.4192,27.1287",
        calisma_saatleri: [
          { gun: "Pazartesi", acilis: "09:00", kapanis: "23:00" },
          { gun: "Salı", acilis: "09:00", kapanis: "23:00" },
          { gun: "Çarşamba", acilis: "09:00", kapanis: "23:00" },
          { gun: "Perşembe", acilis: "09:00", kapanis: "23:00" },
          { gun: "Cuma", acilis: "09:00", kapanis: "00:00" },
          { gun: "Cumartesi", acilis: "09:00", kapanis: "00:00" },
          { gun: "Pazar", acilis: "10:00", kapanis: "22:00" }
        ]
      },
      {
        id: "mcdonalds-istanbul",
        isletmeId: "mcdonalds",
        il: "İstanbul",
        ilce: "Kadıköy",
        adres: "Caferağa Mah., Moda Cad. No:45, 34710 Kadıköy/İstanbul",
        telefon: "0216 234 56 78",
        haritaUrl: "https://maps.google.com/?q=40.9901,29.0233",
        calisma_saatleri: [
          { gun: "Pazartesi", acilis: "09:00", kapanis: "23:00" },
          { gun: "Salı", acilis: "09:00", kapanis: "23:00" },
          { gun: "Çarşamba", acilis: "09:00", kapanis: "23:00" },
          { gun: "Perşembe", acilis: "09:00", kapanis: "23:00" },
          { gun: "Cuma", acilis: "09:00", kapanis: "00:00" },
          { gun: "Cumartesi", acilis: "09:00", kapanis: "00:00" },
          { gun: "Pazar", acilis: "10:00", kapanis: "22:00" }
        ]
      }
    ],
    yorumlar: [
      {
        id: "yorum1",
        isletmeId: "mcdonalds",
        kullaniciAdi: "Ahmet Yılmaz",
        kullaniciResim: "https://randomuser.me/api/portraits/men/1.jpg",
        puan: 4,
        tarih: "2023-05-15",
        yorum: "Hızlı servis ve temiz bir ortam. Çocuklarla gitmek için ideal bir yer. Personel çok ilgiliydi."
      },
      {
        id: "yorum2",
        isletmeId: "mcdonalds",
        kullaniciAdi: "Ayşe Kaya",
        kullaniciResim: "https://randomuser.me/api/portraits/women/2.jpg",
        puan: 5,
        tarih: "2023-04-20",
        yorum: "Alsancak şubesi gerçekten çok temiz ve düzenli. Siparişim çok hızlı geldi. Wi-Fi bağlantısı da oldukça iyi."
      },
      {
        id: "yorum3",
        isletmeId: "mcdonalds",
        kullaniciAdi: "Mehmet Demir",
        kullaniciResim: "https://randomuser.me/api/portraits/men/3.jpg",
        puan: 3,
        tarih: "2023-03-10",
        yorum: "Yemekler lezzetli fakat fiyatlar biraz yüksek. Otopark imkanı sunmaları büyük avantaj."
      }
    ]
  },
  {
    id: "burgerking",
    ad: "Burger King",
    slug: "burgerking",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/2172px-Burger_King_2020.svg.png",
    kapakResmi: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    kategoriId: "yeme-icme",
    aciklama: "Burger King, 1954 yılında James McLamore ve David Edgerton tarafından Florida'da kurulmuş, dünya çapında tanınan bir fast food restoran zinciridir. Şirket, ateşte ızgara yöntemiyle pişirilen hamburgerleri, özellikle imzası niteliğindeki Whopper'ı ile bilinir.\n\nBurger King, 100'den fazla ülkede 18.700'den fazla restoranıyla faaliyet göstermektedir. Menüsünde hamburgerler, cheeseburgerler, tavuk ürünleri, salata, atıştırmalıklar, tatlılar ve içecekler bulunmaktadır. Burger King ayrıca sabah kahvaltısı menüsü de sunmaktadır.",
    kisa_aciklama: "Ateşte ızgara hamburgerleri ve özel Whopper'ı ile tanınan global fast food zinciri.",
    ortalamaPuan: 4.3,
    yorumSayisi: 987,
    galeriResimleri: [
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
    ozellikler: ["Wi-Fi", "Paket Servis", "Otopark", "Çocuk Dostu", "Engelli Erişimi"],
    lokasyonlar: [
      {
        id: "burgerking-ankara",
        isletmeId: "burgerking",
        il: "Ankara",
        ilce: "Çankaya",
        adres: "Kızılay Mah., Atatürk Bulvarı No:78, 06420 Çankaya/Ankara",
        telefon: "0312 345 67 89",
        haritaUrl: "https://maps.google.com/?q=39.9208,32.8541",
        calisma_saatleri: [
          { gun: "Pazartesi", acilis: "10:00", kapanis: "22:00" },
          { gun: "Salı", acilis: "10:00", kapanis: "22:00" },
          { gun: "Çarşamba", acilis: "10:00", kapanis: "22:00" },
          { gun: "Perşembe", acilis: "10:00", kapanis: "22:00" },
          { gun: "Cuma", acilis: "10:00", kapanis: "23:00" },
          { gun: "Cumartesi", acilis: "10:00", kapanis: "23:00" },
          { gun: "Pazar", acilis: "11:00", kapanis: "21:00" }
        ]
      },
      {
        id: "burgerking-istanbul",
        isletmeId: "burgerking",
        il: "İstanbul",
        ilce: "Beşiktaş",
        adres: "Sinanpaşa Mah., Ortabahçe Cad. No:32, 34353 Beşiktaş/İstanbul",
        telefon: "0212 456 78 90",
        haritaUrl: "https://maps.google.com/?q=41.0421,29.0044",
        calisma_saatleri: [
          { gun: "Pazartesi", acilis: "10:00", kapanis: "22:00" },
          { gun: "Salı", acilis: "10:00", kapanis: "22:00" },
          { gun: "Çarşamba", acilis: "10:00", kapanis: "22:00" },
          { gun: "Perşembe", acilis: "10:00", kapanis: "22:00" },
          { gun: "Cuma", acilis: "10:00", kapanis: "23:00" },
          { gun: "Cumartesi", acilis: "10:00", kapanis: "23:00" },
          { gun: "Pazar", acilis: "11:00", kapanis: "21:00" }
        ]
      }
    ],
    yorumlar: [
      {
        id: "yorum1",
        isletmeId: "burgerking",
        kullaniciAdi: "Emre Şahin",
        kullaniciResim: "https://randomuser.me/api/portraits/men/4.jpg",
        puan: 5,
        tarih: "2023-06-02",
        yorum: "Whopper her zamanki gibi mükemmeldi. Çankaya şubesindeki personel çok ilgili ve güler yüzlü."
      },
      {
        id: "yorum2",
        isletmeId: "burgerking",
        kullaniciAdi: "Zeynep Aydın",
        kullaniciResim: "https://randomuser.me/api/portraits/women/5.jpg",
        puan: 4,
        tarih: "2023-05-18",
        yorum: "Çocuklar için menü seçenekleri çok iyi. Oyun alanı da temiz ve güvenli."
      },
      {
        id: "yorum3",
        isletmeId: "burgerking",
        kullaniciAdi: "Ali Yıldız",
        kullaniciResim: "https://randomuser.me/api/portraits/men/6.jpg",
        puan: 3,
        tarih: "2023-04-29",
        yorum: "Hamburgerler lezzetli ancak servis süresi bazen çok uzayabiliyor. Özellikle kalabalık saatlerde."
      }
    ]
  },
  {
    id: "golden-bazaar",
    ad: "Golden Bazaar AVM",
    slug: "golden-bazaar",
    logo: "https://img.freepik.com/premium-vector/shopping-mall-logo-design-template_145155-1458.jpg",
    kapakResmi: "https://images.unsplash.com/photo-1568548637601-52d3a322ad43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    kategoriId: "alisveris",
    aciklama: "Golden Bazaar AVM, İstanbul'un kalbinde yer alan modern bir alışveriş merkezidir. 2015 yılında açılan bu çok katlı kompleks, moda, elektronik, ev eşyaları, yeme-içme ve eğlence alanında birçok markayı bir araya getirmektedir.\n\nToplam 200'den fazla mağaza, geniş bir food court alanı, özel tasarlanmış çocuk oyun alanları, sinema salonları ve kapalı otopark imkanı sunmaktadır. Golden Bazaar, her yaş ve zevke hitap eden ürün çeşitliliği ile ziyaretçilerine kapsamlı bir alışveriş deneyimi sağlamayı amaçlamaktadır.",
    kisa_aciklama: "İstanbul'un merkezinde yer alan lüks ve modern alışveriş merkezi.",
    ortalamaPuan: 4.5,
    yorumSayisi: 176,
    galeriResimleri: [
      "https://images.unsplash.com/photo-1568548637601-52d3a322ad43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1582467029543-c2bae54cf247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    ],
    ozellikler: ["Kapalı Otopark", "Food Court", "Sinema", "Çocuk Oyun Alanı", "Wi-Fi", "Engelli Erişimi", "Güvenlik"],
    lokasyonlar: [
      {
        id: "golden-bazaar-istanbul",
        isletmeId: "golden-bazaar",
        il: "İstanbul",
        ilce: "Beşiktaş",
        adres: "Barbaros Bulvarı No:145, 34349 Beşiktaş/İstanbul",
        telefon: "0212 987 65 43",
        haritaUrl: "https://maps.google.com/?q=41.0434,29.0108",
        calisma_saatleri: [
          { gun: "Pazartesi", acilis: "10:00", kapanis: "22:00" },
          { gun: "Salı", acilis: "10:00", kapanis: "22:00" },
          { gun: "Çarşamba", acilis: "10:00", kapanis: "22:00" },
          { gun: "Perşembe", acilis: "10:00", kapanis: "22:00" },
          { gun: "Cuma", acilis: "10:00", kapanis: "23:00" },
          { gun: "Cumartesi", acilis: "10:00", kapanis: "23:00" },
          { gun: "Pazar", acilis: "11:00", kapanis: "21:00" }
        ]
      }
    ],
    yorumlar: [
      {
        id: "yorum1",
        isletmeId: "golden-bazaar",
        kullaniciAdi: "Zeynep Aksoy",
        kullaniciResim: "https://randomuser.me/api/portraits/women/12.jpg",
        puan: 5,
        tarih: "2023-06-15",
        yorum: "Harika bir alışveriş merkezi. Tüm ihtiyaçlarınızı karşılayabilirsiniz. Mağaza çeşitliliği çok iyi ve özellikle food court'taki restoranlar muhteşem."
      },
      {
        id: "yorum2",
        isletmeId: "golden-bazaar",
        kullaniciAdi: "Burak Demir",
        kullaniciResim: "https://randomuser.me/api/portraits/men/28.jpg",
        puan: 4,
        tarih: "2023-05-22",
        yorum: "Sinema salonları oldukça konforlu. Hafta içi sakinken, hafta sonu biraz kalabalık olabiliyor. Otopark ücretsiz olması büyük avantaj."
      },
      {
        id: "yorum3",
        isletmeId: "golden-bazaar",
        kullaniciAdi: "Deniz Kaya",
        kullaniciResim: "https://randomuser.me/api/portraits/women/22.jpg",
        puan: 5,
        tarih: "2023-04-18",
        yorum: "Çocuk oyun alanı çok güzel tasarlanmış, çocuklarım çok eğleniyor. Alışveriş yaparken onları bırakıp rahatça gezebiliyorum."
      },
      {
        id: "yorum4",
        isletmeId: "golden-bazaar",
        kullaniciAdi: "Murat Yıldırım",
        kullaniciResim: "https://randomuser.me/api/portraits/men/45.jpg",
        puan: 4,
        tarih: "2023-03-05",
        yorum: "Merkezi konumu nedeniyle ulaşımı çok kolay. Markaların çeşitliliği iyi düşünülmüş, her bütçeye uygun seçenekler var."
      }
    ]
  }
];

// Spesifik işletmeleri kategoriye göre getirme fonksiyonu
export function getIsletmelerByKategori(kategoriId: string): Isletme[] {
  return isletmeler.filter(isletme => isletme.kategoriId === kategoriId);
}

// Spesifik bir işletmeyi ID'ye göre getirme fonksiyonu
export function getIsletmeById(isletmeId: string): Isletme | undefined {
  return isletmeler.find(isletme => isletme.id === isletmeId);
}

// Spesifik bir kategoriyi ID'ye göre getirme fonksiyonu
export function getKategoriById(kategoriId: string): Kategori | undefined {
  return kategoriler.find(kategori => kategori.id === kategoriId);
}

// Spesifik bir işletmenin spesifik lokasyonunu getirme fonksiyonu
export function getLokasyonByIsletmeAndId(isletmeId: string, lokasyonId: string): Lokasyon | undefined {
  const isletme = getIsletmeById(isletmeId);
  if (!isletme) return undefined;
  return isletme.lokasyonlar.find(lokasyon => lokasyon.id === lokasyonId);
}

// Veritabanı fonksiyonları

/**
 * İşletme ID'sine göre lokasyonları filtreler
 */
export function getLokasyonlarByIsletme(isletmeId: string): Lokasyon[] {
  const isletme = getIsletmeById(isletmeId);
  return isletme ? isletme.lokasyonlar : [];
}

/**
 * İşletme ve şehir ID'sine göre lokasyon getirir
 */
export function getLokasyonByIsletmeVeSehir(isletmeId: string, sehir: string): Lokasyon | undefined {
  const lokasyonlar = getLokasyonlarByIsletme(isletmeId);
  return lokasyonlar.find(l => l.il.toLowerCase() === sehir.toLowerCase());
} 