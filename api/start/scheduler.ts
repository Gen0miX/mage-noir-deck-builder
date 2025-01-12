import scheduler from 'adonisjs-scheduler/services/main'
import DeleteUnverifiedUsers from '../commands/delete_unverified_users.js'

scheduler.command(DeleteUnverifiedUsers).everyTwoHours()

scheduler
  .call(() => {
    console.log('Pruge DB!')
  })
  .weekly()
