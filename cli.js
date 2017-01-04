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
      return app.getActivities()
    default:
      return Promise.reject((`Command "${_command}" is not declared.`))
  }
}

r()
  .then(() => {
    console.info(`Command '${_command}' completed!`)
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
