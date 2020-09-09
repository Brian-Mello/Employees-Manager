import { Request, Response} from 'express';
import { v4 } from 'uuid';
import db from '../database/connection';

export default class EmployeesController {

    async employees(req: Request, res: Response) {
        try{
            
            const { orderBy, orderType } = req.query;

            let employeesWithDeletedPositionId: any[];
            let employeesWithPositionId: any[];

            if(orderBy && orderType){
                employeesWithDeletedPositionId = await db('employees')
                    .select('*')
                    .where('position_id', 'deleted')
                    .orderBy(orderBy as string, orderType as string)

                employeesWithPositionId = await db('employees')
                    .join(
                        'positions', 
                        'positions.id', 
                        'employees.position_id'
                    )
                    .select(
                        'employees.*', 
                        'positions.name as position_name', 
                        'positions.description'
                    )
                    .orderBy(orderBy as string, orderType as string);
            } else {
                employeesWithDeletedPositionId = await db('employees')
                    .select('*')
                    .where('position_id', 'deleted')

                 employeesWithPositionId = await db('employees')
                .join(
                    'positions', 
                    'positions.id', 
                    'employees.position_id'
                )
                .select(
                    'employees.*', 
                    'positions.name as position_name', 
                    'positions.description'
                );
            }

            if(employeesWithDeletedPositionId.length < 1){
                employeesWithDeletedPositionId = []
            }

            if(employeesWithPositionId.length < 1) {
                employeesWithPositionId = [];
            };       

            return res.status(200).json( {employeesWithDeletedPositionId, employeesWithPositionId} );
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    }

    async employeeData(req: Request, res: Response) {
        try{
            const { id } = req.params;

            let employee = await db('employees')
                .join(
                    'positions', 
                    'positions.id', 
                    'employees.position_id'
                )
                .select(
                    'employees.*', 
                    'positions.name as position_name', 
                    'positions.description'
                )
                .where('employees.id', id);
            
            if(employee.length === 0) {
                employee = []
            };       

            return res.status(200).json({ employee });
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    }

    async create(req: Request, res: Response) {
        try{
            const { name, lastname, birthdate, position_id, salary } = req.body;

            if(!name){
                throw new Error("Name must be provided!");
            } else if(!lastname){
                throw new Error("Description must be provided!");
            } else if(!birthdate){
                throw new Error("Birthdate must be provided!");
            } else if(!position_id){
                throw new Error("Position must be provided!");
            } else if(!salary){
                throw new Error("Salary must be provided!");
            };

            const positionIdSearch = await db('positions')
                .select('*')
                .where('id', position_id);
        
            if(positionIdSearch.length === 0){
                throw new Error("Position not found!");
            };

            await db('employees').insert({
                id: v4(),
                name,
                lastname,
                birthdate,
                position_id,
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
            const { name, lastname, birthdate, position_id, salary } = req.body;

            const employeeIdSearch = await db('employees')
                .select('*')
                .where('id', id);

            if(employeeIdSearch.length === 0){
                throw new Error("Employee not found!");
            };
            
            if( name && lastname && birthdate && position_id && salary ){
                const positionIdSearch = await db('positions')
                    .select('*')
                    .where('id', position_id);

                if(positionIdSearch.length === 0){
                    throw new Error("Position not found!");
                };

                await db('employees')
                    .update({ 
                        'name': name,
                        'lastname': lastname,
                        'birthdate': birthdate,
                        'position_id': position_id,
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

            } else if( position_id ){
                const positionIdSearch = await db('positions')
                    .select('*')
                    .where('id', position_id);

                if(positionIdSearch.length === 0){
                    throw new Error("Position not found!");
                };

                await db('employees')
                    .update( 'position_id', position_id )
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