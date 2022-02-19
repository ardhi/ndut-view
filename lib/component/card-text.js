module.exports = function (content, opts = {}, ext = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep('p', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['card-text'] })
  return util.write(opts)
}
