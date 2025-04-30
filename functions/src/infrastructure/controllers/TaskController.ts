import { Request, Response } from 'express';
import { CreateTaskUseCase } from '../../application/useCases/task/CreateTaskUseCase';
import { GetTasksUseCase } from '../../application/useCases/task/GetTasksUseCase';
import { UpdateTaskUseCase } from '../../application/useCases/task/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../../application/useCases/task/DeleteTaskUseCase';
import { FirestoreTaskRepository } from '../repositories/FirestoreTaskRepository';
import { LoggerService } from '../services/LoggerService';

export class TaskController {
  private createTaskUseCase: CreateTaskUseCase;
  private getTasksUseCase: GetTasksUseCase;
  private updateTaskUseCase: UpdateTaskUseCase;
  private deleteTaskUseCase: DeleteTaskUseCase;

  constructor() {
    const taskRepository = new FirestoreTaskRepository();
    this.createTaskUseCase = new CreateTaskUseCase(taskRepository);
    this.getTasksUseCase = new GetTasksUseCase(taskRepository);
    this.updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    this.deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'No autorizado' });
        return;
      }

      const task = await this.createTaskUseCase.execute({
        ...req.body,
        userId: req.user.id
      });
      res.status(201).json(task);
    } catch (error) {
      LoggerService.error('TaskController: Error al crear tarea', error);
      res.status(500).json({ error: 'Error creating task' });
    }
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'No autorizado' });
        return;
      }

      const tasks = await this.getTasksUseCase.execute(req.user.id);
      res.status(200).json(tasks);
    } catch (error) {
      LoggerService.error('TaskController: Error al obtener tareas', error);
      res.status(500).json({ error: 'Error getting tasks' });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'No autorizado' });
        return;
      }

      const task = await this.updateTaskUseCase.execute(req.params.id, req.body);
      res.status(200).json(task);
    } catch (error) {
      LoggerService.error('TaskController: Error al actualizar tarea', error);
      res.status(500).json({ error: 'Error updating task' });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'No autorizado' });
        return;
      }

      await this.deleteTaskUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      LoggerService.error('TaskController: Error al eliminar tarea', error);
      res.status(500).json({ error: 'Error deleting task' });
    }
  }
} 