module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep('div', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['btn-toolbar'] })
  opts.role = 'toolbar'
  return util.write(opts)
}
