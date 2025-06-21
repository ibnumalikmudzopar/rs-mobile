const mongoose = require('mongoose');

// Schema: Menyimpan riwayat pemeriksaan pasien setelah reservasi
const RiwayatSchema = new mongoose.Schema({
  // Referensi ke reservasi asal
  reservasiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservasi',
    required: true,
  },

  // Referensi ke user pasien
  pasienId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Informasi hasil pemeriksaan
  namaPasien: { type: String },
  dokter: { type: String },
  tanggal: { type: String },
  diagnosa: { type: String },
  tindakan: { type: String },
  catatan: { type: String },
}, {
  timestamps: true, // Otomatis simpan createdAt dan updatedAt
});

// Ekspor model
module.exports = mongoose.model('RiwayatKunjungan', RiwayatSchema);
