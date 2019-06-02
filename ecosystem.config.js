module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'back',
      script: 'index.js',
      ignoreWatch: ['logs/*', '*.swp'],
      env: {
        NODE_PATH: '.',
        NODE_ENV: 'development',
        PRETTY_ERROR: true,
        DEBUG_COLORS: true,
        watch: true,
        ignore_watch: ['.git/*', 'logs/*']
      },
      env_staging: {
        NODE_PATH: '.',
        NODE_ENV: 'staging',
        HTTPS: true,
        PRETTY_ERROR: true,
        DEBUG_COLORS: true
      },
      env_production: {
        NODE_PATH: '.',
        NODE_ENV: 'production',
        HTTPS: true,
        PRETTY_ERROR: false,
        DEBUG_COLORS: false
      }
    }
  ]
}
