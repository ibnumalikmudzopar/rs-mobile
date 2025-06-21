// File utama: Mengecek status login saat aplikasi dibuka
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Page() {
  const [checking, setChecking] = useState(true);     // Status pengecekan token
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login user

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Gagal ambil token:', error);
      } finally {
        setChecking(false);
      }
    };

    checkToken();
  }, []);

  // Tampilkan loading selama proses pengecekan token
  if (checking) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );
  }

  // Redirect sesuai status login
  return <Redirect href={isLoggedIn ? '/home' : '/login'} />;
}

const styles = {
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
