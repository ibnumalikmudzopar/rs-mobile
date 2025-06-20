const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Hanya untuk setup awal admin — HAPUS SETELAH DIGUNAKAN!
router.post('/', async (req, res) => {
  try {
    const existing = await User.findOne({ email: 'admin@example.com' });
    if (existing) {
      return res.status(400).json({ msg: 'Admin sudah ada!' });
    }

    const hashed = await bcrypt.hash('admin123', 10);

    const newAdmin = new User({
      name: 'Admin RS',
      email: 'admin@example.com',
      password: hashed,
      role: 'admin',
    });

    await newAdmin.save();

    res.status(201).json({ msg: 'Admin berhasil dibuat', admin: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal membuat admin' });
  }
});

module.exports = router;
