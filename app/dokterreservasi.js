import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { BASE_URL } from '../constants';

export default function DokterReservasiScreen() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const fetchReservasi = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/reservasi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      Alert.alert('Error', 'Gagal mengambil data reservasi');
    }
  };

  const handleSubmit = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`http://50.50.50.110:5000/api/kunjungan/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form[id]),
      });
      const json = await res.json();
      if (res.ok) {
        Alert.alert('Berhasil', 'Data kunjungan disimpan');
        fetchReservasi();
      } else {
        Alert.alert('Gagal', json.msg);
      }
    } catch (err) {
      Alert.alert('Error', 'Gagal menyimpan kunjungan');
    }
  };

  useEffect(() => {
    fetchReservasi();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.namaPasien}</Text>
          <Text>Tanggal: {item.tanggal}</Text>
          <Text>Keluhan: {item.keluhan}</Text>
          <TextInput
            placeholder="Diagnosa"
            style={styles.input}
            value={form[item._id]?.diagnosa || ''}
            onChangeText={(text) => setForm({ ...form, [item._id]: { ...form[item._id], diagnosa: text } })}
          />
          <TextInput
            placeholder="Tindakan"
            style={styles.input}
            value={form[item._id]?.tindakan || ''}
            onChangeText={(text) => setForm({ ...form, [item._id]: { ...form[item._id], tindakan: text } })}
          />
          <TextInput
            placeholder="Catatan"
            style={styles.input}
            value={form[item._id]?.catatan || ''}
            onChangeText={(text) => setForm({ ...form, [item._id]: { ...form[item._id], catatan: text } })}
          />
          <Button title="Selesai Diperiksa" onPress={() => handleSubmit(item._id)} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
});
