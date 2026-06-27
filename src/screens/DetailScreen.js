// src/screens/DetailScreen.js
import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions, Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function DetailScreen({ route, navigation }) {
  const { food } = route.params;
  const insets = useSafeAreaInsets();
  const { cart, dispatch } = useCart();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState('');
  const [added, setAdded] = useState(false);

  const inCart = cart.find(i => i.id === food.id);
  const total = food.price * qty;

  const handleAdd = () => {
    dispatch({ type: 'ADD_ITEM', item: { ...food, qty: 0 } }); // qty=0 because ADD_ITEM increments
    // add qty-1 more
    for (let i = 1; i < qty; i++) {
      dispatch({ type: 'ADD_ITEM', item: { ...food, qty: 0 } });
    }
    setAdded(true);
    setTimeout(() => navigation.navigate('Cart'), 500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero ─ tampilkan gambar jika tersedia, fallback ke emoji */}
        <View style={[styles.hero, { backgroundColor: food.color }]}>
          {food.image ? (
            <Image
              source={food.image}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.heroEmoji}>{food.emoji}</Text>
          )}
        </View>

        {/* Info */}
        <View style={styles.info}>
          <View style={styles.infoHeader}>
            <Text style={styles.foodName}>{food.name}</Text>
            {food.tag ? (
              <View style={styles.tag}><Text style={styles.tagText}>{food.tag}</Text></View>
            ) : null}
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Text style={styles.metaIcon}>⭐</Text>
              <Text style={styles.metaVal}>{food.rating}</Text>
              <Text style={styles.metaSub}>({food.reviews})</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaIcon}>🕐</Text>
              <Text style={styles.metaVal}>{food.time}</Text>
              <Text style={styles.metaSub}>menit</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaIcon}>🔥</Text>
              <Text style={styles.metaVal}>{food.calories}</Text>
              <Text style={styles.metaSub}>kal</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.description}>{food.description}</Text>

          {/* Qty selector */}
          <Text style={styles.sectionTitle}>Jumlah</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(q => Math.max(1, q - 1))}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyNum}>{qty}</Text>
            <TouchableOpacity
              style={[styles.qtyBtn, styles.qtyBtnActive]}
              onPress={() => setQty(q => q + 1)}
            >
              <Text style={[styles.qtyBtnText, { color: '#fff' }]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <Text style={styles.totalLabel}>Total Harga</Text>
          <Text style={styles.totalPrice}>Rp {total.toLocaleString('id-ID')}</Text>
        </View>
        <TouchableOpacity
          style={[styles.addBtn, added && styles.addBtnDone]}
          onPress={handleAdd}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>{added ? '✓ Ditambahkan' : 'Tambah ke Keranjang'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },

  backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  backIcon: { fontSize: 20, color: '#1E2340', fontWeight: '700' },

  hero: { height: 260, alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden' },
  // ── Gambar hero di halaman detail ──
  heroImage: { width: '100%', height: '100%' },
  heroEmoji: { fontSize: 110 },

  info: { padding: 22 },
  infoHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  foodName: { fontSize: 22, fontWeight: '800', color: '#1E2340', flex: 1, marginRight: 10 },
  tag: { backgroundColor: '#FFF0E6', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { color: '#F97316', fontSize: 11, fontWeight: '700' },

  metaRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  metaChip: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  metaIcon: { fontSize: 14, marginRight: 4 },
  metaVal: { fontSize: 13, fontWeight: '700', color: '#1E2340' },
  metaSub: { fontSize: 10, color: '#9CA3AF', marginLeft: 2 },

  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1E2340', marginBottom: 8 },
  description: { fontSize: 14, color: '#6B7280', lineHeight: 22, marginBottom: 20 },

  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: { width: 40, height: 40, borderRadius: 12, borderWidth: 1.5, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  qtyBtnActive: { backgroundColor: '#F97316', borderColor: '#F97316' },
  qtyBtnText: { fontSize: 20, color: '#1E2340', fontWeight: '600', lineHeight: 24 },
  qtyNum: { fontSize: 20, fontWeight: '800', color: '#1E2340', minWidth: 30, textAlign: 'center' },

  bottomBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 14, borderTopLeftRadius: 24, borderTopRightRadius: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 },
  totalLabel: { fontSize: 12, color: '#9CA3AF', marginBottom: 2 },
  totalPrice: { fontSize: 18, fontWeight: '800', color: '#F97316' },
  addBtn: { backgroundColor: '#F97316', paddingHorizontal: 22, paddingVertical: 14, borderRadius: 14, shadowColor: '#F97316', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  addBtnDone: { backgroundColor: '#22C55E' },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
