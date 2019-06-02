const Boom = require('boom')
const db = require('models')
// const moment = require('moment')
const ApiUtils = require('api/helpers/api_utils')
module.exports = {
  show: async (request) => {
    const product = await db.Products.findByPk(request.params.id)
    if (!product) return Boom.notFound('product_not_found')
    return product
  },
  delete: async (request) => {
    const product = await db.Products.destroy({ where: { id: request.params.id } })
    if (product === 0) return Boom.notFound('product_not_found')
    return product
  },
  list: async (request) => {
    const query = ApiUtils.requestToQuery(
      request,
      ['name']
    )
    const product = await db.Products.scope('compact').findAndCountAll(query)
    if (!product) return Boom.notFound('product_not_found')
    return product
  },
  create: async (request) => {
    const product = await db.Products.create(request.payload)
    if (!product) return Boom.notFound('product_not_created')
    return product
  },
  bulk: async (request) => {
    const product = await db.Products.bulkCreate(request.payload)
    if (!product) return Boom.notFound('product_not_created')
    return product
  }
}
