const util = require('./_util')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  opts = util.prep.call(this, 'img', content, opts)
  opts.class = util.normalizeArray.call(this, opts.class)
  opts.style = util.normalizeObject.call(this, opts.style)
  opts.selfClose = true
  if (opts.responsive) opts.class.push('img-fluid')
  if (opts.thumbnail) opts.class.push('img-thumbnail')
  if (opts.rounded) opts.class.push('rounded')
  if (opts.circle) opts.class.push('rounded-circle')
  if (opts.holder) opts.dataSrc = `holder.js/${opts.holder}`
  return util.open.call(this, _.omit(opts, ['responsive', 'thumbnail', 'rounded', 'circle', 'holder']))
}
