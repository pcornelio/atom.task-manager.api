import { TaskRepository } from '../../../domain/repositories/TaskRepository';

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    const existingTask = await this.taskRepository.findById(id);
    
    if (!existingTask) {
      throw new Error('Tarea no encontrada');
    }

    await this.taskRepository.delete(id);
  }
} 