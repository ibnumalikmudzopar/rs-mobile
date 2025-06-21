const mongoose = require('mongoose');

// Schema untuk data user (akun login)
const UserSchema = new mongoose.Schema({
  // Nama pengguna
  name: {
    type: String,
    required: true,
  },

  // Email harus unik
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Password yang sudah dienkripsi (bcrypt)
  password: {
    type: String,
    required: true,
  },

  // Role: 'pasien' (default), 'admin', atau 'dokter'
  role: {
    type: String,
    enum: ['pasien', 'admin', 'dokter'],
    default: 'pasien',
  },
}, {
  timestamps: true, // createdAt dan updatedAt
});

module.exports = mongoose.model('User', UserSchema);
