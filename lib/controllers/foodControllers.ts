
import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse, createdResponse } from '../modules/common/services';
import { Foodies } from '../modules/food/model';
import FoodServices from '../modules/food/services';
import e = require('express');

export class FoodController {

    private food_services: FoodServices = new FoodServices();

    public create_food(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.name && req.body.description && req.body.picture && req.file) {
            const food_params: Foodies = {
                name: req.body.name,
                description: req.body.description,
                picture: req.file,
                modification_notes: [{
                    modified_on: new Date(Date.now())
                }]
            };
            this.food_services.createFood(food_params, (err: any, user_data: Foodies) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    createdResponse('create user successfull', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}