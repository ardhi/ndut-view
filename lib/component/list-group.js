const listGroupItem = require('./list-group-item')

module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep('ul', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['list-group'] })
  if (opts.flush) opts.class.push('list-group-flush')
  if (opts.numbered) {
    opts.class.push('list-group-numbered')
    opts.tag = 'ol'
  }
  if (opts.horizontal) opts.class.push('list-group-horizontal')
  _.each(opts.content, (c, idx) => {
    if (_.isPlainObject(c)) opts.content[idx] = listGroupItem.call(this, c)
  })
  return util.write(_.omit(opts, ['flush', 'numbered', 'horizontal']))
}
