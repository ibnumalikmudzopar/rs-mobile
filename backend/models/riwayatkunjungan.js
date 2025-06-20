const mongoose = require('mongoose');

const RiwayatSchema = new mongoose.Schema({
  reservasiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservasi',
    required: true,
  },
  pasienId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  namaPasien: String,
  dokter: String,
  tanggal: String,
  diagnosa: String,
  tindakan: String,
  catatan: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('RiwayatKunjungan', RiwayatSchema);
