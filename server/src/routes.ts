import express from 'express';
import EmployeesController from './controllers/EmployeesController';
import RolesController from './controllers/RolesController';

const routes = express.Router();
const employeesController = new EmployeesController();
const rolesController = new RolesController();

routes.get('/employees', employeesController.employees);
routes.get('/employees/:id', employeesController.employeeData);
routes.post('/employees', employeesController.create);
routes.post('/employees/update/:id', employeesController.update);
routes.delete('/employees/delete/:id', employeesController.delete);

routes.get('/roles', rolesController.roles);
routes.post('/roles', rolesController.create);
routes.post('/roles/update/:id', rolesController.update);
routes.delete('/roles/delete/:id', rolesController.delete);

export default routes;