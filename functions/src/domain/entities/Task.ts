export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
  userId: string;
}

export class TaskEntity implements Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
  userId: string;

  constructor(task: Partial<Task>) {
    this.id = task.id || '';
    this.title = task.title || '';
    this.description = task.description || '';
    this.createdAt = task.createdAt || new Date();
    this.completed = task.completed || false;
    this.userId = task.userId || '';
  }

  toJSON(): Task {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      completed: this.completed,
      userId: this.userId
    };
  }
} 