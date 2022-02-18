module.exports = function (content, opts = {}) {
  const { util } = this.ndutView.helper
  const { _ } = this.ndut.helper
  opts = util.prep('i', content, opts)
  let name = opts.content[0]
  if (!name.includes('-')) name = 'bi-' + name
  opts.class = util.normalizeArray(opts.class, { default: ['me-2', 'flex-shrink-0'] })
  opts.class.push(name)
  opts.content = []
  return util.write(_.omit(opts, []))
}
