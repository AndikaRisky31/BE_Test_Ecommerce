import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Registrasi pengguna baru
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Cek apakah pengguna sudah ada
    const existingUser = await User.findOne({ where: { name: username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const user = await User.create({
      name: username,
      password: hashedPassword,
    });

    res.status(201).json({ id: user.id, name: user.name });
  } catch (error) {
    console.error('Registration error:', error); // Log error details
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message, // Include error message in the response
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace only in development
    });
  }
};

// Login pengguna
export const login = async (req, res) => {
  try {
    const { username: name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Username and password are required',
      });
    }

    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid username or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid username or password',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await user.update({ jwtToken: token });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error); // Log error details to the server console
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred during login',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined, // Provide detailed error message in development
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Provide stack trace only in development
    });
  }
};