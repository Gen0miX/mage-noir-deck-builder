import Element from '#models/element'
import type { HttpContext } from '@adonisjs/core/http'

export default class ElementsController {
  public async index({ response }: HttpContext) {
    try {
      const elements = await Element.query()
      return response.ok(elements)
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        message: 'Error fetching elements',
        error,
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const elements = await Element.query().where('id', params.id)
      return response.ok(elements)
    } catch (error) {
      return response.internalServerError({
        message: 'Error fetching elements',
        error,
      })
    }
  }
}
