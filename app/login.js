// Halaman Login Akun Pasien
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { BASE_URL } from '../constants'; // URL backend

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fungsi login
  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // Jika gagal login
      if (!res.ok) {
        Alert.alert('Gagal Login', data.msg || 'Terjadi kesalahan');
        return;
      }

      // Validasi: hanya role 'pasien' yang boleh login
      if (data.user.role !== 'pasien') {
        Alert.alert('Ditolak', 'Anda bukan pasien');
        return;
      }

      // Simpan token JWT
      await AsyncStorage.setItem('token', data.token);

      Alert.alert('Sukses', 'Login berhasil!');
      router.replace('/home'); // Arahkan ke halaman utama
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Gagal terhubung ke server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Akun Pasien</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>MASUK</Text>
      </TouchableOpacity>

      {/* Navigasi ke register dan login lainnya */}
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Belum punya akun? Daftar di sini</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/adminlogin')}>
        <Text style={styles.link}>Login sebagai Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/dokterlogin')}>
        <Text style={styles.link}>Login sebagai Dokter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    color: '#2196f3',
    textAlign: 'center',
  },
});
