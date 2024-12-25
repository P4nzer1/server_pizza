import cors from 'cors';

const corsMiddleware = cors({
  origin: '*', // Разрешает доступ со всех доменов. Для большей безопасности замените на конкретный домен (например, http://localhost:3000).
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Разрешенные методы.
  allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки.
  credentials: true, // Если нужны куки или авторизация.
});

export default corsMiddleware;

