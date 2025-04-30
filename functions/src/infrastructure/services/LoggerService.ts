import * as functions from 'firebase-functions';

export class LoggerService {
  static info(message: string, data?: any): void {
    functions.logger.info(message, data || {});
  }

  static error(message: string, error?: any): void {
    functions.logger.error(message, {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    });
  }

  static warn(message: string, data?: any): void {
    functions.logger.warn(message, data || {});
  }

  static debug(message: string, data?: any): void {
    functions.logger.debug(message, data || {});
  }
} 