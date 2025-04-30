import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { db } from '../config/firebase';

export class FirestoreTaskRepository implements TaskRepository {
  private collection = db.collection('tasks');

  async findAll(userId: string): Promise<Task[]> {
    const snapshot = await this.collection.where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }

  async findById(id: string): Promise<Task | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Task;
  }

  async create(task: Task): Promise<Task> {
    const { id, ...taskData } = task;
    const docRef = await this.collection.add(taskData);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as Task;
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    const { id: _, ...taskData } = task;
    await this.collection.doc(id).update(taskData);
    const doc = await this.collection.doc(id).get();
    return { id: doc.id, ...doc.data() } as Task;
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
} 