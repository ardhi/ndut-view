const handleGlobal = require('../lib/handle-global')
const handleFilter = require('../lib/handle-filter')
const handleExtension = require('../lib/handle-extension')
const handleComponent = require('../lib/handle-component')
const getLoader = require('../lib/engine/loader')
const Environment = require('../lib/engine/environment')

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
  await handleComponent.call(scope)
  await handleGlobal.call(scope)
  await handleFilter.call(scope)
  await handleExtension.call(scope)
}

module.exports = async function () {
  const { fp } = this.ndut.helper
  return fp(plugin)
}