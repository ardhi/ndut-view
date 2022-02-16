const util = require('./_util')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  opts = util.prep.call(this, 'option', content, opts)
  opts.class = util.normalizeArray.call(this, opts.class)
  opts.style = util.normalizeObject.call(this, opts.style)
  return util.write.call(this, opts)
}
