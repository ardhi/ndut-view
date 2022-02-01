const nunjucks = require('nunjucks')
const getLoader = require('../lib/loader')
const handleGlobal = require('../lib/handle-global')
const handleFilter = require('../lib/handle-filter')
const handleExtension = require('../lib/handle-extension')

const plugin = async function (scope, options) {
  const { _ } = scope.ndut.helper
  const opts = _.omit(options.env, ['web', 'express'])
  const Loader = getLoader(scope, options)
  scope.log.debug('* Setup nunjucks environment')
  scope.ndutView.env = new nunjucks.Environment(new Loader(), opts)
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