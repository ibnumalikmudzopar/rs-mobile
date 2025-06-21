// Pasien: Halaman untuk melihat Jadwal Dokter
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BASE_URL } from '../constants';

export default function JadwalDokterScreen() {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Ambil data jadwal dokter dari backend
  const fetchJadwal = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/jadwal`);
      const data = await res.json();
      setJadwal(data);
    } catch (error) {
      console.error('Gagal mengambil jadwal:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  return (
    <View style={styles.container}>
      {/* Tombol kembali */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Kembali</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Jadwal Dokter</Text>

      {/* Loading atau tampilkan list */}
      {loading ? (
        <ActivityIndicator size="large" color="#2196f3" />
      ) : (
        <FlatList
          data={jadwal}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nama}>{item.nama}</Text>
              <Text>{item.spesialis}</Text>
              <Text>{item.hari}</Text>
              <Text>{item.jam}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#1d4ed8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  nama: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
