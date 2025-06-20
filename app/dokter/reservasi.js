import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, FlatList,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { BASE_URL } from '../../constants';

export default function DaftarReservasiDokter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReservasi = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/reservasi/dokter`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) {
        Alert.alert('Gagal', json.msg || 'Terjadi kesalahan');
        return;
      }
      setData(json);
    } catch (err) {
      Alert.alert('Error', 'Gagal mengambil data reservasi');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/login');
  };

  useEffect(() => {
    fetchReservasi();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reservasi Dokter</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
        ListEmptyComponent={<Text style={styles.empty}>Tidak ada reservasi</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/dokter/pemeriksaan', params: { id: item._id } })}
            style={styles.card}
          >
            <Text style={styles.title}>{item.namaPasien}</Text>
            <Text>{item.tanggal} - {item.poli}</Text>
            <Text>Keluhan: {item.keluhan}</Text>
            <Text>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: {
    borderWidth: 1, borderColor: '#ccc', padding: 15,
    marginBottom: 10, borderRadius: 8, backgroundColor: '#f9f9f9',
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 50 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0f2fe',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
