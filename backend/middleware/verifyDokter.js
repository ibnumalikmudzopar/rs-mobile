const verifyDokter = (req, res, next) => {
  if (req.user && req.user.role === 'dokter') {
    next();
  } else {
    res.status(403).json({ msg: 'Akses ditolak. Hanya dokter yang diperbolehkan.' });
  }
};

module.exports = verifyDokter;
