import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import productRoutes from './routes/product.js';
import sequelize from './config/database.js';

dotenv.config();

const app = express();
app.use(express.json());

// Konfigurasi CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Gunakan rute
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/product',productRoutes)


// Endpoint home
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API berhasil' });
  });

// Sinkronisasi database dan mulai server
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

startServer();
