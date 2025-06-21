const mongoose = require('mongoose');

// Schema untuk menyimpan data reservasi pasien
const ReservasiSchema = new mongoose.Schema({
  // Referensi ke user pasien
  pasienId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Nama pasien (disalin agar tetap muncul meski user dihapus)
  namaPasien: {
    type: String,
    required: true,
  },

  // Nama dokter yang dipilih
  dokter: {
    type: String,
    required: true,
  },

  // Tanggal reservasi (format: YYYY-MM-DD)
  tanggal: {
    type: String,
    required: true,
  },

  // Keluhan utama pasien
  keluhan: {
    type: String,
    required: true,
  },

  // Status reservasi (default: Menunggu Konfirmasi)
  status: {
    type: String,
    default: 'Menunggu Konfirmasi',
  },

  // Opsional: diisi oleh dokter setelah pemeriksaan
  diagnosa: {
    type: String,
    default: '',
  },
  tindakan: {
    type: String,
    default: '',
  },
  catatan: {
    type: String,
    default: '',
  },
}, {
  timestamps: true, // Akan otomatis menyimpan createdAt dan updatedAt
});

// Ekspor model
module.exports = mongoose.model('Reservasi', ReservasiSchema);
