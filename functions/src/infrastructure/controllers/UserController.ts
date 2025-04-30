import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/useCases/user/CreateUserUseCase';
import { LoginUserUseCase } from '../../application/useCases/user/LoginUserUseCase';
import { FirestoreUserRepository } from '../repositories/FirestoreUserRepository';
import { LoggerService } from '../services/LoggerService';

export class UserController {
  private createUserUseCase: CreateUserUseCase;
  private loginUserUseCase: LoginUserUseCase;

  constructor() {
    const userRepository = new FirestoreUserRepository();
    this.createUserUseCase = new CreateUserUseCase(userRepository);
    this.loginUserUseCase = new LoginUserUseCase(userRepository);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error && error.message === 'El email ya está registrado') {
        res.status(409).json({ error: error.message });
        return;
      }
      if (error instanceof Error && error.message === 'La contraseña es requerida') {
        res.status(400).json({ error: error.message });
        return;
      }
      LoggerService.error('UserController: Error al crear usuario', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email y contraseña son requeridos' });
        return;
      }
      const result = await this.loginUserUseCase.execute(email, password);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && (error.message === 'Usuario no encontrado' || error.message === 'Contraseña incorrecta')) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }
      LoggerService.error('UserController: Error en login', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
} 