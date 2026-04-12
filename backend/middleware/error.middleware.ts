import type { Request, Response } from 'hyper-express';

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response
): void {
  console.error('Error:', error);

  const status = (error as any).status || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      message,
      status,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    },
  });
}
