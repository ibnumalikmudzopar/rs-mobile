// Middleware: Cek apakah user adalah admin
// Digunakan setelah verifyToken

const verifyAdmin = (req, res, next) => {
  // Jika user ada dan rolenya 'admin'
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  // Jika bukan admin → akses ditolak
  return res.status(403).json({
    msg: 'Akses ditolak. Hanya admin yang diperbolehkan.',
  });
};

module.exports = verifyAdmin;
