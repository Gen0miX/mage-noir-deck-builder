import Type from '#models/type'
import type { HttpContext } from '@adonisjs/core/http'

export default class TypesController {
  public async index({ response }: HttpContext) {
    try {
      const types = await Type.query()
      return response.ok(types)
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        message: 'Error fetching types',
        error,
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const types = await Type.query().where('id', params.id)
      return response.ok(types)
    } catch (error) {
      return response.internalServerError({
        message: 'Error fetching type',
        error,
      })
    }
  }
}
