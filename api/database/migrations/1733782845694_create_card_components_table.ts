import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CardComponents extends BaseSchema {
  protected tableName = 'card_components'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('card_id').unsigned().references('id').inTable('cards').onDelete('CASCADE')
      table
        .integer('component_id')
        .unsigned()
        .references('id')
        .inTable('components')
        .onDelete('CASCADE')
      table.integer('quantity').notNullable()

      table.unique(['card_id', 'component_id']) // Empêche les doublons
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
