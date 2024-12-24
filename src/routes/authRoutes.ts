import { Router, RequestHandler } from 'express';
import {
  login,
  logout,
  sendVerificationCode,
  refreshToken,
} from '../controllers/authController';

const router = Router();

// Явное приведение к типу RequestHandler
router.post('/send-code', sendVerificationCode);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;
