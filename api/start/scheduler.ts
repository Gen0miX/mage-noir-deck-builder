import scheduler from 'adonisjs-scheduler/services/main'
import DeleteUnverifiedUsers from '../commands/delete_unverified_users.js'

scheduler.command('inspire').everyFiveSeconds()
scheduler.command(DeleteUnverifiedUsers).everyFifteenSeconds()

scheduler
  .call(() => {
    console.log('Pruge DB!')
  })
  .weekly()
