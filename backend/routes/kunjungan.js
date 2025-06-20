const express = require('express');
const router = express.Router();

// contoh endpoint sementara
router.get('/', (req, res) => {
  res.json({ msg: 'Ini endpoint kunjungan sementara' });
});

module.exports = router;
