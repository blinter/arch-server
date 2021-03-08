exports.up = function (knex) {
    return knex.schema.createTable('documentos', (table) => {
        table.increments('id').primary()
        table.text('body', 30)
    })
};
exports.down = knex => { }