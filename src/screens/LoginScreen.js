// src/screens/LoginScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

/* ── Decorative SVG blobs ── */
const TopBlob = () => (
  <Svg width={width} height={220} viewBox={`0 0 ${width} 220`}>
    <Ellipse cx={width / 2} cy={-30} rx={width * 0.75} ry={180} fill="#F97316" opacity={0.12} />
    <Circle cx={width - 30} cy={60} r={80} fill="#F97316" opacity={0.10} />
    <Circle cx={40} cy={30} r={50} fill="#1E2340" opacity={0.07} />
  </Svg>
);

const BottomBlob = () => (
  <Svg width={width} height={160} viewBox={`0 0 ${width} 160`}>
    <Ellipse cx={width / 2} cy={160} rx={width * 0.8} ry={130} fill="#F97316" opacity={0.09} />
    <Circle cx={20} cy={130} r={60} fill="#1E2340" opacity={0.06} />
  </Svg>
);

/* ── Floating food emojis decoration ── */
const EMOJI_ITEMS = ['🍔', '🍕', '🍜', '🧋', '🍣'];

/* ── Input field component ── */
const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType }) => {
  const [focused, setFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(borderAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  };
  const handleBlur = () => {
    setFocused(false);
    Animated.timing(borderAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#F97316'],
  });

  return (
    <Animated.View style={[styles.inputWrapper, { borderColor }]}>
      <Text style={styles.inputIcon}>{icon}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType || 'default'}
        autoCapitalize="none"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Animated.View>
  );
};

/* ── Main LoginScreen ── */
export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Button press animation
  const btnScale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
  const pressOut = () =>
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Oops!', 'Email dan password tidak boleh kosong 😅');
      return;
    }

    setLoading(true);
    // Simulasi proses login (ganti dengan API call asli)
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Home');
    }, 1200);
  };

  // Floating emoji animation refs
  const floatAnims = useRef(
    EMOJI_ITEMS.map(() => new Animated.Value(0))
  ).current;

  React.useEffect(() => {
    floatAnims.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -8,
            duration: 1400 + i * 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1400 + i * 200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top decoration */}
        <View style={styles.topDecoration}>
          <TopBlob />
          <View style={styles.emojiRow}>
            {EMOJI_ITEMS.map((emoji, i) => (
              <Animated.Text
                key={i}
                style={[
                  styles.floatEmoji,
                  { transform: [{ translateY: floatAnims[i] }] },
                ]}
              >
                {emoji}
              </Animated.Text>
            ))}
          </View>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Logo */}
          <Text style={styles.logo}>
            <Text style={styles.logoDark}>F</Text>
            <Text style={styles.logoOrange}>oo</Text>
            <Text style={styles.logoDark}>d</Text>
          </Text>
          <Text style={styles.tagline}>Masuk & Nikmati Makananmu 🍽️</Text>

          <View style={styles.divider} />

          {/* Heading */}
          <Text style={styles.heading}>Selamat Datang!</Text>
          <Text style={styles.subheading}>Masuk ke akun kamu untuk lanjutkan</Text>

          {/* Inputs */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <InputField
              icon="📧"
              placeholder="contoh@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <InputField
              icon="🔒"
              placeholder="Masukkan password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Forgot password */}
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Lupa password?</Text>
          </TouchableOpacity>

          {/* Login button */}
          <Animated.View style={{ transform: [{ scale: btnScale }] }}>
            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnLoading]}
              onPressIn={pressIn}
              onPressOut={pressOut}
              onPress={handleLogin}
              activeOpacity={0.9}
              disabled={loading}
            >
              <Text style={styles.loginBtnText}>
                {loading ? 'Memproses...' : 'Masuk 🚀'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Separator */}
          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>atau</Text>
            <View style={styles.orLine} />
          </View>

          {/* Social login placeholder */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIcon}>🌐</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIcon}>📘</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Register link */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Belum punya akun? </Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Daftar Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom decoration */}
        <View style={styles.bottomDecoration}>
          <BottomBlob />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },

  // Decorations
  topDecoration: { width: '100%', alignItems: 'center', marginBottom: -30 },
  bottomDecoration: { width: '100%', marginTop: -20 },

  emojiRow: {
    position: 'absolute',
    top: 30,
    flexDirection: 'row',
    gap: 18,
  },
  floatEmoji: { fontSize: 28 },

  // Card
  card: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    zIndex: 10,
  },

  // Logo
  logo: { fontSize: 48, fontWeight: '900', letterSpacing: 2, textAlign: 'center' },
  logoDark: { color: '#1E2340' },
  logoOrange: { color: '#F97316' },
  tagline: { textAlign: 'center', color: '#9CA3AF', fontSize: 13, marginTop: 4 },

  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 20,
  },

  // Heading
  heading: { fontSize: 22, fontWeight: '800', color: '#1E2340' },
  subheading: { fontSize: 13, color: '#9CA3AF', marginTop: 4, marginBottom: 20 },

  // Form
  formGroup: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 1.8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 13 : 10,
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#1E2340' },

  // Forgot
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 22, marginTop: 2 },
  forgotText: { fontSize: 13, color: '#F97316', fontWeight: '600' },

  // Login button
  loginBtn: {
    backgroundColor: '#F97316',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#F97316',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  loginBtnLoading: { backgroundColor: '#FB923C' },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },

  // OR separator
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 10 },
  orLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  orText: { color: '#9CA3AF', fontSize: 13, fontWeight: '500' },

  // Social buttons
  socialRow: { flexDirection: 'row', gap: 12, marginBottom: 22 },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  socialIcon: { fontSize: 18 },
  socialText: { fontSize: 14, color: '#374151', fontWeight: '600' },

  // Register
  registerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerText: { fontSize: 13, color: '#9CA3AF' },
  registerLink: { fontSize: 13, color: '#F97316', fontWeight: '700' },
});
