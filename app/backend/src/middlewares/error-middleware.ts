import { ErrorRequestHandler } from 'express';
// nos middlewares de erro eu chamo o status code do erro ou um erro genérico
const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.statusCode) { // < ----- todas as nossas classes personalizadas tem esse statusCode
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};

export default errorMiddleware;
