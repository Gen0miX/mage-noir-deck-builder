import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Card from './card.js'

export default class Type extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column() declare name: string

  @hasMany(() => Card) declare cards: HasMany<typeof Card>
}
