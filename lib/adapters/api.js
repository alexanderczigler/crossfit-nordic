'use strict'

const fetch = require('node-fetch')
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

function put (path, body) {
  return request(path, 'PUT', body)
}

function patch (path, body) {
  return request(path, 'PATCH', body)
}

function request (path, method, body) {
  const options = {
    headers:  {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${process.env.AUTH}`
    },
    method
  }

  let modifier = '?'
  if (path.indexOf('?') > -1) {
    modifier = '&'
  }

  if (method === 'GET') {
    path += `${modifier}apikey=${process.env.API_KEY}`
  } else {
    body.apikey = process.env.API_KEY
    options.body = body
  }

  return fetch(`http://${process.env.API_URL}/crossfitbrponline/api/ver2/${path}`, options)
    .then(res => {
      return res.json()
    })
    .catch(error => {
      console.error(error)
      return Promise.reject(error)
    })
}

module.exports = {
  getActivites: (startdate, enddate) => {
    return get(`activities.json?businessunitids=1&includebooking=true&startdate=${startdate}&enddate=${enddate}`)
  },
  getActivityBookings: enddate => {
    return get(`activitybookings.json?enddate=${enddate}`)
  },
  getPersons: () => {
    return get(`persons.json`)
  },
  updatePerson: body => {
    return post(`persons.json`, body)
  },
  generateapi3token: () => {
    return post(`generateapi3token.json`, {
      apikey: process.env.API_KEY
    })
  },
  book: activityid => {
    return post(`activitybookings.json`, {
      type: 'ordinary',
      activityid
    })
  }
}
