import cors from 'cors';

const allowedOrigins = [
  'https://trusteddomain.com',
  'https://anothertrusteddomain.com',
  'http://localhost:6000',
  'http://localhost:5000',
  'http://localhost:3000',
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
      callback(new Error('Not allowed by CORS')); 
    }
  },
  credentials: true, 
};

export default cors(corsOptions);
