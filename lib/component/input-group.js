module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep('div', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['input-group'] })
  if (opts.size) opts.class.push(`input-group-${opts.size}`)
  if (opts.noWrap) opts.class.push('flex-nowrap')
  return util.write(_.omit(opts, ['size', 'noWrap']))
}
