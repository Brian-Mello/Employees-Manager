import { Request, Response } from "express";
import db from "../database/connection";
import { v4 } from "uuid";

export default class positionsController {
    async positions(req: Request, res: Response) {
        try{
            const { orderBy, orderType} = req.query;

            let positions;

            if(orderBy && orderType) {
                positions = await db('positions')
                    .select('*')
                    .orderBy(orderBy as string, orderType as string);
            
                if(!positions) {
                    return [];
                };
            } else {
                positions = await db('positions')
                    .select('*');
            
                if(!positions) {
                    return [];
                }; 
            };

            return res.status(200).json({ positions });
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

            const positionNameSearch = await db('positions')
                .select("*")
                .where('name', name);

            if(positionNameSearch.length > 0){
                throw new Error("Existing position!");
            };

            await db('positions').insert({
                id: v4(),
                name,
                description
            });

            res.status(201).send(`Position '${name}' created successfully!`);
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    };

    async delete(req: Request, res: Response) {
        try{
            const { id } = req.params;

            const positionIdSearch = await db('positions')
                .select('*')
                .where('id', id
            );

            if(positionIdSearch.length === 0){
                throw new Error("Position not found!");
            };

            await db('employees')
            .update(
                'position_id', 'deleted'
            )
            .where("position_id", id);

            await db('positions')
                .delete()
                .where({id});

            res.status(200).send(`Position '${positionIdSearch.map(position => position.name)}' deleted successfully!`);
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

            const positionIdSearch = await db('positions')
                .select('*')
                .where('id', id);

            if(positionIdSearch.length === 0){
                throw new Error("Position not found!");
            };

            if(name){

                const positionNameSearch = await db('positions')
                    .select("*")
                    .where('name', name);

                if(positionNameSearch.length > 0){
                    throw new Error("Existing position name!");
                };

                await db('positions')
                    .update('name', name)
                    .where({id});
            } else if ( description ) {
                await db('positions')
                    .update('description', description)
                    .where({id});
            }

            res.status(200).send(`Position '${positionIdSearch.map(position => position.name)}' updated successfully!`);
        } catch(error) {
            res.status(400).send({
                error_message: error.message
            });
        };
    };
};