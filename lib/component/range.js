const util = require('./_util')
const input = require('./input')

module.exports = function (content, opts = {}) {
  opts = util.prep.call(this, null, content, opts)
  opts.type = 'range'
  return input.call(this, null, opts, { common: ['form-range'] })
}
