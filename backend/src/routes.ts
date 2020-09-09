import express from 'express';
import EmployeesController from './controllers/EmployeesController';
import PositionsController from './controllers/PositionsController';

const routes = express.Router();
const employeesController = new EmployeesController();
const positionsController = new PositionsController();

routes.get('/employees', employeesController.employees);
routes.get('/employees/:id', employeesController.employeeData);
routes.post('/employees', employeesController.create);
routes.post('/employees/update/:id', employeesController.update);
routes.delete('/employees/delete/:id', employeesController.delete);

routes.get('/positions', positionsController.positions);
routes.post('/positions', positionsController.create);
routes.post('/positions/update/:id', positionsController.update);
routes.delete('/positions/delete/:id', positionsController.delete);

export default routes;