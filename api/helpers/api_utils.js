const _ = require('lodash')
const JS = require('models').JS
const sequelize = require('sequelize')
const moment = require('moment-timezone')

const db = require('models')

const Op = db.sequelize.Op

/**
 * Transforms a request object into a sequelize query clause.
 * The search string clause is added to each searchAttrs from the main Model and
 * to each listed attribute from the associated models.
 * @param {object} request HapiJS request object.
 * @param {string[]} searchAttrs Attribute array of the main model.
 * @param {object[]} associationsAttrs Array of { JS, as, attributes } from associated models.
 * @return {object} Sequelize query clause.
 */
exports.requestToQuery = (request, searchAttrs = []) => {
  let query = {}

  query.where = {
    [Op.and]: []
  }

  if (request.query.search) {
    let querySearch = internals.querySearch(
      JS.Products._modelName,
      _.pick(JS.Products.types(), searchAttrs),
      request.query.search
    )
    query.where[Op.and].push(querySearch)
  }

  return query
}

const internals = {

  querySearch: (modelName, schema, searchString) => {
    let where = { [Op.or]: [] }
    _.forEach(schema, (item, key) => {
      let attribute = sequelize.literal(`"${modelName}"."${key}"`)

      switch (item._type || item.query) {
        case 'number': {
          let value = +searchString
          if (value) {
            where[Op.or].push({ [key]: value })
          }

          break
        }

        case 'integer': {
          let value = +searchString
          if (value) {
            where[Op.or].push(sequelize.where(attribute, value))
          }
          break
        }

        case 'string': {
          let query = sequelize.where(
            sequelize.fn('unaccent', attribute),
            { [Op.iLike]: sequelize.fn('unaccent', `%${searchString}%`) }
          )
          where[Op.or].push(query)
          break
        }

        case 'text': {
          where[Op.or].push(sequelize.where(attribute, { [Op.iLike]: `%${searchString}%` }))
          break
        }

        case 'dateonly': {
          let date = moment(searchString, 'YYYY-MM-DD')
          if (date.isValid()) {
            where[Op.or].push(sequelize.where(attribute, date.format('YYYY-MM-DD')))
          }
          break
        }

        default: {
          where[Op.or].push(sequelize.where(attribute, searchString))
        }
      }
    })

    return where
  }
}
