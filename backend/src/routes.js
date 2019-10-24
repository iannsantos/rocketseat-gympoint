import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

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

routes.post(
  '/students/:student_id/checkins',
  authMiddleware,
  CheckinController.store
);

routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

routes.get('/help-orders', authMiddleware, AnswerController.index);
routes.post(
  '/help-orders/:help_order_id/answer',
  authMiddleware,
  AnswerController.store
);

export default routes;
