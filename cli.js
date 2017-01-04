'use strict'

const app = require('./lib/index')

let exitCode = 0
const _command = process.argv[2]

if (!_command) {
  console.error('No command specified.')
  process.exit(1)
}

const r = () => {
  switch (_command) {
    case 'getActivities':
      return app.getActivities(process.argv[3], process.argv[4])
    case 'getActivityBookings':
    console.log('a')
      return app.getActivityBookings(process.argv[3])
    default:
      return Promise.reject((`Command "${_command}" is not declared.`))
  }
}

r()
  .then(out => {
    console.log(out)
    console.log(`Command '${_command}' completed!`)
  })
  .catch(error => {
    exitCode = 1
    if (error.message) {
      console.error(`Error: ${error.message}`)
    }

    if (error.statusMessage) {
      console.error(`Error: ${error.statusCode} ${error.statusMessage}`)
    }

    console.error(`Command '${_command}' resulted in error.`)
  })
  .then(() => {
    console.log()
    process.exit(exitCode)
  })
