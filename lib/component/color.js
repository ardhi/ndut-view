const util = require('./_util')
const input = require('./input')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  opts = util.prep.call(this, null, content, opts)
  opts.type = 'color'
  return input.call(this, null, opts, { common: ['form-control form-control-color'] })
}
