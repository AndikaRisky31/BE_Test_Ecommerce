import express from 'express';
import { addToCart, deleteCartItem, getCartByUserId } from '../controllers/cartController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, addToCart);
router.get('/', authenticateToken, getCartByUserId);
router.delete('/:id',authenticateToken, deleteCartItem);

export default router;
