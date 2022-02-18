module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  ext.common = ext.common || ['form-control']
  opts = util.prep('input', content, opts)
  opts.type = opts.type || 'text'
  opts.selfClose = true
  opts.class = util.normalizeArray(opts.class, { common: ext.common })
  if (opts.size) opts.class.push(`form-control-${opts.size}`)
  if (opts.plain) {
    opts.readonly = true
    opts.class.push('form-control-plaintext')
    _.pull(opts.class, 'form-control')
  }
  return util.open(_.omit(opts, ['size', 'plain']))
}