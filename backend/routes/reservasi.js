const express = require('express');
const router = express.Router();
const Reservasi = require('../models/reservasi');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// 👉 POST: Buat reservasi baru
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
    console.error(err);
    res.status(500).json({ msg: 'Gagal membuat reservasi' });
  }
});

// 👉 GET: Ambil riwayat reservasi pasien
router.get('/riwayat', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const reservasi = await Reservasi.find({ pasienId: userId }).sort({ tanggal: -1 });
    res.json(reservasi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal mengambil data riwayat' });
  }
});

// 👉 GET: Ambil semua reservasi (hanya untuk admin
// Ambil semua reservasi (admin only)
router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const data = await Reservasi.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengambil data' });
  }
});


// PUT: Admin mengonfirmasi reservasi
router.put('/:id', verifyToken, async (req, res) => {
  try {
    // Pastikan hanya admin yang bisa akses
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Hanya admin yang dapat mengonfirmasi reservasi' });
    }

    const reservasi = await Reservasi.findById(req.params.id);
    if (!reservasi) {
      return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });
    }

    reservasi.status = 'Terkonfirmasi';
    await reservasi.save();

    res.status(200).json({ msg: 'Reservasi dikonfirmasi', data: reservasi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Gagal mengonfirmasi reservasi' });
  }
});


// DELETE: Hapus reservasi (hanya untuk admin)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const reservasi = await Reservasi.findByIdAndDelete(req.params.id);
    if (!reservasi) {
      return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });
    }
    res.status(200).json({ msg: 'Reservasi berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal menghapus reservasi' });
  }
});

// GET: Semua reservasi (khusus admin)
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

// PUT: Admin konfirmasi reservasi
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

// GET: Dokter melihat semua reservasi yang belum diperiksa
router.get('/dokter', verifyToken, async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== 'dokter') {
      return res.status(403).json({ msg: 'Akses hanya untuk dokter' });
    }

    const data = await Reservasi.find({ status: { $ne: 'Selesai Diperiksa' } });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Gagal mengambil data reservasi' });
  }
});


// GET detail reservasi berdasarkan ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const reservasi = await Reservasi.findById(req.params.id);
    if (!reservasi) {
      return res.status(404).json({ msg: 'Reservasi tidak ditemukan' });
    }
    res.json(reservasi);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengambil reservasi' });
  }
});



module.exports = router;
