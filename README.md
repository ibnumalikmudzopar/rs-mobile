# 🏥 Aplikasi Mobile Rumah Sakit

Sistem reservasi, pemeriksaan, dan manajemen pasien berbasis mobile..

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
- Simpan ke riwayat kunjungan

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

rs-mobile/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── .env
│
├── app/ (Front end)
|   ├── login.js
│   └── ...
├── constants.js
├── ....



---

## 🔐 Middleware
- `verifyToken`: Autentikasi user via token
- `verifyAdmin`: Hanya untuk role admin
- `verifyDokter`: Hanya untuk role dokter

---

## 📄 API Endpoint (Contoh)

| Endpoint                      | Method | Role     | Keterangan                    |
|------------------------------|--------|----------|-------------------------------|
| `/api/auth/register`         | POST   | umum     | Register akun pasien          |
| `/api/auth/login`            | POST   | umum     | Login (JWT)                   |
| `/api/reservasi`             | POST   | pasien   | Buat reservasi baru           |
| `/api/reservasi/:id`         | PUT    | admin    | Konfirmasi reservasi          |
| `/api/riwayatkunjungan/:id`  | POST   | dokter   | Simpan hasil pemeriksaan      |
| `/api/profile`               | GET    | semua    | Ambil data user login         |

---

## 🛠 Cara Menjalankan

### Backend
```bash
cd app/backend
node serve
FrontEnd
cd rs-mobile
npx expo start

Fitur yang Sudah Diimplementasikan
 Autentikasi JWT

 Role-based access

 Reservasi pasien

 Konfirmasi admin

 Pemeriksaan dokter

 Riwayat reservasi & kunjungan


Rencana Pengembangan
Upload file rekam medis

Notifikasi

Export PDF hasil pemeriksaan

Dashboard statistik admin

👤 Dibuat oleh jimmywilbur
akun 
