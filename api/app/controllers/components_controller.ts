import Component from '#models/component'
import type { HttpContext } from '@adonisjs/core/http'

export default class ComponentsController {
  public async index({ response }: HttpContext) {
    try {
      const components = await Component.query()
      return response.ok(components)
    } catch (error) {
      console.error(error)
      return response.internalServerError({
        message: 'Error fetching components',
        error,
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const components = await Component.query().where('id', params.id)
      return response.ok(components)
    } catch (error) {
      return response.internalServerError({
        message: 'Error fetching components',
        error,
      })
    }
  }
}
