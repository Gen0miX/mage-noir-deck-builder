import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Card from './card.js'

export default class Element extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column() declare name: string

  @hasMany(() => Card) declare cards: HasMany<typeof Card>

  @manyToMany(() => Card, {
    pivotTable: 'mana_cost',
    pivotColumns: ['quantity'],
  })
  declare mana_cost: ManyToMany<typeof Card>
}
