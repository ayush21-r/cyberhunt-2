import morgan from 'morgan';
import { Request, Response } from 'express';

// Professional custom request logger formatting console prints
export const requestLogger = morgan((tokens, req: Request, res: Response) => {
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const status = tokens.status(req, res);
  const responseTime = tokens['response-time'](req, res);

  return `[SEC_NET_LOG] ${method} ${url} - STATUS: ${status} - TIME: ${responseTime}ms`;
});

export default requestLogger;
