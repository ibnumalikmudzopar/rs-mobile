// Pasien: Halaman Riwayat Reservasi
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BASE_URL } from '../constants';

export default function RiwayatScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Ambil data reservasi dari backend
  const fetchRiwayat = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/riwayat/kunjungan`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (!res.ok) {
        Alert.alert('Gagal', json.msg || 'Terjadi kesalahan');
        return;
      }

      setData(json);
    } catch (err) {
      Alert.alert('Error', 'Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayat();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.emptyText}>Tidak ada riwayat</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.dokter} - {item.poli}</Text>
          <Text>{item.tanggal}</Text>
          <Text>Keluhan: {item.keluhan}</Text>
          <Text>Status: {item.status}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    marginBottom: 15,
  },
  backText: {
    color: '#1d4ed8',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});
