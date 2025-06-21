const express = require('express');
const router = express.Router();
const Reservasi = require('../models/reservasi');
const Kunjungan = require('../models/kunjungan');
const verifyToken = require('../middleware/verifyToken');

// Middleware validasi role dokter
const hanyaDokter = (req, res, next) => {
  if (req.user.role !== 'dokter') {
    return res.status(403).json({ msg: 'Akses hanya untuk dokter' });
  }
  next();
};

// 📌 GET: Daftar reservasi yang sudah dikonfirmasi (untuk dokter)
router.get('/reservasi', verifyToken, hanyaDokter, async (req, res) => {
  try {
    const reservasi = await Reservasi.find({ status: 'Dikonfirmasi' }).sort({ tanggal: -1 });
    res.json(reservasi);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengambil data' });
  }
});

// 📌 PUT: Simpan hasil pemeriksaan (update langsung di reservasi)
router.put('/periksa/:id', verifyToken, hanyaDokter, async (req, res) => {
  try {
    const { diagnosa, tindakan, catatan } = req.body;
    const reservasi = await Reservasi.findById(req.params.id);

    if (!reservasi) return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });

    reservasi.diagnosa = diagnosa;
    reservasi.tindakan = tindakan;
    reservasi.catatan = catatan;
    reservasi.status = 'Selesai Diperiksa';

    await reservasi.save();

    res.json({ msg: 'Data pemeriksaan disimpan' });
  } catch (err) {
    res.status(500).json({ msg: 'Gagal menyimpan data pemeriksaan' });
  }
});

// 📌 PUT: Konversi reservasi → riwayat kunjungan, lalu hapus reservasi
router.put('/:id', verifyToken, hanyaDokter, async (req, res) => {
  try {
    const { diagnosa, tindakan, catatan } = req.body;
    const reservasi = await Reservasi.findById(req.params.id);
    if (!reservasi) {
      return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });
    }

    // Simpan ke koleksi Kunjungan
    const kunjunganBaru = new Kunjungan({
      pasienId: reservasi.pasienId,
      namaPasien: reservasi.namaPasien,
      dokter: reservasi.dokter,
      tanggal: reservasi.tanggal,
      diagnosa,
      tindakan,
      catatan,
    });

    await kunjunganBaru.save();
    await reservasi.deleteOne();

    res.status(200).json({
      msg: 'Reservasi dikonversi ke kunjungan',
      data: kunjunganBaru,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal memproses kunjungan' });
  }
});

module.exports = router;
