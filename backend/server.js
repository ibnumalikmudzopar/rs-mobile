// Inisialisasi .env dan module
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inisialisasi express app
const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// === Route Utama ===
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reservasi', require('./routes/reservasi'));
app.use('/api/jadwal', require('./routes/jadwal'));
app.use('/api/riwayat', require('./routes/riwayatreservasi'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/riwayatkunjungan', require('./routes/riwayatkunjungan'));

// Rute dokter (pemeriksaan dan konversi)
app.use('/api/kunjungan', require('./routes/dokter'));
app.use('/api/kunjungan', require('./routes/kunjungan')); // bisa digabung

// Setup awal (1x pakai)
app.use('/api/setup-admin', require('./routes/setupAdmin'));
app.use('/api/setup-dokter', require('./routes/setupDokter'));

// === Jalankan Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
