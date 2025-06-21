# 🏥 Aplikasi Mobile Rumah Sakit

Sistem reservasi, pemeriksaan, dan manajemen pasien berbasis mobile. Mendukung tiga role utama: pasien, admin, dan dokter.

---

## 🚀 Fitur Utama

### 👨‍⚕️ Pasien
- Register & Login (JWT)
- Melakukan reservasi online
- Melihat riwayat reservasi dan hasil pemeriksaan

### 🧑‍💼 Admin
- Melihat semua reservasi
- Mengonfirmasi reservasi

### 🩺 Dokter
- Melihat daftar reservasi yang dikonfirmasi
- Mengisi hasil pemeriksaan pasien
- Menyimpan hasil ke riwayat kunjungan

---

## ⚙️ Teknologi yang Digunakan

| Kategori    | Teknologi                      |
|-------------|--------------------------------|
| Frontend    | React Native (Expo + Router)   |
| Backend     | Express.js + Node.js           |
| Database    | MongoDB + Mongoose             |
| Autentikasi | JWT + bcrypt                   |
| Penyimpanan | AsyncStorage (React Native)    |

---

## 📂 Struktur Folder

```
rs-mobile/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── app/              # Frontend (React Native)
│   ├── login.js
│   ├── register.js
│   ├── reservasi.js
│   └── ...
│
├── constants.js
└── ...
```

---

## 🔐 Middleware

- `verifyToken` – Autentikasi JWT untuk semua user
- `verifyAdmin` – Validasi role admin
- `verifyDokter` – Validasi role dokter

---

## 📄 Contoh API Endpoint

| Endpoint                      | Method | Role     | Keterangan                    |
|------------------------------|--------|----------|-------------------------------|
| `/api/auth/register`         | POST   | umum     | Register akun pasien          |
| `/api/auth/login`            | POST   | umum     | Login menggunakan JWT         |
| `/api/reservasi`             | POST   | pasien   | Buat reservasi baru           |
| `/api/reservasi/:id`         | PUT    | admin    | Konfirmasi reservasi          |
| `/api/riwayatkunjungan/:id`  | POST   | dokter   | Simpan hasil pemeriksaan      |
| `/api/profile`               | GET    | semua    | Ambil data user yang login    |

---

## 🛠 Cara Menjalankan Proyek

### Backend (Express.js)
```bash
cd rs-mobile/backend
npm install
node server.js
```

### Frontend (React Native + Expo)
```bash
cd rs-mobile
npm install
npx expo start
```

> Pastikan file `.env` pada backend sudah dikonfigurasi dengan benar dan IP `BASE_URL` di `constants.js` disesuaikan.

---

## ✅ Fitur yang Sudah Diimplementasikan

- [x] Autentikasi JWT
- [x] Role-based Access Control (RBAC)
- [x] Reservasi Pasien
- [x] Konfirmasi Admin
- [x] Pemeriksaan oleh Dokter
- [x] Riwayat Reservasi & Kunjungan

---

## 📦 Rencana Pengembangan

- Upload file rekam medis
- Notifikasi ke pasien/dokter
- Export PDF hasil pemeriksaan
- Dashboard statistik admin

---

## 👤 Dibuat oleh

Jimmy Wilbur  
🧑‍💻 Mobile Developer – React Native  
📅 Juni 2025