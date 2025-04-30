import { Task } from '../../../domain/entities/Task';
import { TaskRepository } from '../../../domain/repositories/TaskRepository';
import { TaskEntity } from '../../../domain/entities/Task';

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskData: Partial<Task>): Promise<Task> {
    const task = new TaskEntity(taskData);
    const result = await this.taskRepository.create(task);
    return result;
  }
} 