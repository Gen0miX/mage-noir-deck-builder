import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create({
      email: data.email,
      password: data.password,
      fullName: data.username,
    })
    return User.accessTokens.create(user)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)
      return { token, user }
    } catch (error) {
      return response.status(400).json({ message: 'Invalid credentials' })
    }
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'success' }
  }

  async me({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user,
    }
  }
}
