import { Request, Response} from 'express';
import { v4 } from 'uuid';
import db from '../database/connection';

export default class EmployeesController {
    async employees(req: Request, res: Response) {
        try{
            
            let employeesWithDeletedRoleId = await db('employees')
                .select('*')
                .where('role_id', 'deleted')

            let employeesWithRoleId = await db('employees')
                .join(
                    'roles', 
                    'roles.id', 
                    'employees.role_id'
                )
                .select(
                    'employees.*', 
                    'roles.name as role_name', 
                    'roles.description'
                )

            if(employeesWithDeletedRoleId.length < 1){
                employeesWithDeletedRoleId = []
            }

            if(employeesWithRoleId.length < 1) {
                employeesWithRoleId = [];
            };       

            return res.status(200).json( {employeesWithDeletedRoleId, employeesWithRoleId} );
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    }

    async employeeData(req: Request, res: Response) {
        try{
            const { id } = req.params;

            let employees = await db('employees')
                .join(
                    'roles', 
                    'roles.id', 
                    'employees.role_id'
                )
                .select(
                    'employees.*', 
                    'roles.name as role_name', 
                    'roles.description', 
                    'roles.id as role_id'
                )
                .where('roles.id', id);
            
            if(employees.length === 0) {
                employees = []
            };       

            return res.status(200).json({ employees });
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    }

    async create(req: Request, res: Response) {
        try{
            const { name, lastname, birthdate, role_id, salary } = req.body;

            if(!name){
                throw new Error("Name must be provided!");
            } else if(!lastname){
                throw new Error("Description must be provided!");
            } else if(!birthdate){
                throw new Error("Birthdate must be provided!");
            } else if(!role_id){
                throw new Error("Role must be provided!");
            } else if(!salary){
                throw new Error("Salary must be provided!");
            };

            const roleIdSearch = await db('roles').select("*").where('id', role_id);

            if(roleIdSearch.length === 0){
                throw new Error("Role not found!");
            };

            await db('employees').insert({
                id: v4(),
                name,
                lastname,
                birthdate,
                role_id,
                salary
            })

            return res.status(201).send(`Employee '${name} ${lastname}' created sucessfully!`);
        } catch (error) {
            return res.status(400).send({
                error_message: error.message
            });
        };
    };

    async delete(req: Request, res: Response) {
        try{
            const { id } = req.params;

            const employeeIdSearch = await db('employees')
                .select('*')
                .where('id', id);

            if(employeeIdSearch.length === 0){
                throw new Error("Employee not found!");
            };

            await db('employees')
                .delete()
                .where({id}
            );

            res.status(200).send(`Employee '${employeeIdSearch.map(employee => employee.name)}' deleted successfully!`);
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            }); 
        };
    };
    async update(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const { name, lastname, birthdate, role_id, salary } = req.body;

            const employeeIdSearch = await db('employees')
                .select('*')
                .where('id', id);

            if(employeeIdSearch.length === 0){
                throw new Error("Employee not found!");
            };
            
            if( name && lastname && birthdate && role_id && salary ){
                const roleIdSearch = await db('roles')
                    .select('*')
                    .where('id', role_id);

                if(roleIdSearch.length === 0){
                    throw new Error("Role not found!");
                };

                await db('employees')
                    .update({ 
                        'name': name,
                        'lastname': lastname,
                        'birthdate': birthdate,
                        'role_id': role_id,
                        'salary': salary
                    })
                    .where({id});
            } else if( name ){
                await db('employees')
                    .update( 'name', name )
                    .where({id});
            } else if( lastname ){
                await db('employees')
                    .update( 'lastname', lastname )
                    .where({id});
            } else if( birthdate ){
                await db('employees')
                    .update( 'birthdate', birthdate )
                    .where({id});
            } else if( role_id ){
                const roleIdSearch = await db('roles')
                    .select('*')
                    .where('id', role_id);

                if(roleIdSearch.length === 0){
                    throw new Error("Role not found!");
                };

                await db('employees')
                    .update( 'role_id', role_id )
                    .where({id});
            } else if( salary ){
                await db('employees')
                    .update( 'salary', salary )
                    .where({id});
            }
            

            res.status(200).send(`Employee '${employeeIdSearch.map(employee => employee.name)}' updated successfully!`);
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    };
}