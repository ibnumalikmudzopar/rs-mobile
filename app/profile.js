import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
import { BASE_URL } from '../constants';

export default function ProfilScreen() {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfil = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) {
        Alert.alert('Gagal', json.msg || 'Terjadi kesalahan');
        return;
      }
      setProfil(json);
    } catch (err) {
      Alert.alert('Error', 'Gagal mengambil data profil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/login'); // kembali ke login
  };

  useEffect(() => {
    fetchProfil();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Pasien</Text>
      <Text>Nama: {profil.name}</Text>
      <Text>Email: {profil.email}</Text>
      <Text>Role: {profil.role}</Text>

      <Button title="Edit Profil" onPress={() => router.push('/edit')} />
        <View style={styles.spacer} />
        <Button title="Kembali" onPress={() => router.back()} />
        <View style={styles.spacer} />
      <Button title="Logout" color="red" onPress={handleLogout} />
    
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spacer: {
    height: 12
  }
});
