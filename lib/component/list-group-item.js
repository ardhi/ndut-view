const badge = require('./badge')
const checkbox = require('./checkbox')

module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep('li', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['list-group-item'] })
  if (opts.action) {
    opts.tag = opts.tag || 'a'
    opts.class.push('list-group-item-action')
    if (opts.tag === 'a') opts.href = opts.href || '#'
  }
  if (opts.color && util.colors.includes(opts.color)) opts.class.push(`list-group-item-${opts.color}`)
  if (opts.badge) {
    opts.class.push('d-flex', 'justify-content-between', 'align-items-center')
    const badgeOpts = util.filterOpts('badge', opts)
    opts.content.push(badge.call(this, opts.badge, badgeOpts))
  }
  if (opts.checkbox || opts.radio) {
    const type = opts.checkbox ? 'checkbox' : 'radio'
    opts.tag = 'label'
    const crOpts = util.filterOpts(type, opts)
    crOpts.noWrapper = true
    crOpts.class.push('me-1')
    crOpts.ariaLabel = opts.content[0]
    opts.content.unshift(checkbox.call(this, '', crOpts, type === 'radio'))
  }

  return util.write(_.omit(opts, ['action', 'color', 'badge', 'checkbox', 'radio']))
}
