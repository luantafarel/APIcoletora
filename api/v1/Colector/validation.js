const JS = require('models').JS
const Joi = require('joi')
module.exports = {
  list: {
    query: {
      search: Joi
        .string()
        .description('Search string')
    }
  },
  show: {
    params: JS.Product.pick('id')
  },
  create: {
    payload: Joi
      .object(
        JS.Product.pick(
          'name', 'stock', 'timestamp'
        )
      )
  },
  bulk: {
    payload: Joi
      .array()
      .unique()
      .min(1)
      .items(
        Joi
          .object(
            JS.Product.pick(
              'name', 'stock', 'timestamp'
            )
          ))
  },
  delete: {
    params: JS.Product.pick('id')
  }
}
