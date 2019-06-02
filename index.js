require('dotenv').config()

const init = async () => {
  require('./api')
}

process.on('unhandledRejection', (err) => {
  console.log(`error unhandled rejection ${err}`)
})

module.exports = init()
