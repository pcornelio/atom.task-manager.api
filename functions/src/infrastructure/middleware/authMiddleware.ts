import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { LoggerService } from '../services/LoggerService';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      LoggerService.warn('AuthMiddleware: No se proporcionó token de autorización');
      res.status(401).json({ error: 'No autorizado' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      LoggerService.warn('AuthMiddleware: Formato de token inválido');
      res.status(401).json({ error: 'Token inválido' });
      return;
    }

    const decoded = AuthService.verifyToken(token);
    
    if (!decoded || !decoded.id) {
      LoggerService.warn('AuthMiddleware: Token inválido o sin ID de usuario');
      res.status(401).json({ error: 'Token inválido' });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    LoggerService.error('AuthMiddleware: Error al verificar token', error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}; 