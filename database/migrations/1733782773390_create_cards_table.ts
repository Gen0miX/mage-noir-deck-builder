import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Cards extends BaseSchema {
  protected tableName = 'cards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table
        .integer('element_id')
        .unsigned()
        .references('id')
        .inTable('elements')
        .onDelete('CASCADE')
      table.integer('type_id').unsigned().references('id').inTable('types').onDelete('CASCADE')
      table.integer('hp').notNullable()
      table.text('description').nullable()
      table.string('image_url').nullable()
      table
        .integer('illustrator_id')
        .unsigned()
        .references('id')
        .inTable('illustrators')
        .onDelete('CASCADE')
      table
        .integer('extension_id')
        .unsigned()
        .references('id')
        .inTable('extensions')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
