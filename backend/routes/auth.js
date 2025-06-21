// auth.js – Route otentikasi (register, login, buat dokter)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware verifikasi JWT (sebaiknya dipindah ke file terpisah)
function verifyToken(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

// ✅ Register akun pasien
// POST /api/auth/register
// Body: { name, email, password }
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email sudah terdaftar' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword }); // default: role = pasien
    await user.save();

    res.json({ msg: 'Register berhasil' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Login
// POST /api/auth/login
// Body: { email, password }
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Akun tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Password salah' });

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      JWT_SECRET
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Buat akun dokter (khusus admin)
// POST /api/auth/buat-dokter
// Header: x-auth-token
// Body: { name, email, password }
router.post('/buat-dokter', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Akses ditolak' });

  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashed, role: 'dokter' });
  await newUser.save();
  res.status(201).json({ msg: 'Akun dokter dibuat' });
});

module.exports = router;
