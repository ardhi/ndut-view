const colors = require('./_color.json')
const misc = require('./_misc')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper

  opts = util.prep('span', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: 'badge' })
  return util.write(opts)
}
