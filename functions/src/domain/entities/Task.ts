export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: TaskStatus;
  userId: string;
}

export class TaskEntity implements Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: TaskStatus;
  userId: string;

  constructor(task: Partial<Task>) {
    this.id = task.id || '';
    this.title = task.title || '';
    this.description = task.description || '';
    this.createdAt = task.createdAt || new Date();
    this.status = task.status || TaskStatus.PENDING;
    this.userId = task.userId || '';
  }

  toJSON(): Task {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      status: this.status,
      userId: this.userId
    };
  }
} 