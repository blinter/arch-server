import express, { Request, Response } from 'express'
import knex from 'knex'

const router = express.Router()

export default class RotasDocument {

    constructor() {
        router.post('/document', this.post)
    }

    async post(req: Request, res: Response) {
        let db = knex({
            client: 'sqlite3',
            connection: {
                debug: true,
                filename: "./db/db.sqlite"
            },
            migrations: {
                tableName: 'knex_migrations',
                directory: `./src/server/migrations`
            }
        })

        db('documentos').insert({
            body: req.body.body
        }).then((r) => {
            console.log(r)
        }).catch((erro) => {
            console.log(erro)
        })
        res.status(200).send('ok')
    }

    router() {
        return router
    }

}