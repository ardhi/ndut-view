module.exports = function (content, opts = {}, ext = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep(opts.tag || 'h6', content, opts)
  opts.class = util.normalizeArray(opts.class, { default: ['mb-2'], common: ['card-subtitle', 'text-muted'] })
  return util.write(opts)
}
