const input = require('./input')

module.exports = function (content, opts = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep(null, content, opts)
  opts.type = 'file'
  return input.call(this, null, opts)
}
