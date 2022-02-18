const input = require('./input')

module.exports = function (content, opts = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep(null, content, opts)
  opts.type = 'range'
  return input.call(this, null, opts, { common: ['form-range'] })
}