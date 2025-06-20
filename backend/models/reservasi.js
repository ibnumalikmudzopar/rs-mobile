const mongoose = require('mongoose');

const ReservasiSchema = new mongoose.Schema({
  pasienId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  namaPasien: {
    type: String,
    required: true,
  },
  dokter: {
    type: String,
    required: true,
  },
  tanggal: {
    type: String,
    required: true,
  },
  keluhan: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Menunggu Konfirmasi',
  },
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
  timestamps: true
}); 

module.exports = mongoose.model('Reservasi', ReservasiSchema);
