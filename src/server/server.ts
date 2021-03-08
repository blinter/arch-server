import bodyParser from 'body-parser';
import cors from 'cors'
import knex from 'knex'
import express, { Application } from 'express';
import RotasCadastro from './rotas/RotasCadastro';
import RotasDocument from './rotas/RotasDocument';
import RotasExemplo from "./rotas/RotasExemplo";


const app: Application = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(new RotasDocument().router())
app.use(new RotasExemplo().router())
app.use(new RotasCadastro().router())

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

db.migrate.latest();

app.listen(4500, () => {
    console.log(`⚡Servidor iniciado.`);
});