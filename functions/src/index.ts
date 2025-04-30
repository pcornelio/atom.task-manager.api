import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import routes from './infrastructure/routes/index';
import './infrastructure/config/firebase';

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use('/api', routes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[ERROR]', {
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    error: err.message,
    stack: err.stack
  });
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Cloud Functions
export const api = onRequest(app);
