module.exports = function (content, opts = {}) {
  const { util } = this.ndutView.helper
  const { _ } = this.ndut.helper
  opts = util.prep('img', content, opts)
  opts.selfClose = true
  if (opts.responsive) opts.class.push('img-fluid')
  if (opts.thumbnail) opts.class.push('img-thumbnail')
  if (opts.holder) opts.dataSrc = `holder.js/${opts.holder}`
  return util.open(_.omit(opts, ['responsive', 'thumbnail', 'holder']))
}
