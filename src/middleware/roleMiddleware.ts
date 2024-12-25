import { Request, Response, NextFunction } from 'express';

const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      console.error('Error: req.user is not defined. AuthMiddleware might not have been called.');
      res.status(401).json({ message: 'Authorization required' });
      return;
    }

    console.log('Checking user role:', req.user.role);

    if (!roles.includes(req.user.role)) {
      console.log('Access denied. User role:', req.user.role);
      res.status(403).json({ success: false, message: 'Access denied' });
      return;
    }

    next();
  };
};

export default roleMiddleware;
