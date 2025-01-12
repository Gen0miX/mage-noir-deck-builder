import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class DeleteUnverifiedUsers extends BaseCommand {
  static commandName = 'delete:unverified-users'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    const expirationThreshold = DateTime.now().minus({ hours: 24 })

    const usersToDelete = await User.query()
      .where('is_email_verified', false)
      .andWhere('email_verification_sent_at', '<', expirationThreshold.toISO())
      .select('id')

    if (usersToDelete.length > 0) {
      console.log(`Deleting ${usersToDelete.length} unverified users...`)
      await User.query()
        .whereIn(
          'id',
          usersToDelete.map((user) => user.id)
        )
        .delete()
      console.log('Unverified users deleted.')
    } else {
      console.log('No unverified users to delete.')
    }
  }
}
