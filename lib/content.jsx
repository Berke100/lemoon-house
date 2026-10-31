// All site content in one place: edit text, photos and figures here.

export const AIRBNB_URL = 'https://www.airbnb.com.tr/rooms/588353073778753527';

export const CONTACT = {
  phone: '0 507 250 31 85',
  tel: '+905072503185',
  email: 'sapancalemoonhouse@gmail.com',
  address: 'Kırkpınar Hasanpaşa Mahallesi, Kamer Sokak No:10, Sapanca / Sakarya',
};
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Kamer Sokak No:10 Hasanpaşa Mahallesi Kırkpınar Sapanca Sakarya');

/* ---------- scroll tour (video) ---------- */
export const CHAPTERS = [
  { id: 'havuz', label: 'Havuz', frame: 28,
    title: (<>Doğanın içinde, <em>size özel</em> bir dünya</>),
    text: 'Özel havuzunuz, yemyeşil bahçeniz ve huzur dolu bir kaçamak sizi bekliyor.' },
  { id: 'salon', label: 'Salon', frame: 104,
    title: (<>Sıcak, ferah ve <em>davetkâr</em></>),
    text: 'Doğal ahşap dokular, yüksek tavanlar ve modern detaylarla tasarlanmış yaşam alanı.' },
  { id: 'mutfak', label: 'Mutfak', frame: 160,
    title: (<>Ev konforunda <em>her detay</em></>),
    text: 'Özenle tasarlanmış mutfağınızda, tatilin küçük anlarının keyfini çıkarın.' },
  { id: 'yatak-odasi', label: 'Yatak odası', frame: 238,
    title: (<>Huzurlu bir <em>uyanış</em></>),
    text: 'Günün sonunda sizi bekleyen sakin, sıcak ve konforlu bir dinlenme alanı.' },
];

/* ---------- line icons (24×24, stroke) ---------- */
export const ICON = {
  guests: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 12 0v1M16 3.2a4 4 0 0 1 0 7.6M22 21v-1a6 6 0 0 0-4-5.6',
  pool: 'M2 16c2.5 0 2.5 1.5 5 1.5S9.5 16 12 16s2.5 1.5 5 1.5 2.5-1.5 5-1.5M2 20c2.5 0 2.5 1.5 5 1.5S9.5 20 12 20s2.5 1.5 5 1.5 2.5-1.5 5-1.5M7 13V5.5a2 2 0 0 1 4 0M13 13V5.5a2 2 0 0 1 4 0M7 9h6',
  jacuzzi: 'M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM8 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM13.5 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM17.5 9.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z',
  flame: 'M12 21.5c-3.9 0-6-2.6-6-5.6 0-3.4 3-5.4 3.6-8.9 2.6 1.6 3.4 4 3.4 4s1-1.2 1.2-3c2.1 1.9 3.8 4.4 3.8 7.4 0 3.4-2.1 6.1-6 6.1z',
  wifi: 'M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01',
  tv: 'M3 5h18v12H3zM8 21h8M12 17v4',
  snow: 'M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5',
  grill: 'M4 9h16a8 8 0 0 1-16 0zM9 16.5 7 22M15 16.5l2 5.5M9 2.5c0 1.5 1 1.5 1 3M13.5 2.5c0 1.5 1 1.5 1 3',
  car: 'M3 16v-4l2-5h14l2 5v4zM3 16v2h3v-2M18 16v2h3v-2M7 12.5h.01M17 12.5h.01',
  clean: 'M9 3h4l1 4H8zM8 7h6v3l2 3v8H6v-8l2-3zM17 4l1-1M19 6h1M18 8l1 1',
  check: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12l3 3 5-6',
  key: 'M14.5 13.5a5 5 0 1 0-4-4L3 17v3h3v-2h2v-2h2l1.5-1.5M15.5 7.5h.01',
  chat: 'M4 5h16v11H9l-5 4z',
  map: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 8.5h.01',
  pin: 'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
};

/* ---------- intro facts ---------- */
export const FACTS = [
  { icon: 'guests', title: '3 kişilik', text: '1 çift kişilik yatak, 1 tek kişilik kanepe' },
  { icon: 'pool', title: 'Isıtmalı havuz', text: 'Tüm yıl açık, size özel' },
  { icon: 'jacuzzi', title: 'Jakuzi', text: 'Dış mekânda, üzeri kapalı' },
  { icon: 'flame', title: 'Şömine soba', text: 'Kış akşamları için' },
];

/* ---------- rooms (gallery) ---------- */
const img = (f, alt) => ({ src: `gallery/${f}.webp`, thumb: `gallery/k/${f}.webp`, alt });
export const ROOMS = [
  { id: 'havuz', name: 'Havuz ve bahçe', text: 'Tüm yıl ısıtmalı özel havuz, çimenli bahçe ve gece aydınlatması.', photos: [
    img('havuz', 'Havuz, bahçe ve cam cepheli bungalovun gündüz görünümü'),
    img('havuz-gece-1', 'Gece ışıklandırılmış havuz ve aydınlık bungalov'),
    img('havuz-4', 'Havuz kenarında meyve tabağı ve portakal suları, arkada bungalov'),
    img('bahce-1', 'Bahçede kahvaltı masası, çaydanlık ve ahşap veranda'),
    img('bahce-2', 'Tente altında ahşap veranda, katlanır sandalye ve asma salıncak koltuk'),
    img('havuz-3', 'Havuz başındaki şezlongda dinlenen bir misafir'),
    img('havuz-2', 'Çimenlikte şezlong yanında meyve ve meyve suyu'),
    img('havuz-gece-2', 'Gece havuzda yüzen tepsiyle bir misafir'),
  ] },
  { id: 'jakuzi', name: 'Jakuzi', text: 'Hasır tavanlı, tüllü bölmede açık hava jakuzisi.', photos: [
    img('jakuzi-1', 'Hasır tavanlı, tüllü bölmede mumlarla aydınlatılmış jakuzi'),
    img('jakuzi-2', 'Gündüz jakuzide çiçekler ve meyve tabağı'),
  ] },
  { id: 'salon', name: 'Salon', text: 'Yüksek ahşap tavan, şömine soba ve havuza açılan cam cephe.', photos: [
    img('salon', 'Yüksek ahşap tavanlı salon, gri kanepe ve çatı katına çıkan merdiven'),
    img('salon-3', 'Kışın yanan odun sobası ve karlı bahçeye bakan cam cephe'),
    img('salon-2', 'Yukarıdan salon: kanepe, odun sobası, televizyon ve havuza açılan kapı'),
  ] },
  { id: 'mutfak', name: 'Mutfak', text: 'Bar tezgâhlı küçük mutfak; çay, kahve ve temel gereçler hazır.', photos: [
    img('mutfak-2', 'Bar tezgâhı ve tabureler, solda sürgülü kapılı banyo'),
    img('mutfak-5', 'Mutfak tezgâhı, lavabo, çay ve kahve makinesi'),
    img('mutfak', 'Beyaz dolaplı, ahşap tezgâhlı ve metro fayanslı mutfak'),
    img('mutfak-3', 'Ahşap bar tezgâhı, beyaz tabureler ve mutfak'),
    img('mutfak-4', 'Açık raflar, asılı kupalar ve seramik lavabo'),
  ] },
  { id: 'yatak', name: 'Yatak odası', text: 'Eğimli tavanlı çatı katı, pamuk nevresimler ve karartma perdeler.', photos: [
    img('yatak-odasi', 'Eğimli beyaz tavanlı, koyu ahşap zeminli çatı katı yatak odası'),
    img('yatak-odasi-3', 'Çatı katından salona ve karlı bahçeye bakış'),
    img('yatak-odasi-2', 'Pencere kenarında yatak, okuma lambası ve bitkiler'),
  ] },
  { id: 'banyo', name: 'Banyo', text: 'Siyah çerçeveli duşakabin, metro fayans ve desenli karo zemin.', photos: [
    img('banyo-1', 'Siyah çerçeveli duşakabin, metro fayans ve desenli zemin'),
  ] },
];

/* ---------- amenities ---------- */
export const HIGHLIGHTS = [
  { icon: 'pool', label: 'Isıtmalı özel havuz' },
  { icon: 'jacuzzi', label: 'Açık hava jakuzisi' },
  { icon: 'flame', label: 'Şömine soba' },
  { icon: 'grill', label: 'Barbekü ve ateş kazanı' },
  { icon: 'wifi', label: 'Wi-Fi' },
  { icon: 'tv', label: '55 inç TV ve Netflix' },
  { icon: 'snow', label: 'Klima ve merkezî ısıtma' },
  { icon: 'car', label: 'Ücretsiz otopark' },
];

// [name, note?]
export const AMENITIES = [
  { title: 'Havuz ve jakuzi', items: [
    ['Özel açık havuz', 'Tüm yıl kullanılabilir, 24 saat açık, ısıtmalı, havuz örtülü'],
    ['Özel jakuzi', 'Tüm yıl kullanılabilir, 24 saat açık, dış mekânda ve üzeri kapalı'],
  ] },
  { title: 'Dış mekân', items: [
    ['Özel veranda'], ['Bahçe şöminesi (ateş kazanı)'], ['Bahçe mobilyaları'], ['Açık havada yemek alanı'],
    ['Özel barbekü ızgara'], ['Şezlonglar'], ['Salıncak'],
  ] },
  { title: 'Mutfak ve yemek', items: [
    ['Küçük mutfak', 'Yiyecekleri ısıtıp soğutabileceğiniz bir alan'],
    ['Mini buzdolabı'], ['Elektrikli ocak'], ['Su ısıtıcısı'], ['Çay ve kahve makinesi'],
    ['Temel pişirme malzemeleri', 'Tencere, tava, yağ, tuz, biber'],
    ['Yemek ve çatal bıçak takımı', 'Tabak, kase, bardak ve diğer mutfak eşyaları'],
    ['Şarap kadehleri'], ['Yemek masası'],
  ] },
  { title: 'Yatak odası ve çamaşırlar', items: [
    ['Yatak çarşafları'], ['Pamuk nevresimler'], ['Elbise askıları'], ['Işık geçirmez stor perdeler'], ['Çamaşır asma yeri'], ['Sineklik'],
  ] },
  { title: 'Banyo', items: [['Sıcak su'], ['Saç kurutma makinesi'], ['Şampuan'], ['Duş jeli']] },
  { title: 'Isıtma ve soğutma', items: [['Odunlu şömine', 'İç mekânda'], ['Merkezî ısıtma'], ['Pencereye takılı klima']] },
  { title: 'Eğlence ve internet', items: [['55 inç HDTV', 'Netflix ile'], ['Wi-Fi']] },
  { title: 'Manzara', items: [['Havuz manzarası'], ['Bahçe manzarası']] },
  { title: 'Aile', items: [
    ['Beşik', 'İstek üzerine. Standart, 130 × 71 cm'],
    ['Park yatak / seyahat beşiği', 'İstek üzerine'],
  ] },
  { title: 'Ev güvenliği', items: [
    ['Dış mekân güvenlik kameraları', 'Otopark alanında'], ['Duman dedektörü'], ['Karbonmonoksit alarmı'],
    ['Yangın söndürücü'], ['Pronet alarm sistemi'], ['Jeneratör'], ['Su deposu'],
  ] },
  { title: 'Otopark ve hizmetler', items: [
    ['Mülk içinde ücretsiz otopark', 'Evlerin hemen önünde'], ['Kendi kendine giriş, kilitli kutu'],
    ['Uzun süreli konaklama', '28 gün ve üzeri konaklamalara izin verilir'], ['Sigara içilebilir'], ['Yakınlarda çamaşırhane'],
  ] },
  { title: 'Mevcut olmayanlar', missing: true, items: [
    ['Tam donanımlı mutfak', 'Küçük mutfak mevcut'], ['Çamaşır makinesi'], ['Kurutma makinesi'], ['Temel malzemeler'],
  ] },
];
export const AMEN_COUNT = AMENITIES.filter((g) => !g.missing).reduce((n, g) => n + g.items.length, 0);

/* ---------- location ---------- */
export const DISTANCES = [
  { value: '1–2', unit: 'dk', what: 'Sapanca Gölü', note: 'araçla' },
  { value: '500', unit: 'm', what: 'Teleferik', note: 'istasyonu' },
  { value: 'Yakın', unit: '', what: 'Kafe ve restoranlar', note: 'kısa mesafede' },
  { value: 'Yakın', unit: '', what: 'Marketler', note: 'Carrefour, Migros' },
];

/* ---------- house rules (short pills) ---------- */
export const RULES = [
  ['Giriş', '14:00 – 00:00'],
  ['Çıkış', 'en geç 11:00'],
  ['Kapasite', 'en fazla 3 kişi'],
  ['Giriş şekli', 'kilitli kutu, kendi kendine'],
  ['Kimlik', 'girişte zorunlu'],
  ['Ayakkabı', 'eve ayakkabıyla girilmez'],
  ['Ziyaretçi', 'dışarıdan misafir yok'],
  ['18 yaş altı', 'yalnızca ebeveynle'],
];

/* ---------- Airbnb guest ratings ---------- */
export const RATING_BARS = [[5, 88], [4, 8], [3, 1.5], [2, 1.5], [1, 0]];
export const RATINGS = [
  { label: 'Temizlik', value: 4.8, icon: 'clean' },
  { label: 'Doğruluk', value: 4.8, icon: 'check' },
  { label: 'Giriş', value: 5.0, icon: 'key' },
  { label: 'İletişim', value: 4.9, icon: 'chat' },
  { label: 'Konum', value: 4.8, icon: 'map' },
  { label: 'Kalite/fiyat oranı', value: 4.8, icon: 'tag' },
];
export const fmtScore = (v) => v.toFixed(1).replace('.', ',');

/* ---------- frequently asked questions ---------- */
export const FAQ = [
  ['Giriş ve çıkış saatleri nedir?', 'Giriş 14:00 ile 00:00 arasında, kilitli kutu ile kendi kendinize yapılır. Çıkış en geç 11:00’dedir.'],
  ['Kaç kişi konaklayabilir?', 'En fazla 3 kişi: 1 çift kişilik yatak ve 1 tek kişilik kanepe var. Bebekler için istek üzerine beşik veya park yatak hazırlanır.'],
  ['Havuz kışın da kullanılabiliyor mu?', 'Evet. Havuz tüm yıl açık, ısıtmalı ve örtülüdür. Jakuzi de dış mekânda, üzeri kapalı ve tüm yıl kullanılabilir.'],
  ['Havuz ve bahçe başka misafirlerle ortak mı?', 'Hayır. Yan yana iki ev birbirinden bağımsızdır ve birbirini görmez; havuz, jakuzi ve bahçe yalnızca size aittir.'],
  ['Otopark var mı?', 'Evet, ücretsiz otopark evlerin hemen önündedir.'],
  ['Mutfakta yemek yapabilir miyim?', 'Küçük bir mutfak var: mini buzdolabı, elektrikli ocak, su ısıtıcısı, çay ve kahve makinesi, tencere, tava ve temel malzemeler. Tam donanımlı bir mutfak değildir.'],
  ['Evcil hayvan kabul ediliyor mu?', 'Aksi belirtilmedikçe evcil hayvan kabul edilmez. Özel bir durum için önceden bize yazabilirsiniz.'],
  ['Rezervasyonu nasıl yaparım?', 'Rezervasyon bölümünden tarihinizi seçip Airbnb üzerinden tamamlayabilirsiniz. Telefon veya e-postayla da rezervasyon yapılabilir; havale sonrası ödeme bildirim formunu doldurmanız yeterli.'],
];

/* ---------- search engines: structured data ---------- */
export const LODGING_LD = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Lemoon House',
  description: 'Sapanca Kırkpınar’da özel ısıtmalı havuzlu ve jakuzili, 3 kişilik bungalov.',
  image: 'gallery/havuz.webp',
  telephone: '+90 507 250 31 85',
  email: 'sapancalemoonhouse@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hasanpaşa Mahallesi, Kamer Sokak No:10, Kırkpınar',
    addressLocality: 'Sapanca',
    addressRegion: 'Sakarya',
    postalCode: '54600',
    addressCountry: 'TR',
  },
  checkinTime: '14:00',
  checkoutTime: '11:00',
  petsAllowed: false,
  amenityFeature: ['Isıtmalı özel havuz', 'Açık hava jakuzisi', 'Şömine', 'Wi-Fi', 'Klima', 'Barbekü', 'Ücretsiz otopark']
    .map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  sameAs: [AIRBNB_URL],
};
