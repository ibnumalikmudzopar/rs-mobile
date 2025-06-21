// Dokter: Halaman Pemeriksaan Pasien
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { BASE_URL } from '../../constants';

export default function PemeriksaanScreen() {
  const { id } = useLocalSearchParams(); // ID reservasi
  const router = useRouter();

  // State data
  const [loading, setLoading] = useState(true);
  const [reservasi, setReservasi] = useState(null);
  const [diagnosa, setDiagnosa] = useState('');
  const [tindakan, setTindakan] = useState('');
  const [catatan, setCatatan] = useState('');

  // Ambil data reservasi berdasarkan ID
  const fetchReservasi = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/reservasi/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (res.ok) {
        setReservasi(json);
      } else {
        Alert.alert('Gagal', json.msg || 'Terjadi kesalahan');
      }
    } catch (err) {
      Alert.alert('Error', 'Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  // Simpan hasil pemeriksaan ke backend
  const handleSimpan = async () => {
    if (!diagnosa || !tindakan || !catatan) {
      Alert.alert('Lengkapi data', 'Semua field harus diisi');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/riwayatkunjungan/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ diagnosa, tindakan, catatan }),
      });

      const json = await res.json();
      if (res.ok) {
        Alert.alert('Berhasil', 'Pemeriksaan disimpan', [
          { text: 'OK', onPress: () => router.replace('/dokter/reservasi') },
        ]);
      } else {
        Alert.alert('Gagal', json.msg || 'Gagal menyimpan');
      }
    } catch (err) {
      Alert.alert('Error', 'Gagal menyimpan data');
    }
  };

  useEffect(() => {
    fetchReservasi();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (!reservasi) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pemeriksaan Pasien</Text>

      <Text>Nama Pasien: {reservasi.namaPasien}</Text>
      <Text>Keluhan: {reservasi.keluhan}</Text>

      <Text style={styles.label}>Diagnosa</Text>
      <TextInput
        style={styles.input}
        value={diagnosa}
        onChangeText={setDiagnosa}
        placeholder="Masukkan diagnosa"
      />

      <Text style={styles.label}>Tindakan</Text>
      <TextInput
        style={styles.input}
        value={tindakan}
        onChangeText={setTindakan}
        placeholder="Masukkan tindakan"
      />

      <Text style={styles.label}>Catatan</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={catatan}
        onChangeText={setCatatan}
        placeholder="Catatan tambahan"
        multiline
      />

      <Button title="Simpan Pemeriksaan" onPress={handleSimpan} />
      <Button title="Kembali" onPress={() => router.back()} color="#2196f3" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 15, marginBottom: 5, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
});
