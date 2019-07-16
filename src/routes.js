import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import UserLevelController from './app/controllers/UserLevelController';
import SchedulerController from './app/controllers/SchedulerController';
// import ProviderController from './app/controllers/ProviderController';
// import AppointmentController from './app/controllers/AppointmentController';
// import ScheduleController from './app/controllers/ScheduleController';
// import AvailableController from './app/controllers/AvailableController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

// User level route change, only user_level > 3 can change something here
routes.post('/userLevel', UserLevelController.store);
routes.get('/userLevel', UserLevelController.index);
routes.put('/userLevel/:id', UserLevelController.update);
routes.delete('/userLevel/:id', UserLevelController.delete);

routes.get('/scheduler', SchedulerController.index);
routes.post('/scheduler', SchedulerController.store);

// routes.get('/providers', ProviderController.index);
// routes.get('/providers/:providerId/available', AvailableController.index);

// routes.get('/appointments', AppointmentController.index);
// routes.post('/appointments', AppointmentController.store);
// routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/scheduler', SchedulerController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
