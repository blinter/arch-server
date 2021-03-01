import bodyParser from 'body-parser';
import express, { Application } from 'express';
import RotasCadastro from './rotas/RotasCadastro';
import RotasExemplo from "./rotas/RotasExemplo";

const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(new RotasExemplo().router())
app.use(new RotasCadastro().router())


app.listen(4500, () => {
    console.log(`⚡Servidor iniciado.`);
});