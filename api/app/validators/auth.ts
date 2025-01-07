import vine from '@vinejs/vine'
import { schema, rule } from '@adonisjs/core/validator'

const password = vine.string().minLength(8)

export const registerValidator = schema.create({
  email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
  password: schema.string({}, [rules.confirmed()]),
  username: schema.string({}, [rules.minLength(3), rules.maxLength(30)]),
})

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)
