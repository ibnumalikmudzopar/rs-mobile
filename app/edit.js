import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { BASE_URL } from '../constants';
export default function EditProfileScreen() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) {
        setNama(json.name || '');
        setEmail(json.email || '');
      } else {
        Alert.alert('Gagal', json.msg || 'Terjadi kesalahan');
      }
    } catch (err) {
      Alert.alert('Error', 'Gagal mengambil data profil');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch('http://50.50.50.110:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: nama, email }),
      });
      const json = await res.json();
      if (res.ok) {
        Alert.alert('Berhasil', 'Profil berhasil diperbarui', [
          { text: 'OK', onPress: () => router.replace('/profile') },
        ]);
      } else {
        Alert.alert('Gagal', json.msg || 'Gagal mengubah profil');
      }
    } catch (err) {
      Alert.alert('Error', 'Terjadi kesalahan saat menyimpan data');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        value={nama}
        onChangeText={setNama}
        placeholder="Masukkan nama"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Masukkan email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Simpan Perubahan" onPress={handleSubmit} />
      <View style={styles.spacer} />
      < Button title="Kembali" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  spacer: {
    height: 12,
  },
});
