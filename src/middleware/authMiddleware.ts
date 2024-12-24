import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token is required' });
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string; role: string };

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } 
  
  catch (error) {
    // Обработка ошибки токена
    console.error('Auth error:', error instanceof Error ? error.message : error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;

