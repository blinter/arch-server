import { Knex } from "knex";

exports.up = function (knex: Knex) {
    return knex.schema.createTable('url', (table) => {
        table.increments('id').primary()
        table.string('url', 10000)
        table.string('status_processamento')
        table.text('detalhes_processamento')
        table.text('documento')
        table.timestamp('data_processamento', { precision: 2, useTz: false })

        table.unique(['url'])
    })
};
exports.down = (knex: Knex) => {
    return knex.schema
        .dropTable("url");
}