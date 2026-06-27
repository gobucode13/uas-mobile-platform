// src/screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,
  FlatList, TextInput, StatusBar, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { FOODS, CATEGORIES } from '../data/foods';

const { width } = Dimensions.get('window');
const CARD_W = (width - 48) / 2;

const FoodCard = ({ item, onPress }) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} onPress={onPress} activeOpacity={0.85}>
    {/* ── Gambar produk (tampil jika image tersedia, fallback ke emoji) ── */}
    {item.image ? (
      <Image
        source={item.image}
        style={styles.cardImage}
        resizeMode="cover"
      />
    ) : (
      <Text style={styles.cardEmoji}>{item.emoji}</Text>
    )}

    {item.tag ? <View style={styles.tag}><Text style={styles.tagText}>{item.tag}</Text></View> : null}
    <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
    <View style={styles.cardMeta}>
      <Text style={styles.cardRating}>⭐ {item.rating}</Text>
      <Text style={styles.cardTime}>🕐 {item.time}m</Text>
    </View>
    <Text style={styles.cardPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cart } = useCart();
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filtered = FOODS.filter(f => {
    const matchCat = selectedCat === 'All' || f.category === selectedCat;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, Alfan! 👋</Text>
          <Text style={styles.subGreeting}>Mau makan apa hari ini?</Text>
        </View>
        <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari makanan favoritmu..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Gratis Ongkir!</Text>
          <Text style={styles.bannerSub}>Min. order Rp 50.000</Text>
          <View style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>Order Sekarang</Text>
          </View>
        </View>
        <Text style={styles.bannerEmoji}>🛵</Text>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catList}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catBtn, selectedCat === cat && styles.catBtnActive]}
            onPress={() => setSelectedCat(cat)}
          >
            <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Food Grid */}
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyText}>Menu tidak ditemukan</Text>
          </View>
        }
        renderItem={({ item }) => (
          <FoodCard item={item} onPress={() => navigation.navigate('Detail', { food: item })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  greeting: { fontSize: 20, fontWeight: '800', color: '#1E2340' },
  subGreeting: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  cartBtn: { width: 44, height: 44, backgroundColor: '#fff', borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cartIcon: { fontSize: 20 },
  badge: { position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: 9, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  // Search
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1E2340' },

  // Banner
  banner: { marginHorizontal: 20, backgroundColor: '#F97316', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  bannerText: { flex: 1 },
  bannerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  bannerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2, marginBottom: 10 },
  bannerBtn: { backgroundColor: '#fff', alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  bannerBtnText: { color: '#F97316', fontSize: 12, fontWeight: '700' },
  bannerEmoji: { fontSize: 48 },

  // Categories
  catList: { paddingHorizontal: 20, paddingBottom: 12 },
  catBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 10, borderWidth: 1.5, borderColor: '#E5E7EB' },
  catBtnActive: { backgroundColor: '#F97316', borderColor: '#F97316' },
  catText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  catTextActive: { color: '#fff' },

  // Grid
  grid: { paddingHorizontal: 16, paddingBottom: 24 },
  row: { justifyContent: 'space-between', marginBottom: 14 },

  // Card
  card: { width: CARD_W, borderRadius: 18, padding: 14, overflow: 'hidden' },
  // ── Gambar produk di card ──
  // Ubah width/height sesuai kebutuhanmu
  cardImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tag: { backgroundColor: '#F97316', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginBottom: 6 },
  tagText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  cardEmoji: { fontSize: 46, marginBottom: 6, textAlign: 'center' },
  cardName: { fontSize: 13, fontWeight: '700', color: '#1E2340', marginBottom: 6, minHeight: 36 },
  cardMeta: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  cardRating: { fontSize: 11, color: '#6B7280' },
  cardTime: { fontSize: 11, color: '#6B7280' },
  cardPrice: { fontSize: 14, fontWeight: '800', color: '#F97316' },

  // Empty
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: '#9CA3AF', fontSize: 15 },
});
