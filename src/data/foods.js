// src/data/foods.js
//
// ─── CARA MENAMBAH GAMBAR PRODUK ─────────────────────────────────────────────
//  1. Simpan file gambar (JPG/PNG) ke folder:
//        assets/images/foods/
//     Contoh: assets/images/foods/burger_joss.jpg
//
//  2. Require gambar tersebut di bawah blok IMAGES, contoh:
//        burger_joss: require('../../assets/images/foods/burger_joss.jpg'),
//
//  3. Isi field `image` pada produk dengan key yang sudah di-require:
//        image: IMAGES.burger_joss,
//
//  Jika gambar belum tersedia, biarkan image: null  ─> emoji otomatis ditampilkan
// ─────────────────────────────────────────────────────────────────────────────

// ▼▼▼ DAFTARKAN GAMBAR KAMU DI SINI ▼▼▼
const IMAGES = {
  Bakso:      require('../../assets/images/foods/bakso.jpg'),
  pizza_slice:      require('../../assets/images/foods/pizza slice.jpg'),
  Ayam:      require('../../assets/images/foods/ayam goreng.jpg'),
  Jus_Jambu:        require('../../assets/images/foods/jus jambu.jpg'),
  Nasi_Goreng:      require('../../assets/images/foods/nasi goreng.jpg'),
  Kentang_Goreng:   require('../../assets/images/foods/kentang goreng.jpeg'),
  Double_Pepperoni: require('../../assets/images/foods/double pepperoni.jpg'),
  es_teh_manis:     require('../../assets/images/foods/es teh manis.jpg'),
  bakso_mercon:     require('../../assets/images/foods/bakso mercon.jpg'),
};
// ▲▲▲ SAMPAI SINI ▲▲▲

export const CATEGORIES = ['All', 'Bakso', 'Pizza', 'Drinks', 'Snacks', 'Rice'];

export const FOODS = [
  {
    id: '1',
    name: 'Bakso Solo',
    category: 'Bakso',
    price: 45000,
    rating: 4.8,
    reviews: 320,
    time: '20-30',
    calories: 560,
    description: 'Bakso khas solo dengan kuah yang Lezat dan enak.',
    emoji: '🍔',
    color: '#FFF3E0',
    tag: 'Best Seller',
    // ▼ Ganti null dengan IMAGES.burger_joss setelah gambar ditambahkan
    image: IMAGES.Bakso, // IMAGES.burger_joss
  },
  {
    id: '2',
    name: 'Pizza slice',
    category: 'Pizza',
    price: 65000,
    rating: 4.7,
    reviews: 215,
    time: '25-35',
    calories: 720,
    description: 'Pizza Slice dengan pepperoni enak banget.',
    emoji: '🍕',
    color: '#FCE4EC',
    tag: 'Popular',
    image: IMAGES.pizza_slice
  },
  {
    id: '3',
    name: 'Ayam Goreng rempah',
    category: 'Snacks',
    price: 38000,
    rating: 4.9,
    reviews: 480,
    time: '15-25',
    calories: 430,
    description: 'Ayam Goreng yang digoreng golden crispy dengan rempah yang berkualitas!!.',
    emoji: '🍗',
    color: '#FFF8E1',
    tag: 'Hot 🔥',
    image: IMAGES.Ayam,
  },
  {
    id: '4',
    name: 'Jus Jambu',
    category: 'Drinks',
    price: 10000,
    rating: 4.6,
    reviews: 152,
    time: '5-10',
    calories: 210,
    description: 'Jus jambu fresh dan menyegarkan!.',
    emoji: '🥤',
    color: '#F3E5F5',
    tag: 'Fresh',
    image:  IMAGES.Jus_Jambu
  },
  {
    id: '5',
    name: 'Nasi Goreng Spesial',
    category: 'Rice',
    price: 35000,
    rating: 4.9,
    reviews: 610,
    time: '15-20',
    calories: 650,
    description:
      'Nasi goreng dengan bumbu rempah pilihan, telur mata sapi, ayam suwir, dan kerupuk renyah.',
    emoji: '🍳',
    color: '#E8F5E9',
    tag: 'Favorit',
    image: IMAGES.Nasi_Goreng, 
  },
  {
    id: '6',
    name: 'Kentang Goreng',
    category: 'Snacks',
    price: 11000,
    rating: 4.5,
    reviews: 390,
    time: '10-15',
    calories: 340,
    description: 'Kentang goreng yang di goreng sangat Crispy Uenak banget!!.',
    emoji: '🍟',
    color: '#FFF9C4',
    tag: '',
    image: IMAGES.Kentang_Goreng, 
  },
  {
    id: '7',
    name: 'Double Pepperoni',
    category: 'Pizza',
    price: 75000,
    rating: 4.8,
    reviews: 270,
    time: '25-35',
    calories: 880,
    description: 'Pizza dengan double pepperoni!.',
    emoji: '🍕',
    color: '#FFEBEE',
    tag: '',
    image: IMAGES.Double_Pepperoni, 
  },
  {
    id: '8',
    name: 'Es Teh Manis',
    category: 'Drinks',
    price: 7500,
    rating: 4.7,
    reviews: 890,
    time: '5',
    calories: 80,
    description: 'Teh dengan gula aren asli, disajikan dingin dengan es batu segar.',
    emoji: '🧋',
    color: '#E0F2F1',
    tag: 'Murah',
    image: IMAGES.es_teh_manis, 
  },

  {
    id: '9',
    name: 'Bakso mercon',
    category: 'Bakso',
    price: 25000,
    rating: 4.8,
    reviews: 320,
    time: '20-30',
    calories: 520,
    description: 'Bakso dengan kuah pedas yang lezat.',
    emoji: '🍲',
    color: '#FFEbee',
    tag: 'Spicy',
    image: IMAGES.bakso_mercon, 
  }
];
