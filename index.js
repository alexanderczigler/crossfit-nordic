'use strict'

const apiAdapter = require('./lib/adapters/api')

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
  },
  generateapi3token: () => {
    return apiAdapter.generateapi3token()
  },
  book: (activityid, spare) => {
    if (spare) {
      return ''
    } else {
      return apiAdapter.book(activityid)
    }
  }
}