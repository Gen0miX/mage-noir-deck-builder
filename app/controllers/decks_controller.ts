import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  private serializeDeck(deck: Deck) {
    const serializedCard = deck.cards.map((card) => ({
      ...card.serialize(),
      quantity: card.$extras.pivot_quantity,
    }))

    return {
      ...deck.serialize(),
      cards: serializedCard,
    }
  }

  private serializeDecks(decks: Deck[]) {
    return decks.map(this.serializeDeck)
  }

  public async index({ response }: HttpContext) {
    try {
      const decks = await Deck.query()
        .preload('user')
        .preload('cards', (query) => {
          query.pivotColumns(['quantity'])
        })
      return response.ok(this.serializeDecks(decks))
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        message: 'Error fetching decks',
        error,
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const decks = await Deck.query()
        .where('id', params.id)
        .preload('user')
        .preload('cards', (query) => {
          query.pivotColumns(['quantity'])
        })
      return response.ok(this.serializeDecks(decks))
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        message: 'Error fetching deck',
        error,
      })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(deckValidator)

      const deck = await Deck.create({
        name: payload.name,
        description: payload.description,
        userId: payload.userId,
      })

      const cardsPayload = payload.cards.map((card) => ({
        card_id: card.cardId,
        quantity: card.quantity,
      }))

      // Utilisation de reduce avec un type explicite
      const cardsMap = cardsPayload.reduce<Record<number, { quantity: number }>>((acc, card) => {
        acc[card.card_id] = { quantity: card.quantity }
        return acc
      }, {})

      // Associer les cartes au deck
      await deck.related('cards').attach(cardsMap)

      await deck.load('cards')

      return response.created({
        message: 'Deck created successfully.',
        deck: this.serializeDeck(deck),
      })
    } catch (error) {
      console.error(error)

      return response.badRequest({
        message: 'Failed to create deck.',
        error: error.messages || error,
      })
    }
  }

  public async remove({ params, response }: HttpContext) {
    try {
      const deck = await Deck.findOrFail(params.id)
      await deck.delete()

      return response.ok(`Deck ${params.id} deleted`)
    } catch (error) {
      console.error(error)

      return response.badRequest({
        message: 'Failed to delete deck.',
        error: error.messages || error,
      })
    }
  }
}
