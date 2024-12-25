import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

import corsMiddleware  from './middleware/corsMiddleware';
import limiter  from './middleware/rateLimiter';
import cookieParser from 'cookie-parser';
import handleError from './middleware/errorHandlerMiddleware';
import authRoutes from './routes/authRoutes';

//import productRoutes from './routes/productRoutes';
import homeRoutes from './routes/homeRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();
connectDB();

const app = express();

// === Middleware ===
app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());
app.use('/api/', limiter);

// Главная страница
app.get('/', (req: Request, res: Response) => {
  res.send('Сервер работает успешно!');
});

// === Статические файлы ===

// === Маршруты ===
app.use('/', homeRoutes);
//app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// === Обработка ошибок ===
app.use(handleError);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
