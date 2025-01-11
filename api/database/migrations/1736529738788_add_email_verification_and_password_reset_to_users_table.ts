import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('users', (table) => {
      table.boolean('is_email_verified').defaultTo(false)
      table.string('email_verification_token').nullable()
      table.timestamp('email_verification_sent_at').nullable()
      table.string('password_reset_token').nullable()
      table.timestamp('token_created_at').nullable()
    })
  }

  public async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('is_email_verified')
      table.dropColumn('email_verification_token')
      table.dropColumn('email_verification_sent_at')
      table.dropColumn('password_reset_token')
      table.dropColumn('token_created_at')
    })
  }
}
