// Route: Dokter menyimpan hasil pemeriksaan ke koleksi Kunjungan
const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const Kunjungan = require('../models/kunjungan');

// POST /api/kunjungan
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      pasienId,
      namaPasien,
      dokter,
      tanggal,
      diagnosa,
      tindakan,
      catatan
    } = req.body;

    // Cek role harus 'dokter'
    if (req.user.role !== 'dokter') {
      return res.status(403).json({ msg: 'Hanya dokter yang bisa mengisi data ini' });
    }

    // Buat dokumen baru untuk riwayat kunjungan
    const kunjungan = new Kunjungan({
      pasienId,
      namaPasien,
      dokter,
      tanggal,
      diagnosa,
      tindakan,
      catatan,
    });

    // Simpan ke database
    await kunjungan.save();

    res.status(201).json({
      msg: 'Data pemeriksaan disimpan sebagai kunjungan',
      data: kunjungan,
    });
  } catch (err) {
    console.error('Gagal simpan kunjungan:', err);
    res.status(500).json({ msg: 'Gagal menyimpan data kunjungan' });
  }
});

module.exports = router;
