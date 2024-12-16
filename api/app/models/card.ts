import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Illustrator from './illustrator.js'
import Extension from './extension.js'
import Type from './type.js'
import Element from './element.js'
import Component from './component.js'
import Deck from './deck.js'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column() declare name: string
  @column() declare elementId: number
  @column() declare typeId: number
  @column() declare hp: number
  @column() declare description: string
  @column() declare imageUrl: string
  @column() declare illustratorId: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column() declare extensionId: number

  @belongsTo(() => Illustrator) declare illustrator: BelongsTo<typeof Illustrator>
  @belongsTo(() => Extension) declare extension: BelongsTo<typeof Extension>
  @belongsTo(() => Type) declare type: BelongsTo<typeof Type>
  @belongsTo(() => Element) declare element: BelongsTo<typeof Element>

  @manyToMany(() => Element, {
    pivotTable: 'mana_cost',
    pivotColumns: ['quantity'],
  })
  declare mana_cost: ManyToMany<typeof Element>

  @manyToMany(() => Component, {
    pivotTable: 'card_components',
    pivotColumns: ['quantity'],
  })
  declare components: ManyToMany<typeof Component>

  @manyToMany(() => Deck, {
    pivotTable: 'deck_cards',
    pivotColumns: ['quantity'],
  })
  declare decks: ManyToMany<typeof Deck>
}
