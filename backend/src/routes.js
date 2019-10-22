import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.post('/students', authMiddleware, StudentController.store);
routes.put('/students', authMiddleware, StudentController.update);

routes.post('/plans', authMiddleware, PlanController.store);
routes.get('/plans', authMiddleware, PlanController.index);

export default routes;
