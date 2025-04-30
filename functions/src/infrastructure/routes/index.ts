import { Router } from 'express';
import taskRoutes from './taskRoutes';
import userRoutes from './userRoutes';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use('/users', userRoutes);
router.use('/tasks', authMiddleware, taskRoutes);

export default router; 