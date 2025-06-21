// Middleware: Validasi JWT (JSON Web Token)
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware utama: validasi token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ambil token setelah 'Bearer'

  if (!token) {
    return res.status(401).json({ msg: 'Akses ditolak. Token tidak ditemukan.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verifikasi token
    req.user = decoded; // Simpan hasil decode ke req.user
    next(); // Lanjut ke handler berikutnya
  } catch (err) {
    return res.status(403).json({ msg: 'Token tidak valid.' });
  }
}

module.exports = verifyToken;
