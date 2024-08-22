import Product from "../models/product.js";
import PhotoProduct from "../models/photoproduct.js";
import sequelize from "../config/database.js";

// Fetch products with pagination and category filter
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (category) {
      where.category = category;
    }

    // Fetch products count for total products
    const totalProducts = await Product.count({
      where,
    });

    // Fetch products with pagination
    const products = await Product.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: PhotoProduct,
          as: 'photos',
          attributes: ['url'],
        }
      ],
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      totalPages,
      currentPage: parseInt(page),
      totalProducts, // This should now correctly reflect the total number of products
      products: products.map(product => ({
        ...product.toJSON(),
        photos: product.photos.map(photo => photo.url),
      })),
    });
  } catch (error) {
    console.error('Error fetching products:', error); // Log error details to the console
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message, // Include error message in the response
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace only in development
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    // Mengambil kategori unik dari tabel Product
    const categories = await Product.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
    });

    // Mengubah hasil ke format array
    const categoryList = categories.map(c => c.category);

    res.json({
      message: 'Categories retrieved successfully',
      categories: categoryList,
    });
  } catch (error) {
    console.error('Error fetching categories:', error); // Log error details to the console
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message, // Include error message in the response
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace only in development
    });
  }
};