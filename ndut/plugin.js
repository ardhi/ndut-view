const getLoader = require('../lib/nunjucks/loader')
const handleGlobal = require('../lib/handle-global')
const handleFilter = require('../lib/handle-filter')
const handleExtension = require('../lib/handle-extension')
const Environment = require('../lib/nunjucks/environment')

const plugin = async function (scope, options) {
  const { _, getConfig } = scope.ndut.helper
  const config = getConfig()
  if (config.httpServer.disabled) {
    scope.log.warn('HTTP server is disabled, view canceled')
    return
  }
  const opts = _.omit(options.env, ['web', 'express'])
  const Loader = getLoader(scope, options)
  scope.log.debug('* Setup nunjucks environment')
  const env = new Environment(new Loader(), opts)
  scope.ndutView.env = env
  scope.log.debug('* Add globals')
  await handleGlobal.call(scope)
  scope.log.debug('* Add filters')
  await handleFilter.call(scope)
  scope.log.debug('* Add extensions')
  await handleExtension.call(scope)
}

module.exports = async function () {
  const { fp } = this.ndut.helper
  return fp(plugin)
}