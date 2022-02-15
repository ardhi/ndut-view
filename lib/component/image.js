const util = require('./_util')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  opts = util.prepContent.call(this, content, opts)
  const attr = _.pick(opts, ['alt', 'src'])
  opts.tag = 'img'
  attr.class = util.normalizeArray.call(this, opts.class)
  if (opts.responsive) attr.class.push('img-fluid')
  if (opts.thumbnail) attr.class.push('img-thumbnail')
  if (opts.rounded) attr.class.push('rounded')
  if (opts.circle) attr.class.push('rounded-circle')
  if (opts.holder) attr.dataSrc = `holder.js/${opts.holder}`
  return util.write.call(this, opts.tag, attr, false, opts.newLine)
}
