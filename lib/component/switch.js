const checkbox = require('./checkbox')

module.exports = function (content, opts = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep(null, content, opts)
  opts.wrapperClass = util.normalizeArray(opts.wrapperClass)
  opts.wrapperClass.push('form-switch')
  return checkbox.call(this, content, opts)
}
