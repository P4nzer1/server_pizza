import { Router } from 'express';
import { performAdminAction } from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = Router();

// Маршрут для выполнения действия администратора
router.post('/admin-action', authMiddleware, roleMiddleware(['admin']), performAdminAction);

export default router;
