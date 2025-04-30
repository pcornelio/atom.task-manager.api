export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export class UserEntity implements User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;

  constructor(user: Partial<User>) {
    this.id = user.id || '';
    this.email = user.email || '';
    this.name = user.name || '';
    this.password = user.password || '';
    this.createdAt = user.createdAt || new Date();
  }

  toJSON(): User {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      createdAt: this.createdAt
    };
  }
} 