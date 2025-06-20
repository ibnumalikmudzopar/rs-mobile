import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Page() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? '/home' : '/login'} />;
}



// import { Redirect } from 'expo-router';

// export default function Page() {
//   return <Redirect href="/login" />;
// }

