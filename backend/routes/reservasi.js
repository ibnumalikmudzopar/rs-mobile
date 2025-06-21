const express = require('express');
const router = express.Router();
const Reservasi = require('../models/reservasi');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// ===================== PASIEN =====================

// POST /api/reservasi
// 👉 Pasien membuat reservasi
router.post('/', verifyToken, async (req, res) => {
  try {
    const { dokter, tanggal, keluhan, poli } = req.body;

    const newReservasi = new Reservasi({
      pasienId: req.user.id,
      namaPasien: req.user.name,
      dokter,
      tanggal,
      keluhan,
      poli,
    });

    await newReservasi.save();
    res.status(201).json({ msg: 'Reservasi berhasil dibuat', data: newReservasi });
  } catch (err) {
    res.status(500).json({ msg: 'Gagal membuat reservasi' });
  }
});

// GET /api/reservasi/riwayat
// 👉 Pasien melihat daftar reservasinya
router.get('/riwayat', verifyToken, async (req, res) => {
  try {
    const reservasi = await Reservasi.find({ pasienId: req.user.id }).sort({ tanggal: -1 });
    res.json(reservasi);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengambil riwayat reservasi' });
  }
});


// ===================== ADMIN =====================

// GET /api/reservasi/all
// 👉 Admin melihat semua reservasi
router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const data = await Reservasi.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengambil data' });
  }
});

// PUT /api/reservasi/:id
// 👉 Admin konfirmasi reservasi (versi 1)
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Hanya admin yang dapat mengonfirmasi reservasi' });
  }

  try {
    const reservasi = await Reservasi.findById(req.params.id);
    if (!reservasi) return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });

    reservasi.status = 'Terkonfirmasi';
    await reservasi.save();

    res.status(200).json({ msg: 'Reservasi dikonfirmasi', data: reservasi });
  } catch (error) {
    res.status(500).json({ msg: 'Gagal mengonfirmasi reservasi' });
  }
});

// PUT /api/reservasi/konfirmasi/:id
// 👉 Admin konfirmasi reservasi (versi 2)
router.put('/konfirmasi/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Hanya admin yang bisa mengkonfirmasi' });
  }

  try {
    const reservasi = await Reservasi.findByIdAndUpdate(
      req.params.id,
      { status: 'Terkonfirmasi' },
      { new: true }
    );

    if (!reservasi) return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });

    res.status(200).json({ msg: 'Reservasi dikonfirmasi', data: reservasi });
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengubah status reservasi' });
  }
});

// DELETE /api/reservasi/:id
// 👉 Admin menghapus reservasi
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const reservasi = await Reservasi.findByIdAndDelete(req.params.id);
    if (!reservasi) return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });
    res.status(200).json({ msg: 'Reservasi berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ msg: 'Gagal menghapus reservasi' });
  }
});

// GET /api/reservasi/semua
// 👉 Admin melihat semua reservasi (duplikat dari /all, bisa dihapus salah satu)
router.get('/semua', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Hanya admin yang bisa mengakses' });
  }

  try {
    const semuaReservasi = await Reservasi.find().sort({ createdAt: -1 });
    res.status(200).json(semuaReservasi);
  } catch (error) {
    res.status(500).json({ msg: 'Gagal mengambil semua reservasi' });
  }
});


// ===================== DOKTER =====================

// GET /api/reservasi/dokter
// 👉 Dokter melihat semua reservasi yang belum selesai diperiksa
router.get('/dokter', verifyToken, async (req, res) => {
  if (req.user.role !== 'dokter') {
    return res.status(403).json({ msg: 'Akses hanya untuk dokter' });
  }

  try {
    const data = await Reservasi.find({ status: { $ne: 'Selesai Diperiksa' } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Gagal mengambil data reservasi' });
  }
});


// ===================== UMUM =====================

// GET /api/reservasi/:id
// 👉 Detail reservasi berdasarkan ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const reservasi = await Reservasi.findById(req.params.id);
    if (!reservasi) return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });
    res.json(reservasi);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengambil reservasi' });
  }
});

module.exports = router;
