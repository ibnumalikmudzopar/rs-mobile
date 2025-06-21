const express = require('express');
const router = express.Router();

// Placeholder endpoint untuk kunjungan
// GET /api/kunjungan
router.get('/', (req, res) => {
  res.json({ msg: 'Ini endpoint kunjungan sementara' });
});

module.exports = router;
