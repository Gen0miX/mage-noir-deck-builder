import Extension from '#models/extension'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExtensionsController {
  public async index({ response }: HttpContext) {
    try {
      const extensions = await Extension.query()
      return response.ok(extensions)
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        message: 'Error fetching extensions',
        error,
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const extensions = await Extension.query().where('id', params.id)
      return response.ok(extensions)
    } catch (error) {
      return response.internalServerError({
        message: 'Error fetching extension',
        error,
      })
    }
  }
}
