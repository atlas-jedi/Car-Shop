import { ErrorRequestHandler } from 'express';

const httpErrorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
};

export default httpErrorMiddleware;