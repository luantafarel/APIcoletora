const validation = require('./validation')
const controllers = require('./controllers')
const endpoint = 'products'
module.exports = [{
  method: 'POST',
  path: `${endpoint}/create`,
  handler: controllers.create,
  config: {
    description: 'Create new Products',
    notes: 'Create new Products',
    validate: validation.create
  }
}, {
  method: 'GET',
  path: `${endpoint}`,
  handler: controllers.list,
  config: {
    description: 'List all Products',
    notes: 'List all Products',
    validate: validation.list
  }
}, {
  method: 'GET',
  path: `${endpoint}/{id}`,
  handler: controllers.show,
  config: {
    description: 'List one Product',
    notes: 'List one Product',
    validate: validation.show
  }
}, {
  method: 'POST',
  path: `${endpoint}/delete/{id}`,
  handler: controllers.delete,
  config: {
    description: 'delete one Product',
    notes: 'delete one Product',
    validate: validation.delete
  }
}, {
  method: 'POST',
  path: `${endpoint}/bulk`,
  handler: controllers.bulk,
  config: {
    description: 'Create many Products',
    notes: 'Create many Product',
    validate: validation.bulk
  }
}]
