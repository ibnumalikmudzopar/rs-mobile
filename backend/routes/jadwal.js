const express = require('express');
const router = express.Router();

// 📌 Data statis jadwal dokter
const jadwalDokter = [
  {
    id: 1,
    nama: 'dr. Andi Setiawan',
    spesialis: 'Spesialis Anak',
    hari: 'Senin & Rabu',
    jam: '08:00 - 12:00',
  },
  {
    id: 2,
    nama: 'dr. Maya Rahayu',
    spesialis: 'Spesialis Kandungan',
    hari: 'Selasa & Kamis',
    jam: '09:00 - 13:00',
  },
  {
    id: 3,
    nama: 'dr. Rudi Hartono',
    spesialis: 'Umum',
    hari: 'Setiap Hari',
    jam: '08:00 - 16:00',
  },
];

// 📍 GET /api/jadwal
// Endpoint publik untuk ambil daftar jadwal dokter
router.get('/', (req, res) => {
  res.json(jadwalDokter);
});

module.exports = router;
