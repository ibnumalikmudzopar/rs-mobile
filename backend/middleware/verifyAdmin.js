const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Akses ditolak. Hanya admin yang diperbolehkan.' });
  }
};

module.exports = verifyAdmin;
