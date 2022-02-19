module.exports = function (content, opts = {}, ext = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep('a', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['card-link'] })
  if (!opts.href) opts.href = '#'
  return util.write(opts)
}
