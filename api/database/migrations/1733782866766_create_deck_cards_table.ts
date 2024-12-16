import { BaseSchema } from '@adonisjs/lucid/schema'

export default class DeckCards extends BaseSchema {
  protected tableName = 'deck_cards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('deck_id').unsigned().references('id').inTable('decks').onDelete('CASCADE')
      table.integer('card_id').unsigned().references('id').inTable('cards').onDelete('CASCADE')
      table.integer('quantity').notNullable()

      table.unique(['deck_id', 'card_id']) // Empêche les doublons
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
