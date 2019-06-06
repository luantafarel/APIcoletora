const db = require('models')

const Op = db.sequelize.Op

exports.requestToQuery = async (request, searchAttrs = []) => {
  if (request.query.search) {
    let query = {}
    query.where = {}
    query.where[searchAttrs[0]] = { [Op.iLike]: `${request.query.search}%` }
    return query
  }
}
