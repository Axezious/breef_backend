import { Application, Request, Response } from "express";

export class NotFoundRoutes {

    public routes (app : Application) {

        app.all('*', function (req : Request, res : Response) {
            res.status(404).send({
                pesan : "URL Tidak ditemukan"
            })
        })
    }
}