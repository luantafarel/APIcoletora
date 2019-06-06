const controllers = require('./controllers')
const endpoint = 'manipulation'
module.exports = [{
  method: 'GET',
  path: `${endpoint}`,
  handler: controllers.get,
  config: {
    description: 'Get Report',
    notes: 'Get Report'
  }
}]
