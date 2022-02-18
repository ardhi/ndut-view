const input = require('./input')

module.exports = function (content, opts = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep(null, content, opts)
  opts.type = 'color'
  return input.call(this, null, opts, { common: ['form-control form-control-color'] })
}
