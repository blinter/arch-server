import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator';

const router = express.Router()

export default class RotasExemplo {

    constructor() {
        router.post('/cadastro',
            body('email')
                .isEmail()
                .withMessage('Email inválido'),
            body('senha')
                .isLength({ min: 5 })
                .withMessage('Senha inválida - senha deve ter no mínimo 5 caracteres.')
                .isLength({ max: 10 })
                .withMessage('Senha inválida - senha deve ter no máximo 10 caracteres.'), this.cadastro)
    }

    cadastro(req: Request, res: Response) {
        let body = req.body
        console.log(body)

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            res.status(200).send('Cadastro feito!')
        }
    }

    router() {
        return router
    }

}