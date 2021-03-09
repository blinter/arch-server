import knex, { Knex } from 'knex';

class InstanciaKNEX {
    instancia: Knex
    constructor() {
        console.log('Criando instância KNEX.')
        // this.instancia = knex({
        //     client: 'sqlite3',
        //     connection: {
        //         debug: true,
        //         filename: "./db/db.sqlite"
        //     },
        //     migrations: {
        //         tableName: 'knex_migrations',
        //         directory: `./src/server/migrations`
        //     }
        // })

        this.instancia = knex({
            client: 'postgresql',
            debug: false,
            connection: {
                database: 'elements',
                user: 'elements',
                password: 'elements',
                host: 'localhost',
                port: 5432
            },
            migrations: {
                tableName: 'knex_migrations',
                directory: `./src/server/migrations`
            }
        })

        this.instancia.migrate.latest();
    }

}

export default new InstanciaKNEX().instancia