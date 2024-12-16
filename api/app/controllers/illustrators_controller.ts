import Illustrator from '#models/illustrator'
import type { HttpContext } from '@adonisjs/core/http'

export default class IllustratorsController {
  public async index({ response }: HttpContext) {
    try {
      const illustrators = await Illustrator.query()
      return response.ok(illustrators)
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        message: 'Error fetching illustrators',
        error,
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const illustrators = await Illustrator.query().where('id', params.id)
      return response.ok(illustrators)
    } catch (error) {
      return response.internalServerError({
        message: 'Error fetching illustrators',
        error,
      })
    }
  }
}
