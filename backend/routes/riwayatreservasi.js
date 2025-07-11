// routes/riwayat.js
const express = require('express');
const router = express.Router();
const Reservasi = require('../models/reservasi');
const verifyToken = require('../middleware/verifyToken');

// 📍 GET /api/riwayat/kunjungan
// Ambil semua riwayat reservasi milik pasien login
router.get('/kunjungan', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const riwayat = await Reservasi.find({ pasienId: userId }).sort({ tanggal: -1 });

    res.status(200).json(riwayat);
  } catch (error) {
    console.error('Gagal ambil riwayat:', error);
    res.status(500).json({ msg: 'Gagal mengambil riwayat kunjungan' });
  }
});

module.exports = router;
