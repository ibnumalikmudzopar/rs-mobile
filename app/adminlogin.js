import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { BASE_URL } from '../constants';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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

      if (json.user.role !== 'admin') {
  Alert.alert("Bukan admin");
  return;
}

      router.replace('/login');


      await AsyncStorage.setItem('token', json.token);
      router.replace('/adminreservasi');
    } catch (err) {
      Alert.alert('Error', 'Terjadi kesalahan saat login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Admin</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.spacer} />
      <Button title="Kembali" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  spacer: {
    height: 12,
  },
});
