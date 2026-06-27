// src/screens/CartScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  StatusBar, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const CartItem = ({ item, onInc, onDec, onRemove }) => (
  <View style={styles.item}>
    <View style={[styles.itemEmoji, { backgroundColor: item.color }]}>
      <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
    </View>
    <View style={styles.itemInfo}>
      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.itemPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
    </View>
    <View style={styles.itemQty}>
      <TouchableOpacity style={styles.qBtn} onPress={onDec}>
        <Text style={styles.qBtnText}>−</Text>
      </TouchableOpacity>
      <Text style={styles.qNum}>{item.qty}</Text>
      <TouchableOpacity style={[styles.qBtn, styles.qBtnOrange]} onPress={onInc}>
        <Text style={[styles.qBtnText, { color: '#fff' }]}>+</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
      <Text style={styles.removeIcon}>🗑️</Text>
    </TouchableOpacity>
  </View>
);

export default function CartScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cart, dispatch } = useCart();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 0 ? 10000 : 0;
  const total = subtotal + delivery;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Keranjang</Text>
        {cart.length > 0 ? (
          <TouchableOpacity onPress={() => dispatch({ type: 'CLEAR' })}>
            <Text style={styles.clearText}>Hapus Semua</Text>
          </TouchableOpacity>
        ) : <View style={{ width: 70 }} />}
      </View>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Keranjang Kosong</Text>
          <Text style={styles.emptySub}>Yuk, tambahkan makanan favoritmu!</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopBtnText}>Lihat Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={i => i.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onInc={() => dispatch({ type: 'INCREMENT', id: item.id })}
                onDec={() => dispatch({ type: 'DECREMENT', id: item.id })}
                onRemove={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
              />
            )}
          />

          {/* Summary */}
          <View style={[styles.summary, { paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryVal}>Rp {subtotal.toLocaleString('id-ID')}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Ongkos kirim</Text>
              <Text style={styles.summaryVal}>Rp {delivery.toLocaleString('id-ID')}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalVal}>Rp {total.toLocaleString('id-ID')}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Success')}
            >
              <Text style={styles.checkoutText}>Bayar Sekarang  🛵</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  backIcon: { fontSize: 20, color: '#1E2340', fontWeight: '700' },
  title: { fontSize: 18, fontWeight: '800', color: '#1E2340' },
  clearText: { fontSize: 12, color: '#EF4444', fontWeight: '600' },

  list: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },

  // Cart item
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  itemEmoji: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  itemInfo: { flex: 1, marginRight: 8 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#1E2340', marginBottom: 4 },
  itemPrice: { fontSize: 13, color: '#F97316', fontWeight: '700' },
  itemQty: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qBtn: { width: 28, height: 28, borderRadius: 8, borderWidth: 1.5, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  qBtnOrange: { backgroundColor: '#F97316', borderColor: '#F97316' },
  qBtnText: { fontSize: 16, color: '#1E2340', fontWeight: '600', lineHeight: 20 },
  qNum: { fontSize: 14, fontWeight: '800', color: '#1E2340', minWidth: 20, textAlign: 'center' },
  removeBtn: { marginLeft: 8 },
  removeIcon: { fontSize: 16 },

  // Empty
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#1E2340', marginBottom: 6 },
  emptySub: { fontSize: 14, color: '#9CA3AF', marginBottom: 24 },
  shopBtn: { backgroundColor: '#F97316', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 14 },
  shopBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Summary
  summary: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 13, color: '#9CA3AF' },
  summaryVal: { fontSize: 13, color: '#1E2340', fontWeight: '600' },
  totalRow: { borderTopWidth: 1, borderColor: '#F3F4F6', paddingTop: 10, marginTop: 4, marginBottom: 16 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#1E2340' },
  totalVal: { fontSize: 16, fontWeight: '800', color: '#F97316' },
  checkoutBtn: { backgroundColor: '#F97316', borderRadius: 16, paddingVertical: 16, alignItems: 'center', shadowColor: '#F97316', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  checkoutText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.5 },
});
