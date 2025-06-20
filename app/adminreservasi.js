import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, Button, FlatList,
  StyleSheet, Text,
  TouchableOpacity,
  View
} from 'react-native';
import { BASE_URL } from '../constants';

export default function AdminReservasiScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReservasi = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/reservasi/semua`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) setData(json);
      else Alert.alert('Gagal', json.msg || 'Terjadi kesalahan');
    } catch (err) {
      Alert.alert('Error', 'Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const handleKonfirmasi = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://50.50.50.110:5000/api/reservasi/konfirmasi/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (res.ok) {
        Alert.alert('Berhasil', 'Reservasi dikonfirmasi');
        fetchReservasi(); // refresh data
      } else {
        Alert.alert('Gagal', json.msg || 'Gagal mengonfirmasi');
      }
    } catch (err) {
      Alert.alert('Error', 'Terjadi kesalahan saat mengkonfirmasi');
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
        <Text style={styles.headerTitle}>Reservasi Admin</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.namaPasien}</Text>
            <Text>Dokter: {item.dokter}</Text>
            <Text>Tanggal: {item.tanggal}</Text>
            <Text>Status: {item.status}</Text>
            {item.status === 'Menunggu Konfirmasi' && (
              <Button title="Konfirmasi" onPress={() => handleKonfirmasi(item._id)} />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#dbeafe',
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
