import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.get(
  '/',
  (req, res, next) => new CarController(req, res, next).findAll(),
);

carRoutes.get(
  '/:id',
  (req, res, next) => new CarController(req, res, next).findById(),
);

carRoutes.post(
  '/',
  (req, res, next) => new CarController(req, res, next).create(),
);

carRoutes.put(
  '/:id',
  (req, res, next) => new CarController(req, res, next).update(),
);

export default carRoutes;