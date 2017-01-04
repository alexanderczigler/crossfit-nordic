'use strict'

const apiAdapter = require('./adapters/api')

module.exports = {
  getActivities: (startdate, enddate) => {
    return apiAdapter.getActivites(startdate, enddate)
      .then(activities => {
        return activities
      })
  }
}