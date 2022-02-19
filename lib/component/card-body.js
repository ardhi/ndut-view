module.exports = function (content, opts = {}, ext = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep('div', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['card-body'] })
  return util.write(opts)
}
