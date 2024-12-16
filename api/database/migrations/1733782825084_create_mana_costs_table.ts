import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ManaCost extends BaseSchema {
  protected tableName = 'mana_cost'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('card_id').unsigned().references('id').inTable('cards').onDelete('CASCADE')
      table
        .integer('element_id')
        .unsigned()
        .references('id')
        .inTable('elements')
        .onDelete('CASCADE')
      table.integer('quantity').notNullable()

      table.unique(['card_id', 'element_id']) // Empêche les doublons
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
