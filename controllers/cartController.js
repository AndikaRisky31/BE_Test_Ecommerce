import Cart from "../models/cart.js";
import PhotoProduct from "../models/photoproduct.js";
import Product from "../models/product.js";
import User from "../models/user.js";

// Tambahkan produk ke dalam keranjang
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const {productId, totalItem } = req.body;

    // Cek apakah produk dan user ada
    const product = await Product.findByPk(productId);
    const user = await User.findByPk(userId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cek apakah item sudah ada di keranjang
    let cartItem = await Cart.findOne({
      where: {
        idProduct: productId,
        idUser: userId,
      },
    });

    if (cartItem) {
      // Jika produk sudah ada di keranjang, tambahkan jumlah item
      cartItem.totalItem += totalItem;
      await cartItem.save();
    } else {
      // Jika produk belum ada, tambahkan produk ke keranjang
      cartItem = await Cart.create({
        idProduct: productId,
        idUser: userId,
        totalItem: totalItem,
      });
    }

    res.status(201).json({
      message: 'Product added to cart successfully',
      cartItem,
    });
  } catch (error) {
    console.error('Error adding product to cart:', error); // Log error details to the console
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message, // Include error message in the response
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace only in development
    });
  }
};

// Ambil keranjang berdasarkan id user
export const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    // Ambil item keranjang beserta produk dan foto produk
    const cartItems = await Cart.findAll({
      where: { idUser: userId },
      include: [
        {
          model: Product,
          include: [
            {
              model: PhotoProduct,
              as: 'photos',
              attributes: ['url'],
            }
          ],
        },
      ],
    });

    if (!cartItems.length) {
      return res.status(404).json({ message: 'Cart is empty or user not found' });
    }

    // Format data dan hitung total harga
    let totalPrice = 0;
    const formattedCartItems = cartItems.map(item => {
      const product = item.Product;
      const itemTotalPrice = product.price * item.totalItem;
      totalPrice += itemTotalPrice; // Akumulasi total harga

      return {
        itemTotalPrice, // Menambahkan total harga per item
        ...item.toJSON(), // Menggunakan toJSON() untuk mendapatkan representasi data plain
        Product: {
          ...product.toJSON(),
          photos: product.photos.map(photo => photo.url) // Mengubah photos menjadi array URL
        },
      };
    });

    res.json({
      message: 'Cart retrieved successfully',
      totalPrice, // Menambahkan total harga semua item di keranjang
      cartItems: formattedCartItems,
    });
  } catch (error) {
    console.error('Error fetching cart:', error); // Log error details to the console
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message, // Include error message in the response
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace only in development
    });
  }
};

// Hapus item dari keranjang berdasarkan ID
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Temukan item keranjang berdasarkan ID
    const item = await Cart.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Hapus item keranjang
    await item.destroy();

    res.json({
      message: 'Cart item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting cart item:', error); // Log error details to the console
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message, // Include error message in the response
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace only in development
    });
  }
};