import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Elements extends BaseSchema {
  protected tableName = 'elements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
