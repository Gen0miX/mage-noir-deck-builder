import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Types extends BaseSchema {
  protected tableName = 'types'

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
