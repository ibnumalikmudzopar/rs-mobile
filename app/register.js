import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { BASE_URL } from '../constants';
export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    try {
      // const response = await fetch('http://localhost:5000/api/auth/register', {  // API endpoint untuk registrasi   
      const response = await fetch(`${BASE_URL}/api/auth/register`, { // IP Laptop
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', 'Registrasi berhasil!');
        router.replace('/login'); 
      } else {
        Alert.alert('Gagal', data.message || 'Terjadi kesalahan.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Tidak bisa menghubungi server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun Pasien</Text>

      <TextInput
        placeholder="Nama"
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
      />

      <Button title="Daftar" onPress={handleRegister} />

      {/* Teks navigasi ke login */}
      <Text
        style={styles.linkText}
        onPress={() => router.push('/login')}
      >
        Sudah punya akun? Masuk di sini
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  linkText: {
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
