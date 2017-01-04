'use strict'

const apiAdapter = require('./adapters/api')

module.exports = {
  getActivities: () => {
    return apiAdapter.getActivites()
      .then(activities => {
        console.log(activities)
      })
  }
}