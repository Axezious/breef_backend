import {Foodies } from './model';
import foods from './schema';

export default class FoodsService {
    
    public createFood(food_params: Foodies , callback: any) {
        const _session = new foods(food_params);
        _session.save(callback);
    }

    public filterFood(query: any, callback: any) {
        foods.findOne(query, callback);
    }

    public showFood(callback : any) {
        foods.find({}, callback)
    }

    public updateFood(food_params: Foodies, callback: any) {
        const query = { _id: food_params._id };
        foods.findOneAndUpdate(query, food_params, callback);
    }
    
    public deleteFood(_id: String, callback: any) {
        const query = { _id: _id };
        foods.deleteOne(query, callback);
    }

}