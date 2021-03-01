import express, { Request, Response } from 'express'

const router = express.Router()

export default class RotasExemplo {

    constructor() {
        router.get('/teste', this.teste)
    }

    teste(req: Request, res: Response) {
        res.status(200).send('RotasExemplo.get')
    }

    router() {
        return router
    }

}