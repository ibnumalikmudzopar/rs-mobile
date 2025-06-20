const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Kunjungan = require('../models/kunjungan');

// Dokter mengisi hasil pemeriksaan
router.post('/', verifyToken, async (req, res) => {
  try {
    const { pasienId, namaPasien, dokter, tanggal, diagnosa, tindakan, catatan } = req.body;

    // validasi role
    if (req.user.role !== 'dokter') {
      return res.status(403).json({ msg: 'Hanya dokter yang bisa mengisi data ini' });
    }

    const kunjungan = new Kunjungan({
      pasienId,
      namaPasien,
      dokter,
      tanggal,
      diagnosa,
      tindakan,
      catatan
    });

    await kunjungan.save();
    res.status(201).json({ msg: 'Data pemeriksaan disimpan sebagai kunjungan', data: kunjungan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal menyimpan data kunjungan' });
  }
});

module.exports = router;
