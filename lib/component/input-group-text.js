module.exports = function (content, opts = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep('span', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['input-group-text'] })
  return util.write(opts)
}
