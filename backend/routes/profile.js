const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/verifyToken');

// GET: Ambil data profile dari token
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengambil profil' });
  }
});

// PUT: Update data profile
router.put('/', verifyToken, async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ msg: 'Profil berhasil diperbarui', data: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: 'Gagal memperbarui profil' });
  }
});

module.exports = router;
