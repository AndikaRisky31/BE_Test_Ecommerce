import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Adjust the import path based on your project structure

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists in the database
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.sendStatus(403); // Forbidden: User not found
    }

    req.user = user; // Save user information to req object
    next();
  } catch (err) {
    console.error('Error verifying token:', err); // Log error details to the console
    res.sendStatus(403); // Forbidden
  }
};