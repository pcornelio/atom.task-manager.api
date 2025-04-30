import { UserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../domain/entities/User';
import { AuthService } from '../../../infrastructure/services/AuthService';
import { PasswordService } from '../../../infrastructure/services/PasswordService';

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar la contraseña
    const isValidPassword = await PasswordService.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }

    const token = AuthService.generateToken(user);
    return { user, token };
  }
} 