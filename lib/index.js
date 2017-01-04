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
        let p = res.persons[0]
        p.workphone = 'meow'
        return apiAdapter.updatePerson(p)
        //return res
      })
      .then(res => {
        console.log('r', res)
        return apiAdapter.getPersons()
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