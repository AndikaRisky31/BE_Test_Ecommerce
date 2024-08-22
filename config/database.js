import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Konfigurasi database menggunakan Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Set to true to enable SQL logging
});

try {
  // Cek koneksi ke database
  await sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
