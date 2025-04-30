import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/User';

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'bbc5a81fe571f4d7a87c012fc92cb9ff5aa3db040078e8923d7d10b0fb83e169a1daf635998a6aed8476cafb984435c41bdf9e6a80f2e3f0a7248a56a3b14438f21ff0bfef98b9009857a810fd84737442c6504b9089703e9c452cee8836d62590bf70ee71fb78a4c01cdb4903cd4b983f41aee5feca8a782b4181c044bfa36b55deca2634a8620238f33c724c9a1419701015d38b579ba6260691a9bf259a5e59cd471af16b7074a31b48c4d3b03d77cbdefa16c1a31675b42b47e04614697ce137f2c25466e0871cdbf1366d4c94a91a822fcb6c4ec6d67e7caf5a295d130c0ee3521fa62ec9e56f190bbad6bbc940f35636d8630a800062413eb7ea02a284';
  private static readonly JWT_EXPIRES_IN = '24h';

  static generateToken(user: User): string {
    return jwt.sign(
      { 
        id: user.id,
        email: user.email 
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, this.JWT_SECRET);
  }
} 