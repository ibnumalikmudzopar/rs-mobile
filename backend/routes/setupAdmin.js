const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// 📍 POST /api/setup-admin
// Setup awal akun admin (1x pakai)
// HAPUS ROUTE INI SETELAH ADMIN BERHASIL DIBUAT
router.post('/', async (req, res) => {
  try {
    // Cek apakah admin sudah ada
    const existing = await User.findOne({ email: 'admin@example.com' });
    if (existing) {
      return res.status(400).json({ msg: 'Admin sudah ada!' });
    }

    // Enkripsi password
    const hashed = await bcrypt.hash('admin123', 10);

    // Buat admin baru
    const newAdmin = new User({
      name: 'Admin RS',
      email: 'admin@example.com',
      password: hashed,
      role: 'admin',
    });

    await newAdmin.save();

    res.status(201).json({
      msg: 'Admin berhasil dibuat',
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (err) {
    console.error('Gagal membuat admin:', err);
    res.status(500).json({ msg: 'Gagal membuat admin' });
  }
});

module.exports = router;
