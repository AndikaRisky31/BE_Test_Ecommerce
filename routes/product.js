import express from 'express';
import { getCategories, getProducts } from '../controllers/productController.js';

const router = express.Router();

// Endpoint untuk mengambil produk dengan pagination dan filter kategori
router.get('/', getProducts);
router.get('/categories',getCategories)


export default router;
