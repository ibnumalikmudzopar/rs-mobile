import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, FlatList,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { BASE_URL } from '../constants';

export default function RiwayatKunjunganScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchKunjungan = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/riwayatkunjungan`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) {
        Alert.alert('Gagal', json.msg || 'Terjadi kesalahan');
        return;
      }

      setData(json);
    } catch (err) {
      Alert.alert('Error', 'Gagal mengambil data kunjungan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKunjungan();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

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
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Tidak ada riwayat kunjungan
        </Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.dokter}</Text>
          <Text>Tanggal: {item.tanggal}</Text>
          <Text>Diagnosa: {item.diagnosa}</Text>
          <Text>Tindakan: {item.tindakan}</Text>
          <Text>Catatan: {item.catatan}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f0f9ff',
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
});
