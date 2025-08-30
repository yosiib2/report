import jwt from 'jsonwebtoken';
import Director from '../models/Director.js';

export const protectDirector = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find director in DB
      const director = await Director.findById(decoded.id);
      if (!director) {
        return res.status(401).json({ message: 'Director not found' });
      }

      // Attach full director object to req
      req.director = director;
      next();
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};
