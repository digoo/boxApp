import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import UserLevelController from './app/controllers/UserLevelController';
import SchedulerController from './app/controllers/SchedulerController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
// import AppointmentController from './app/controllers/AppointmentController';
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

// Route to create schedule exercises, index, store, update, delete user_level > 2 can update it
// update and delete are not yet coded to perform correct results, do not include it until these fixes
routes.get('/scheduler', SchedulerController.index);
routes.post('/scheduler', SchedulerController.store);
// routes.put('/scheduler/:id', SchedulerController.update);
// routes.delete('/scheduler/:id', SchedulerController.delete);

routes.get('/providers', ProviderController.index);
// routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/schedule', ScheduleController.index);

// routes.get('/appointments', AppointmentController.index);
// routes.post('/appointments', AppointmentController.store);
// routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
