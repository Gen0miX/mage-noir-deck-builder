import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Card from './card.js'

export default class Component extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column() declare name: string

  @manyToMany(() => Card, {
    pivotTable: 'card_components',
    pivotColumns: ['quantity'],
  })
  declare cards: ManyToMany<typeof Card>
}
