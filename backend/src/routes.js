import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.post('/students', authMiddleware, StudentController.store);
routes.put('/students', authMiddleware, StudentController.update);

routes.post('/plans', authMiddleware, PlanController.store);
routes.get('/plans', authMiddleware, PlanController.index);
routes.put('/plans/:id', authMiddleware, PlanController.update);
routes.delete('/plans/:id', authMiddleware, PlanController.delete);

routes.get('/registrations', authMiddleware, RegistrationController.index);
routes.post('/registrations', authMiddleware, RegistrationController.store);
routes.put('/registrations/:id', authMiddleware, RegistrationController.update);
routes.delete(
  '/registrations/:id',
  authMiddleware,
  RegistrationController.delete
);

export default routes;
