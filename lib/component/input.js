const util = require('./_util')

module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  ext.common = ext.common || ['form-control']
  opts = util.prep.call(this, 'input', content, opts)
  opts.selfClose = true
  opts.class = util.normalizeArray.call(this, opts.class, { common: ext.common })
  opts.style = util.normalizeObject.call(this, opts.style)
  opts.type = opts.type || 'text'
  if (opts.size) opts.class.push(`form-control-${opts.size}`)
  if (opts.plain) {
    opts.readonly = true
    opts.class.push('form-control-plaintext')
    _.pull(opts.class, 'form-control')
  }
  return util.open.call(this, _.omit(opts, ['size', 'plain']))
}
