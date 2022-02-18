const misc = require('./_misc')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper

  opts = util.prep('div', content, opts)
  if (_.isEmpty(opts.content)) opts.content = ['Loading...']
  console.log(opts.content)
  const text = [_.isEmpty(opts.content) ? '' : misc.call(this, 'span', opts.content, { class: 'visually-hidden' })]
  const common = opts.grow ? ['spinner-grow'] : ['spinner-border']
  opts.class = util.normalizeArray(opts.class, { common })
  opts.role = 'status'
  opts.content = text
  if (opts.size) opts.class.push(common[0] + '-' + opts.size)
  if (opts.color) opts.class.push(`text-${opts.color}`)
  return util.write(_.omit(opts, ['grow', 'size', 'color']))
}
