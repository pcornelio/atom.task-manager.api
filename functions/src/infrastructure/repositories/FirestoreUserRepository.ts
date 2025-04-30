import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { db } from '../config/firebase';

export class FirestoreUserRepository implements UserRepository {
  private collection = db.collection('users');

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection.where('email', '==', email).get();
    
    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async create(user: User): Promise<User> {
    const { id, ...userData } = user;
    const docRef = await this.collection.add(userData);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as User;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as User;
  }
} 