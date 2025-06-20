const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Hanya untuk setup awal dokter — HAPUS SETELAH DIGUNAKAN!
router.post('/', async (req, res) => {
  try {
    const existing = await User.findOne({ email: 'dokter@example.com' });
    if (existing) {
      return res.status(400).json({ msg: 'Akun dokter sudah ada!' });
    }

    const hashed = await bcrypt.hash('dokter123', 10);

    const newDokter = new User({
      name: 'Dr. Rizky',
      email: 'dokter@example.com',
      password: hashed,
      role: 'dokter',
    });

    await newDokter.save();

    res.status(201).json({ msg: 'Akun dokter berhasil dibuat', dokter: newDokter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal membuat akun dokter' });
  }
});

module.exports = router;
