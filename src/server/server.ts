import bodyParser from 'body-parser';
import cors from 'cors'
import knex from 'knex'
import express, { Application } from 'express';
import RotasCadastro from './rotas/RotasCadastro';
import RotasDocument from './rotas/RotasDocumento';
import RotasExemplo from "./rotas/RotasExemplo";
import RotasURL from './rotas/RotasURL';


const app: Application = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(new RotasDocument().router())
app.use(new RotasExemplo().router())
app.use(new RotasCadastro().router())
app.use(new RotasURL().router())

app.listen(4500, () => {
    console.log(`⚡Servidor iniciado.`);
});