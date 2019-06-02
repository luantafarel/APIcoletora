const HapiServer = require('libs/hapi_server')

class APIServer extends HapiServer {
  constructor () {
    super('api')
  }

  async setup () {
    await this.server.register({
      plugin: require('hapi-qs'),
      options: {}
    })

    this.server.route({
      path: '/',
      method: 'GET',
      handler: (request, h) => h.redirect(require('package.json').docPath),
      config: {
        auth: false
      }
    })
    this.route()
  }
}

const server = new APIServer()
server.start()

module.exports = server
