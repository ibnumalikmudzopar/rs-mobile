// constants.js

// ✅ Untuk emulator Android (Android Studio)
// Gunakan jika backend berjalan di laptop dan aplikasi dijalankan di emulator
// export const BASE_URL = 'http://10.0.2.2:5000';

// ✅ Untuk perangkat HP yang terhubung ke jaringan WiFi yang sama dengan laptop
// Ganti IP dengan IP lokal laptop kamu (cek dengan `ipconfig` / `ifconfig`)
export const BASE_URL = 'http://50.50.50.110:5000'; // IP Laptop saat ini

// ✅ Untuk testing langsung di laptop (misal: pakai browser atau WebView di laptop)
// Hanya berfungsi jika aplikasi dan backend berjalan di perangkat yang sama
// export const BASE_URL = 'http://localhost:5000';

// ✅ Jika backend sudah di-deploy online (contoh pakai Render, Vercel, dll)
// export const BASE_URL = 'https://nama-backend-kamu.onrender.com';
