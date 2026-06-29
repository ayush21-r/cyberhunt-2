import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import requestLogger from './middleware/logger';
import apiRouter from './routes';
import { notFoundHandler, globalErrorHandler } from './middleware/errors';

const app = express();

// Secure server response headers using Helmet
app.use(helmet());

// Configure Cross-Origin request rules
app.use(cors());

// Parse incoming request payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming request telemetry
app.use(requestLogger);

// Mount core API routing gateways
app.use('/api/v1', apiRouter);

// Fallback unmatched traffic 404 catcher
app.use(notFoundHandler);

// Centralized error capture middleware
app.use(globalErrorHandler);

export default app;
