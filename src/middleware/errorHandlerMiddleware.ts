import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (
  err: { status?: number; message?: string; stack?: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandlerMiddleware