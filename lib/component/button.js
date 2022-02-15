const util = require('./_util')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  opts = util.prepContent.call(this, content, opts)
  opts.tag = opts.tag || 'button'
  const attr = _.pick(opts, ['disabled', 'type'])
  attr.class = util.normalizeArray.call(this, opts.class, { default: ['btn-default'], common: ['btn'] })
  if (opts.active) attr.class.push('active')
  if (opts.tag === 'a') {
    attr.role = 'button'
    attr.href = opts.href || '#'
    if (opts.disabled) {
      delete attr.disabled
      attr.class.push('disabled')
    }
  }
  return util.write.call(this, opts.tag, attr, opts.content, opts.newLine)
}
