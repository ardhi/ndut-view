module.exports = function (content, opts = {}, ext = {}) {
  const { util } = this.ndutView.helper
  ext.common = ext.common || []
  opts = util.prep('label', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ext.common })
  return util.write(opts)
}
