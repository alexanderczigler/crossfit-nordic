'use strict'

const env = require('dotenv')
env.config()

const http = require('http')

function del (path) {
  return request(path, 'DELETE')
}

function get (path) {
  return request(path, 'GET')
}

function post (path, body) {
  return request(path, 'POST', body)
}

function request (path, method, body) {
  const options = {
    host: process.env.API_URL,
    path: `/crossfitbrponline/api/ver2/${path}`,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${process.env.AUTH}`
    }
  }

  return new Promise((resolve, reject) => {
    const req = http.request(options, response => {
      let str = ''

      response.on('data', chunk => {
        str += chunk
      })

      response.on('end', () => {
        if (response.statusCode === 200) {
          resolve(JSON.parse(str))
        } else {
          reject({
            body: body,
            statusCode: response.statusCode,
            statusMessage: response.statusMessage,
            path: options.path
          })
        }
      })
    })

    if (method === 'POST' || method === 'PUT') {
      req.write(JSON.stringify(body))
    }

    req.end()
  })
}

module.exports = {
  getActivites: (startdate, enddate) => {
    return get(`activities.json?apikey=${process.env.API_KEY}&businessunitids=1&includebooking=true&startdate=${startdate}&enddate=${enddate}`)
  },
  getActivityBookings: enddate => {
    return get(`activitybookings.json?enddate=${enddate}&apikey=${process.env.API_KEY}`)
  },
  getPersons: () => {
    return get(`persons.json?apikey=${process.env.API_KEY}`)
  }
}
