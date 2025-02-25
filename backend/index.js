const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8080'
}));
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch((err) => console.error('MongoDB bağlantı hatası:', err));

app.get('/', (req, res) => {
    res.send('Backend Çalışıyor!');
});

const ilIlceRoutes = require('./routes/api/form_routes/il_ilce_Routes');
app.use('/api', ilIlceRoutes);

 const userRoutes = require('./routes/api/form_routes/userRoutes'); 
 app.use('/api/users', userRoutes);

const animeRoutes = require('./routes/api/anime_routes/animeRoutes'); 
app.use('/api/animes', animeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});