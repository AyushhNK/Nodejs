import express from 'express';
import { createTask, getTasks } from '../controllers/task.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getTasks);

export default router;