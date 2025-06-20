const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ msg: 'Akses ditolak. Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // ⬅️ PENTING
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token tidak valid' });
  }
}

function verifyAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Hanya admin yang bisa mengakses ini' });
  }
  next();
}


module.exports = verifyToken;
