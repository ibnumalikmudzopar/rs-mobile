const express = require('express');
const router = express.Router();
const Reservasi = require('../models/reservasi');
const Kunjungan = require('../models/kunjungan');
const verifyToken = require('../middleware/verifyToken');

// PUT: Dokter konfirmasi selesai periksa
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'dokter') {
    return res.status(403).json({ msg: 'Hanya dokter yang dapat mengisi kunjungan' });
  }

  try {
    const { diagnosa, tindakan, catatan } = req.body;
    const reservasi = await Reservasi.findById(req.params.id);
    if (!reservasi) {
      return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });
    }

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

    res.status(200).json({ msg: 'Reservasi dikonversi ke kunjungan', data: kunjunganBaru });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal memproses kunjungan' });
  }
});

// routes/dokter.js
router.get('/reservasi', verifyToken, async (req, res) => {
  if (req.user.role !== 'dokter') {
    return res.status(403).json({ msg: 'Akses ditolak' });
  }

  const reservasi = await Reservasi.find({ status: 'Dikonfirmasi' }).sort({ tanggal: -1 });
  res.json(reservasi);
});

router.put('/periksa/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'dokter') {
    return res.status(403).json({ msg: 'Akses ditolak' });
  }

  const { diagnosa, tindakan, catatan } = req.body;
  const reservasi = await Reservasi.findById(req.params.id);

  if (!reservasi) return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });

  reservasi.diagnosa = diagnosa;
  reservasi.tindakan = tindakan;
  reservasi.catatan = catatan;
  reservasi.status = 'Selesai Diperiksa';

  await reservasi.save();

  res.json({ msg: 'Data pemeriksaan disimpan' });
});


module.exports = router;
