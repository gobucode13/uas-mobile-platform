// src/screens/SuccessScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';

export default function SuccessScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { dispatch } = useCart();
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch({ type: 'CLEAR' });

    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, friction: 5, tension: 100, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.spring(bounce, { toValue: -10, friction: 3, useNativeDriver: true }),
      Animated.spring(bounce, { toValue: 0, friction: 3, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Animated.View style={[styles.content, { opacity, transform: [{ scale }, { translateY: bounce }] }]}>
        {/* Success circle */}
        <View style={styles.circleOuter}>
          <View style={styles.circleInner}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>

        <Text style={styles.title}>Pesanan Diterima!</Text>
        <Text style={styles.subtitle}>
          Pesananmu sedang diproses.{'\n'}
          Kurir kami akan segera mengantar makananmu! 🛵
        </Text>

        {/* Estimated time */}
        <View style={styles.etaCard}>
          <View style={styles.etaItem}>
            <Text style={styles.etaIcon}>🕐</Text>
            <Text style={styles.etaLabel}>Estimasi Tiba</Text>
            <Text style={styles.etaVal}>25-35 menit</Text>
          </View>
          <View style={styles.etaDivider} />
          <View style={styles.etaItem}>
            <Text style={styles.etaIcon}>📍</Text>
            <Text style={styles.etaLabel}>Status</Text>
            <Text style={styles.etaVal}>Diproses</Text>
          </View>
        </View>

        {/* Steps */}
        <View style={styles.steps}>
          {[
            { icon: '✅', label: 'Pesanan Diterima', done: true },
            { icon: '👨‍🍳', label: 'Sedang Dimasak', done: false },
            { icon: '🛵', label: 'Dalam Pengiriman', done: false },
            { icon: '🏠', label: 'Tiba di Tujuan', done: false },
          ].map((s, i) => (
            <View key={i} style={styles.step}>
              <View style={[styles.stepDot, s.done && styles.stepDotActive]}>
                <Text style={styles.stepIcon}>{s.icon}</Text>
              </View>
              {i < 3 && <View style={[styles.stepLine, s.done && styles.stepLineDone]} />}
              <Text style={[styles.stepLabel, s.done && styles.stepLabelActive]}>{s.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.homeBtn}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeBtnText}>Kembali ke Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24 },

  content: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' },

  circleOuter: { width: 130, height: 130, borderRadius: 65, backgroundColor: '#FFF0E6', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  circleInner: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center' },
  checkmark: { fontSize: 42, color: '#fff', fontWeight: '900' },

  title: { fontSize: 26, fontWeight: '800', color: '#1E2340', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#9CA3AF', textAlign: 'center', lineHeight: 22, marginBottom: 28 },

  // ETA card
  etaCard: { flexDirection: 'row', backgroundColor: '#FAFAFA', borderRadius: 18, padding: 16, width: '100%', marginBottom: 28, borderWidth: 1, borderColor: '#F3F4F6' },
  etaItem: { flex: 1, alignItems: 'center' },
  etaIcon: { fontSize: 22, marginBottom: 4 },
  etaLabel: { fontSize: 11, color: '#9CA3AF', marginBottom: 2 },
  etaVal: { fontSize: 13, fontWeight: '700', color: '#1E2340' },
  etaDivider: { width: 1, backgroundColor: '#E5E7EB', marginVertical: 4 },

  // Steps tracker
  steps: { flexDirection: 'row', alignItems: 'flex-start', width: '100%', justifyContent: 'space-between' },
  step: { alignItems: 'center', flex: 1, position: 'relative' },
  stepDot: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  stepDotActive: { backgroundColor: '#FFF0E6' },
  stepIcon: { fontSize: 20 },
  stepLine: { position: 'absolute', top: 22, left: '60%', right: '-60%', height: 2, backgroundColor: '#E5E7EB', zIndex: -1 },
  stepLineDone: { backgroundColor: '#F97316' },
  stepLabel: { fontSize: 10, color: '#9CA3AF', textAlign: 'center', fontWeight: '500' },
  stepLabelActive: { color: '#F97316', fontWeight: '700' },

  homeBtn: { width: '100%', backgroundColor: '#F97316', borderRadius: 16, paddingVertical: 16, alignItems: 'center', shadowColor: '#F97316', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  homeBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
