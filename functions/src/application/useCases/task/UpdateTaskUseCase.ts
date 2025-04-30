import { TaskRepository } from '../../../domain/repositories/TaskRepository';
import { Task } from '../../../domain/entities/Task';

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string, taskData: Partial<Task>): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);
    
    if (!existingTask) {
      throw new Error('Tarea no encontrada');
    }

    return this.taskRepository.update(id, taskData);
  }
} 