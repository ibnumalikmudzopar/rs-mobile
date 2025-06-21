// Halaman Login untuk Dokter
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { BASE_URL } from '../constants';

export default function DokterLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fungsi login dokter
  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        Alert.alert('Gagal', json.msg || 'Login gagal');
        return;
      }

      // Cek role harus 'dokter'
      if (json.user.role !== 'dokter') {
        Alert.alert('Gagal', 'Akun ini bukan akun dokter');
        return;
      }

      // Simpan token dan redirect
      await AsyncStorage.setItem('token', json.token);
      router.replace('/dokter/reservasi');
    } catch (err) {
      Alert.alert('Error', 'Terjadi kesalahan saat login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Dokter</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="MASUK" onPress={handleLogin} color="#2196f3" />
      <View style={styles.spacer} />
      <Button title="Kembali" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  spacer: {
    height: 12,
  },
});
