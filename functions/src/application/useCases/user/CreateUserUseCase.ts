import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserEntity } from '../../../domain/entities/User';
import { PasswordService } from '../../../infrastructure/services/PasswordService';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email || '');
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    if (!userData.password) {
      throw new Error('La contraseña es requerida');
    }

    const hashedPassword = await PasswordService.hashPassword(userData.password);
    
    const user = new UserEntity({
      ...userData,
      password: hashedPassword
    });

    return this.userRepository.create(user);
  }
} 