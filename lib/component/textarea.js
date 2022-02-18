module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  ext.common = ext.common || ['form-control']
  opts = util.prep('textarea', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ext.common })
  if (opts.size) opts.class.push(`form-control-${opts.size}`)
  if (opts.plain) {
    opts.readonly = true
    opts.class.push('form-control-plaintext')
    _.pull(opts.class, 'form-control')
  }
  return util.write(_.omit(opts, ['size', 'plain']))
}
