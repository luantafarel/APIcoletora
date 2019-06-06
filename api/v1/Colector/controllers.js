const Boom = require('boom')
const db = require('models')
const ApiUtils = require('api/helpers/api_utils')
module.exports = {
  show: async (request) => {
    const product = await db.Product.findByPk(request.params.id)
    if (!product) return Boom.notFound('product_not_found')
    return product
  },
  delete: async (request) => {
    const product = await db.Product.destroy({ where: { id: request.params.id } })
    if (product === 0) return Boom.notFound('product_not_found')
    return product
  },
  list: async (request) => {
    const query = await ApiUtils.requestToQuery(
      request,
      ['name']
    )
    const product = await db.Product.scope('compact').findAll(query)
    if (product.length === 0) return Boom.notFound('product_not_found')
    return product
  },
  create: async (request) => {
    const product = await db.Product.create(request.payload)
    if (!product) return Boom.notFound('product_not_created')
    return product
  },
  bulk: async (request) => {
    const product = await db.Product.bulkCreate(request.payload)
    if (!product) return Boom.notFound('product_not_created')
    return product
  }
}
