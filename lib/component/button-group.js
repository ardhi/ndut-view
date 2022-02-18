module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep('div', content, opts)
  const common = [opts.vertical ? 'btn-group-vertical' : 'btn-group']
  opts.class = util.normalizeArray(opts.class, { common })
  opts.role = 'group'
  return util.write(_.omit(opts, ['size', 'vertical']))
}
