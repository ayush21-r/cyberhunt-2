import { Request, Response, NextFunction } from 'express';

/**
 * Capture unmatched requests and route them to 404 handler response.
 */
export const notFoundHandler = (req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({
    success: false,
    error: 'NOT_FOUND',
    message: `Secure route path "${req.originalUrl}" not found on this server.`,
  });
};

/**
 * Centralized exception capture boundary. Prevents sensitive stack traces leakages in production.
 */
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.status || err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  console.error(`[SEC_NET_ERROR] ${req.method} ${req.url} - Failure:`, err.message || err);

  res.status(statusCode).json({
    success: false,
    error: err.name || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'An operational system failure occurred.',
    stack: isProd ? undefined : err.stack,
  });
};
