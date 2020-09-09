import { Request, Response } from "express";
import db from "../database/connection";
import { v4 } from "uuid";

export default class RolesController {
    async roles(req: Request, res: Response) {
        try{
            const roles = await db('roles')
                .select('*');
            
            if(!roles) {
                return [];
            };       

            return res.status(200).json({ roles });
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    };

    async create(req: Request, res: Response) {
        try{
            const { name, description } = req.body;

            if(!name){
                throw new Error("Name must be provided!");
            } else if(!description){
                throw new Error("Description must be provided!");
            };

            const roleNameSearch = await db('roles')
                .select("*")
                .where('name', name);

            if(roleNameSearch.length > 0){
                throw new Error("Existing role!");
            };

            await db('roles').insert({
                id: v4(),
                name,
                description
            });

            res.status(201).send(`Role '${name}' created successfully!`);
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    };

    async delete(req: Request, res: Response) {
        try{
            const { id } = req.params;

            const roleIdSearch = await db('roles')
                .select('*')
                .where('id', id
            );

            if(roleIdSearch.length === 0){
                throw new Error("Role not found!");
            };

            console.log(id)
            await db('employees')
            .update(
                'role_id', 'deleted'
            )
            .where("role_id", id);

            await db('roles')
                .delete()
                .where({id});

            res.status(200).send(`Role '${roleIdSearch.map(role => role.name)}' deleted successfully!`);
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            }); 
        };
    };

    async update(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const { name, description } = req.body;

            const roleIdSearch = await db('roles')
                .select('*')
                .where('id', id);

            if(roleIdSearch.length === 0){
                throw new Error("Role not found!");
            };

            if(name){

                const roleNameSearch = await db('roles')
                    .select("*")
                    .where('name', name);

                if(roleNameSearch.length > 0){
                    throw new Error("Existing role name!");
                };

                await db('roles')
                    .update('name', name)
                    .where({id});
            } else if ( description ) {
                await db('roles')
                    .update('description', description)
                    .where({id});
            }

            res.status(200).send(`Role '${roleIdSearch.map(role => role.name)}' updated successfully!`);
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    };
};