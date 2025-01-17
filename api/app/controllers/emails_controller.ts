import crypto from 'crypto'
import mail from '@adonisjs/mail/services/main'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { DateTime } from 'luxon'
import { emailValidator } from '#validators/auth'

export default class EmailsController {
  async sendVerificationEmail({ request, response }: HttpContext) {
    const data = await request.validateUsing(emailValidator)
    const user = await User.findByOrFail('email', data.email)

    if (user.isEmailVerified) {
      return response.badRequest({ message: 'Email already verified' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    user.emailVerificationToken = token
    user.emailVerificationSentAt = DateTime.now()
    await user.save()

    const verificationLink =
      'http://localhost:3000/register/verify-email/' + token.toString() + '?email=' + user.email

    await mail.send((message) => {
      message
        .to(user.email)
        .from('no-reply@jonas-pilloud.ch')
        .subject('Vérifiez votre Email !')
        .htmlView('emails/verify_email', {
          verification_url: verificationLink,
          username: user.fullName,
        })
    })
    return response.ok({ message: 'Verification Email sent !' })
  }

  async verifyEmail({ params, response }: HttpContext) {
    const token = params.token

    const user = await User.findByOrFail('email_verification_token', token)

    if (user.isEmailVerified) {
      return response.badRequest({ message: 'Email already verified !' })
    }

    user.isEmailVerified = true
    user.emailVerificationToken = null
    user.emailVerificationSentAt = null
    await user.save()

    return response.ok({ message: 'Email verified !' })
  }

  async sendResetPasswordEmail({ request, response }: HttpContext) {
    const data = await request.validateUsing(emailValidator)
    const user = await User.findByOrFail('email', data.email)

    const token = crypto.randomBytes(32).toString('hex')
    user.passwordResetToken = token
    user.tokenCreatedAt = DateTime.now()
    await user.save()

    const resetLink = 'http://localhost:3000/register/pwd-forgot/' + token.toString()

    await mail.send((message) => {
      message
        .to(user.email)
        .from('no-reply@jonas-pilloud.ch')
        .subject('Réinitialisez votre mot de passe')
        .htmlView('emails/reset_password', { reset_url: resetLink, username: user.fullName })
    })
    return response.ok({ message: 'Password reset email sent!' })
  }

  async resetPassword({ params, request, response }: HttpContext) {
    const token = params.token
    const { newPassword } = request.all()
    const user = await User.findByOrFail('password_reset_token', token)

    if (user.tokenCreatedAt) {
      const tokenAge = DateTime.now().diff(user.tokenCreatedAt, 'hours').hours
      if (tokenAge > 24) {
        return response.badRequest({ message: 'Token expired' })
      }
    }

    user.password = newPassword
    user.passwordResetToken = null
    user.tokenCreatedAt = null
    await user.save()

    return response.ok({ message: 'Password reset successfully !' })
  }
}
