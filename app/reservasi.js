// Pasien: Halaman Form Reservasi Online
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { BASE_URL } from '../constants';

const ReservasiScreen = () => {
  const [poli, setPoli] = useState('');
  const [dokter, setDokter] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [keluhan, setKeluhan] = useState('');

  // Kirim data reservasi ke backend
  const handleReservasi = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await fetch(`${BASE_URL}/api/reservasi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ poli, dokter, tanggal, keluhan }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Gagal', data.msg || 'Terjadi kesalahan');
        return;
      }

      Alert.alert('Sukses', 'Reservasi berhasil!');
      
      // Kosongkan form
      setPoli('');
      setDokter('');
      setTanggal('');
      setKeluhan('');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Tidak bisa menghubungi server');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reservasi Online</Text>

      <TextInput
        style={styles.input}
        placeholder="Poli (contoh: Umum, Gigi)"
        value={poli}
        onChangeText={setPoli}
      />

      <TextInput
        style={styles.input}
        placeholder="Nama Dokter"
        value={dokter}
        onChangeText={setDokter}
      />

      <TextInput
        style={styles.input}
        placeholder="Tanggal (YYYY-MM-DD)"
        value={tanggal}
        onChangeText={setTanggal}
      />

      <TextInput
        style={styles.input}
        placeholder="Keluhan"
        value={keluhan}
        onChangeText={setKeluhan}
        multiline
      />

      <Button title="Kirim Reservasi" onPress={handleReservasi} />
      <View style={styles.spacer} />
      <Button title="Kembali" onPress={() => router.back()} />
    </ScrollView>
  );
};

export default ReservasiScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
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
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
  },
  spacer: {
    height: 12,
  },
});
