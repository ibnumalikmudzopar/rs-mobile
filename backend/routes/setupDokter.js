const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// 📍 POST /api/setup-dokter
// Setup awal akun dokter (sekali pakai saja)
router.post('/', async (req, res) => {
  try {
    // Cek apakah sudah ada dokter dengan email ini
    const existing = await User.findOne({ email: 'dokter@example.com' });
    if (existing) {
      return res.status(400).json({ msg: 'Akun dokter sudah ada!' });
    }

    // Enkripsi password default
    const hashed = await bcrypt.hash('dokter123', 10);

    // Buat akun dokter baru
    const newDokter = new User({
      name: 'Dr. Rizky',
      email: 'dokter@example.com',
      password: hashed,
      role: 'dokter',
    });

    await newDokter.save();

    res.status(201).json({
      msg: 'Akun dokter berhasil dibuat',
      dokter: {
        id: newDokter._id,
        email: newDokter.email,
        role: newDokter.role,
      },
    });
  } catch (err) {
    console.error('Gagal membuat akun dokter:', err);
    res.status(500).json({ msg: 'Gagal membuat akun dokter' });
  }
});

module.exports = router;
