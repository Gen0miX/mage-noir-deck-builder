import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class DeleteUnverifiedUsers extends BaseCommand {
  static commandName = 'delete:unverified-users'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    console.log('Hello world from "DeleteUnverifiedUsers"')
  }
}
