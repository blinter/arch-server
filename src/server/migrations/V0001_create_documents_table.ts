import { Knex } from "knex";

exports.up = function (knex:Knex) {
    return knex.schema.createTable('documento', (table) => {
        table.increments('id').primary()
        table.text('body')
    })
};
exports.down = (knex: Knex) => {
    return knex.schema
        .dropTable("documento");
}