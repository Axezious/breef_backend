import { Application, Request, Response, NextFunction } from 'express';
import { FoodController } from "../controllers/foodControllers";
import * as multer from 'multer';
import { insufficientParameters, mongoError, successResponse, failureResponse, createdResponse } from '../modules/common/services';
import { Foodies } from '../modules/food/model';
import FoodServices from '../modules/food/services';


interface MulterRequest extends Request {
   file: any;
}

const storages = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads/')
   },

   filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname)
   }
});
const fileFilter = (req: any, file: any, cb: any) => {
   if (file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png") {

      cb(null, true);
   } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
   }
}

const upload = multer({ storage: storages, fileFilter: fileFilter });


export class Routes {

   private food_controller: FoodController = new FoodController();
   private food_services: FoodServices = new FoodServices();

   public route(app: Application) {

      app.get('/api/test', (req: Request, res: Response) => {
         res.status(200).json({
            pesan: "Get request berhasil",
            status: "200 - OK"
         });
      });

      app.post('/api/test', (req: Request, res: Response) => {
         res.status(200).json({
            pesan: "Post request berhasil"
         });
      });

      app.post('/api/food/create', upload.single('picture'), async (req: Request, res: Response) => {
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
      });

      app.get('/api/food/show', (req: Request, res: Response) => {
         this.food_services.showFood((err: any, user_data: Foodies) => {
            
            if (err) {
               mongoError(err, res);
            } else {
               
               createdResponse('Get Data Successfull', user_data, res);
            }
         });
      });
   }
}