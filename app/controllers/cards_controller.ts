import Card from '#models/card'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  // Méthode privée pour sérialiser une carte
  private serializeCard(card: Card) {
    const serializedManaCost = card.mana_cost.map((mana) => ({
      ...mana.serialize(),
      quantity: mana.$extras.pivot_quantity,
    }))

    const serializedComponents = card.components.map((component) => ({
      ...component.serialize(),
      quantity: component.$extras.pivot_quantity,
    }))

    return {
      ...card.serialize(),
      mana_cost: serializedManaCost,
      components: serializedComponents,
    }
  }

  // Méthode pour sérialiser une liste de cartes
  private serializeCards(cards: Card[]) {
    return cards.map(this.serializeCard)
  }

  public async index({ response }: HttpContext) {
    try {
      const cards = await Card.query()
        .preload('illustrator')
        .preload('extension')
        .preload('type')
        .preload('element')
        .preload('mana_cost', (query) => {
          query.pivotColumns(['quantity'])
        })
        .preload('components', (query) => {
          query.pivotColumns(['quantity'])
        })

      return response.ok(this.serializeCards(cards))
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        message: 'Error fetching cards',
        error,
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const cards = await Card.query()
        .where('id', params.id)
        .preload('illustrator')
        .preload('extension')
        .preload('type')
        .preload('element')
        .preload('mana_cost', (query) => {
          query.pivotColumns(['quantity'])
        })
        .preload('components', (query) => {
          query.pivotColumns(['quantity'])
        })

      return response.ok(this.serializeCards(cards))
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        message: 'Error fetching cards',
        error,
      })
    }
  }

  public async filter({ request, response }: HttpContext) {
    try {
      const {
        elementId,
        typeId,
        minHp,
        maxHp,
        manaCostElementId,
        manaCostQuantity,
        componentId,
        componentQuantity,
        name,
      } = request.qs()

      const query = Card.query()
        .preload('illustrator')
        .preload('extension')
        .preload('type')
        .preload('element')
        .preload('mana_cost', (query) => {
          query.pivotColumns(['quantity'])
        })
        .preload('components', (query) => {
          query.pivotColumns(['quantity'])
        })

      if (elementId) query.where('element_id', elementId)
      if (typeId) query.where('type_id', typeId)
      if (minHp) query.where('hp', '>=', minHp)
      if (maxHp) query.where('hp', '<=', maxHp)
      if (name) query.where('name', 'like', `%${name}%`)

      if (manaCostElementId) {
        query.whereHas('mana_cost', (manaCostQuery) => {
          manaCostQuery.where('element_id', manaCostElementId)
          if (manaCostQuantity) {
            manaCostQuery.where('quantity', '>=', manaCostQuantity)
          }
        })
      }

      if (componentId) {
        query.whereHas('components', (componentsQuery) => {
          componentsQuery.where('component_id', componentId)
          if (componentQuantity) {
            componentsQuery.where('quantity', '>=', componentQuantity)
          }
        })
      }

      const cards = await query

      return response.ok(this.serializeCards(cards))
    } catch (error) {
      return response.badRequest({ message: 'Failed to filter cards', error })
    }
  }
}
