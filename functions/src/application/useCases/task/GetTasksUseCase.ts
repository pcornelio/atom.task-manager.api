import { Task } from '../../../domain/entities/Task';
import { TaskRepository } from '../../../domain/repositories/TaskRepository';

export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string): Promise<Task[]> {
    return this.taskRepository.findAll(userId);
  }
} 