import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Card from './card.js'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column() declare name: string
  @column() declare description: string
  @column() declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User) declare user: BelongsTo<typeof User>

  @manyToMany(() => Card, {
    pivotTable: 'deck_cards',
    pivotColumns: ['quantity'],
  })
  declare cards: ManyToMany<typeof Card>
}
