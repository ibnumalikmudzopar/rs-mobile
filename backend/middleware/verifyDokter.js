// Middleware: Validasi hanya dokter yang bisa akses
// Wajib dipasang setelah verifyToken

const verifyDokter = (req, res, next) => {
  // Jika user terautentikasi dan rolenya 'dokter'
  if (req.user && req.user.role === 'dokter') {
    return next();
  }

  // Jika bukan dokter → akses ditolak
  return res.status(403).json({
    msg: 'Akses ditolak. Hanya dokter yang diperbolehkan.',
  });
};

module.exports = verifyDokter;
