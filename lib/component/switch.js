const checkbox = require('./checkbox')
const util = require('./_util')

module.exports = function (content, opts = {}) {
  opts = util.prep.call(this, null, content, opts)
  opts.wrapperClass = util.normalizeArray.call(this, opts.wrapperClass)
  opts.wrapperClass.push('form-switch')
  return checkbox.call(this, content, opts)
}
