'use strict'

const apiAdapter = require('./adapters/api')

module.exports = {
  getActivities: (startdate, enddate) => {
    return apiAdapter.getActivites(startdate, enddate)
      .then(activities => {
        return activities
      })
  },
  getActivityBookings: (enddate) => {
    return apiAdapter.getActivityBookings(enddate)
      .then(res => {
        return res
      })
  },
  getPersons: () => {
    return apiAdapter.getPersons()
      .then(res => {
        return res
      })
  }
}