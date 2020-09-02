import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "../routes/routes";
import { NotFoundRoutes } from "../routes/not-found-routes";
import * as mongoose from "mongoose";
import env from "../environment";
import environment from "../environment";
import * as cors from "cors";

class App {

    public app: express.Application
    routes: Routes = new Routes()
    notFound: NotFoundRoutes = new NotFoundRoutes()
    public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();


    constructor() {
        this.app = express()
        this.config()
        this.mongoSetup()
        this.routes.route(this.app)
        this.notFound.routes(this.app)

    }

    private config(): void {
        let allowCrossDomain = function(req, res, next)
        {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Headers', "*");
            next();
        }
        this.app.use(allowCrossDomain)
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(() => console.log('MongoDB Connected...'))
            .catch((err) => console.log(err))
    }
}

export default new App().app;