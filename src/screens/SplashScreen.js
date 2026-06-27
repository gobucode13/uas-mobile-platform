// src/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const BottomRightFan = () => {
  const rays = 16; const r = 220;
  const paths = Array.from({ length: rays + 1 }, (_, i) => {
    const angle = (i * 90) / rays;
    const rad = (angle * Math.PI) / 180;
    return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
  });
  return (
    <Svg width={r} height={r} viewBox={`0 0 ${r} ${r}`}>
      {paths.map((p, i) => (
        <Path key={i} d={`M 0 0 L ${p.x} ${p.y}`} stroke="#F97316" strokeWidth={7} strokeLinecap="round" />
      ))}
    </Svg>
  );
};

const TopLeftFan = () => {
  const rays = 14; const r = 160;
  const paths = Array.from({ length: rays + 1 }, (_, i) => {
    const angle = 180 + (i * 90) / rays;
    const rad = (angle * Math.PI) / 180;
    return { x: r + r * Math.cos(rad), y: r + r * Math.sin(rad) };
  });
  return (
    <Svg width={r} height={r} viewBox={`0 0 ${r} ${r}`}>
      {paths.map((p, i) => (
        <Path key={i} d={`M ${r} ${r} L ${p.x} ${p.y}`} stroke="#D1D5DB" strokeWidth={5} strokeLinecap="round" opacity={0.6} />
      ))}
    </Svg>
  );
};

export default function SplashScreen({ navigation }) {
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }),
    ]).start();
    const t = setTimeout(() => navigation.replace('Login'), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.topFan}><TopLeftFan /></View>
      <Animated.View style={{ opacity, transform: [{ scale }], alignItems: 'center' }}>
        <Text style={styles.logo}>
          <Text style={styles.logoDark}>F</Text>
          <Text style={styles.logoOrange}>oo</Text>
          <Text style={styles.logoDark}>d</Text>
        </Text>
        <Text style={styles.tagline}>Order. Eat. Repeat.</Text>
      </Animated.View>
      <View style={styles.bottomFan}><BottomRightFan /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  topFan: { position: 'absolute', top: -10, left: -10 },
  bottomFan: { position: 'absolute', bottom: -10, right: -10 },
  logo: { fontSize: 64, fontWeight: '900', letterSpacing: 2 },
  logoDark: { color: '#1E2340' },
  logoOrange: { color: '#F97316' },
  tagline: { color: '#9CA3AF', fontSize: 14, marginTop: 6, letterSpacing: 1 },
});
