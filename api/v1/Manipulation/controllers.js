// const Boom = require('boom')
const _ = require('lodash')
const Boom = require('boom')
const Bluebird = require('bluebird')
const rp = require('request-promise')
module.exports = {
  get: async (request) => {
    const json = JSON.parse(await rp('https://storage.googleapis.com/dito-questions/events.json'))
    let result = []

    // var to store all products of an transaction
    let products = {}

    // var to store a product object
    let product = {}
    let newTransaction = true

    // array of timestamps
    let timestamps = []
    let timestamp
    // store one buy detail
    let buy = {}

    // array to store transactions
    let transactions = []
    // var to store a new transaction when its found
    let transaction
    try {
      await Bluebird.map(json.events, async event => {
        if (event.event === 'comprou-produto') {
          if (!_.isEmpty(event.custom_data)) {
            event.custom_data.map(data => {
              if (data.key === 'transaction_id') {
                transaction = data.value
                // see if the transaction is in the array of transaction
                if (!transactions.includes(data.value)) {
                  newTransaction = true
                  transactions = transactions.concat(data.value)
                } else {
                  newTransaction = false
                }
              } else if (data.key === 'product_name') {
                product.name = data.value
              } else if (data.key === 'product_price') {
                product.price = data.value
              }
            })
            // if a new transaction is found
            if (newTransaction) {
              products[transaction] = [product]
            } else {
              products[transaction] = products[transaction].concat(product)
            }
          }
        } else if (event.event === 'comprou') {
          buy[event.timestamp] = {}
          if (!_.isEmpty(event.custom_data)) {
            buy[event.timestamp]['revenue'] = event.revenue
            buy[event.timestamp]['timestamp'] = event.timestamp
            timestamps = timestamps.concat(event.timestamp)
            await Bluebird.map(event.custom_data, data => {
              if (data.key === 'transaction_id') {
                buy[event.timestamp]['transaction_id'] = data.value
              } else if (data.key === 'store_name') {
                buy[event.timestamp]['store_name'] = data.value
              }
            })
            buy[event.timestamp]['products'] = []
          }
        }
        product = {}
        newTransaction = true
      })
      const timestampOrdered = timestamps.sort(function (lhs, rhs) { return lhs < rhs ? 1 : lhs > rhs ? -1 : 0 })
      while (timestampOrdered.length !== 0) {
        timestamp = timestampOrdered.shift()
        buy[timestamp]['products'] = buy[timestamp]['products'].concat(products[buy[timestamp]['transaction_id']])
        result = result.concat(buy[timestamp])
      }
      return result
    } catch (err) {
      return Boom.badImplementation('something_went_wrong')
    }
  }
}
