import { TaskRepository } from '../../../domain/repositories/TaskRepository';
import { TaskStatus } from '../../../domain/entities/Task';
import { Task } from '../../../domain/entities/Task';

export class UpdateTaskStatusUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string, status: TaskStatus, userId: string): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);
    
    if (!task) {
      throw new Error('Task not found');
    }

    if (task.userId !== userId) {
      throw new Error('Unauthorized: Task does not belong to user');
    }

    const updatedTask = await this.taskRepository.update(taskId, { status });
    return updatedTask;
  }
} 