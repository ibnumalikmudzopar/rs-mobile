// constants.js

// ======================
// Pilihan BASE_URL sesuai lingkungan
// ======================

// ✅ 1. Untuk emulator Android Studio
// Gunakan IP khusus emulator: 10.0.2.2 → diarahkan ke localhost laptop
// export const BASE_URL = 'http://10.0.2.2:5000';

// ✅ 2. Untuk perangkat HP (real device) di jaringan WiFi yang sama
// Ganti IP berikut dengan IP lokal laptop (cek dengan ipconfig / ifconfig)
//export const BASE_URL = 'http://50.50.50.110:5000'; // ← IP laptop kamu sekarang
export const BASE_URL = 'http://50.50.50.142:5000';


// ✅ 3. Untuk testing langsung di laptop (pakai browser atau WebView)
// Hanya berfungsi jika frontend & backend di laptop yang sama
// export const BASE_URL = 'http://localhost:5000';

// ✅ 4. Jika backend sudah di-deploy online (misal pakai Render / Vercel / Railway)
// export const BASE_URL = 'https://nama-backend-kamu.onrender.com';
