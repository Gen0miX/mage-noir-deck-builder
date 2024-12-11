import { FieldContext } from '@vinejs/vine/types'
import vine from '@vinejs/vine'

/**
 * Custom rule to ensure the total quantity of cards is at least 40
 */
async function minDeckQuantity(value: unknown, minQuantity: number, field: FieldContext) {
  // Vérifier que la valeur est bien un tableau
  if (!Array.isArray(value)) {
    return
  }

  const totalQuantity = value.reduce((sum, card) => {
    if (typeof card.quantity === 'number') {
      return sum + card.quantity
    }
    return sum
  }, 0)

  if (totalQuantity < minQuantity) {
    field.report(
      `The total quantity of cards must be at least ${minQuantity}. Current total: ${totalQuantity}`,
      'minDeckQuantity',
      field
    )
  }
}

export const minDeckQuantityRule = vine.createRule(minDeckQuantity)
