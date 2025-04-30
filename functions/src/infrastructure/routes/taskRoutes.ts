import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const taskController = new TaskController();

router.use(authMiddleware);

router.post('/', taskController.createTask.bind(taskController));
router.get('/', taskController.getTasks.bind(taskController));
router.put('/:id', taskController.updateTask.bind(taskController));
router.delete('/:id', taskController.deleteTask.bind(taskController));

export default router; 