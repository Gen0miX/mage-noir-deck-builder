import crypto from 'crypto'
import mail from '@adonisjs/mail/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class EmailsController {
  async sendVerificationEmail({ request, response }: HttpContext) {
    const email = request.input('email')
    const user = await User.findByOrFail('email', email)

    if (user.isEmailVerified) {
      return response.badRequest({ message: 'Email already verified' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    user.emailVerificationToken = token
    user.emailVerificationSentAt = DateTime.now()
    await user.save()

    await mail.send((message) => {
      message
        .to(user.email)
        .from('no-reply@jonas-pilloud.ch')
        .subject('Vérifiez votre Email !')
        .htmlView('emails/verify-email', { token, user })
    })
    return response.ok({ message: 'Verification Email sent !' })
  }

  async verifyEmail({ params, response }: HttpContext) {
    const token = params.token

    const user = await User.findByOrFail('emailVerificationToken', token)

    if (user.isEmailVerified) {
      return response.badRequest({ message: 'Email already verified !' })
    }

    user.isEmailVerified = true
    user.emailVerificationToken = null
    user.emailVerificationSentAt = null
    await user.save()

    return response.ok({ message: 'Email verified !' })
  }
}
