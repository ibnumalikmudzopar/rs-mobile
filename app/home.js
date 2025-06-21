// Pasien: Halaman Beranda Setelah Login
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  // Logout: hapus token dan kembali ke login
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Selamat Datang di RS Mobile App</Text>

      <View style={styles.buttonGroup}>
        <Button
          title="Lihat Jadwal Dokter"
          onPress={() => router.push('/jadwal')}
        />
        <View style={styles.spacer} />

        <Button
          title="Reservasi Online"
          onPress={() => router.push('/reservasi')}
        />
        <View style={styles.spacer} />

        <Button
          title="Riwayat Reservasi"
          onPress={() => router.push('/riwayatreservasi')}
        />
        <View style={styles.spacer} />

        <Button
          title="Riwayat Kunjungan"
          onPress={() => router.push('/riwayatkunjungan')}
        />
        <View style={styles.spacer} />

        <Button
          title="Profil Pengguna"
          onPress={() => router.push('/profile')}
        />
        <View style={styles.spacer} />

        <Button
          title="Logout"
          onPress={handleLogout}
          color="red"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
  },
  spacer: {
    height: 12,
  },
});
