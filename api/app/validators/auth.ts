import vine from '@vinejs/vine'

const password = vine.string().minLength(8)

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password,
    username: vine
      .string()
      .minLength(3)
      .maxLength(16)
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('full_name', value).first()
        return !match
      }),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)

export const emailValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
  })
)
