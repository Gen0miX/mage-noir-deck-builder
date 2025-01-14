import User from '#models/user'
import crypto from 'crypto'
import mail from '@adonisjs/mail/services/main'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const user = await User.create({
      email: data.email,
      password: data.password,
      fullName: data.username,
      emailVerificationToken: verificationToken,
      emailVerificationSentAt: DateTime.now(),
    })

    const verificationLink =
      'http://localhost:3000/register/verify-email/' +
      verificationToken.toString() +
      '?email=' +
      user.email

    await mail.send((message) => {
      message
        .to(user.email)
        .from('no-reply@jonas-pilloud.ch')
        .subject('Vérifiez votre Email !')
        .htmlView('emails/verify_email', {
          verification_url: verificationLink,
          username: data.username,
        })
    })

    return response.created({ message: 'User registered successfully. Verification Email sent !' })
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
