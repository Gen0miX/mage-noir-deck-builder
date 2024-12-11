import vine from '@vinejs/vine'
import { minDeckQuantityRule } from './rules/minDeckQuantity.js'

export const deckValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().maxLength(500).optional(),
    userId: vine.number(),
    cards: vine
      .array(
        vine.object({
          cardId: vine.number(),
          quantity: vine.number().range([1, 4]),
        })
      )
      .use(minDeckQuantityRule(40)),
  })
)
