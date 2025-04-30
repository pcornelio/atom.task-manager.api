import * as admin from 'firebase-admin';

try {
  admin.initializeApp();
} catch (error) {
  console.error('Error al inicializar Firebase Admin:', {
    error: error instanceof Error ? error.message : 'Error desconocido',
    stack: error instanceof Error ? error.stack : undefined
  });
  throw error;
}

export const db = admin.firestore();
