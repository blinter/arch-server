import express, { Request, Response } from 'express'
import LinkBusiness from '../business/LinkBusiness'
import Link from '../model/Link'

const router = express.Router()

export default class RotasURL {

    constructor() {
        router.get('/url/gerar-links', this.gerarLinks)
        router.get('/url/processar-links', this.processarLinks)
    }

    async gerarLinks(req: Request, res: Response) {
        console.log("Gerando links....")
        res.status(200).send('ok')
        new LinkBusiness().gerarLinks()
    }

    async processarLinks(req: Request, res: Response) {
        console.log("Processando links...")
        res.status(200).send('ok')
        new LinkBusiness().processasrLinks()
    }

    router() {
        return router
    }

}