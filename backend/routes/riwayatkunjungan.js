const express = require('express');
const router = express.Router();
const Reservasi = require('../models/reservasi');
const RiwayatKunjungan = require('../models/riwayatkunjungan');
const verifyToken = require('../middleware/verifyToken');

// POST: Simpan hasil pemeriksaan ke riwayat kunjungan
router.post('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { diagnosa, tindakan, catatan } = req.body;

    const reservasi = await Reservasi.findById(id);
    if (!reservasi) {
      return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });
    }

    const riwayat = new RiwayatKunjungan({
      reservasiId: id,
      pasienId: reservasi.pasienId,
      namaPasien: reservasi.namaPasien,
      dokter: reservasi.dokter,
      tanggal: reservasi.tanggal,
      diagnosa,
      tindakan,
      catatan,
    });

    await riwayat.save();

    // update status reservasi menjadi "Selesai Diperiksa"
    reservasi.status = 'Selesai Diperiksa';
    await reservasi.save();

    res.status(201).json({ msg: 'Pemeriksaan disimpan', data: riwayat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal menyimpan pemeriksaan' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await RiwayatKunjungan.find({ pasienId: userId }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal mengambil riwayat kunjungan' });
  }
});


module.exports = router;
