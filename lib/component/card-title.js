module.exports = function (content, opts = {}, ext = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep(opts.tag || 'h5', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['card-title'] })
  return util.write(opts)
}
