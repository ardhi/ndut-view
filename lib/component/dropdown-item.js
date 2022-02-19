const button = require('./button')
const misc = require('./_misc')

module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep(null, content, opts)
  if (opts.content[0] === '-') opts.type = 'divider'
  let item
  switch (opts.type) {
    case 'text':
      opts.class = util.normalizeArray(opts.class, { common: ['dropdown-item-text'] })
      item = misc.call(this, 'span', _.omit(opts, ['type']))
      break
    case 'header':
      opts.class = util.normalizeArray(opts.class, { common: ['dropdown-header'] })
      item = misc.call(this, 'h6', _.omit(opts, ['type']))
      break
    case 'divider':
      opts.class = util.normalizeArray(opts.class, { common: ['dropdown-divider'] })
      opts.el = 'hr'
      opts.content = []
      opts.selfClose = true
      item = util.open(_.omit(opts, ['type']))
      break
    default:
      opts.class = util.normalizeArray(opts.class)
      opts.el = 'a'
      opts.role = ''
      item = button.call(this, null, _.omit(opts, ['type']), { common: ['dropdown-item'] })
  }
  return `<li>${item}</li>`
}
