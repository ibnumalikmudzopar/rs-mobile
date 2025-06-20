require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // pindahkan ke atas

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Gunakan hanya ini
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/api/reservasi', require('./routes/reservasi'));
app.use('/api/jadwal', require('./routes/jadwal')); 
app.use('/api/riwayat', require('./routes/riwayatreservasi'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/riwayatkunjungan', require('./routes/riwayatkunjungan'));
app.use('/api/kunjungan', require('./routes/dokter'));
app.use('/api/kunjungan', require('./routes/kunjungan'));
app.use('/api/setup-admin', require('./routes/setupAdmin'));
app.use('/api/setup-dokter', require('./routes/setupDokter'));





// app.listen(process.env.PORT, () => { // Server Localhost 
//   console.log(`Server running on http://localhost:${process.env.PORT}`);
// });
app.listen(process.env.PORT, '0.0.0.0', () => { // Server IP Laptop
  console.log(`Server running on http://0.0.0.0:${process.env.PORT}`);
});




// reservasi

