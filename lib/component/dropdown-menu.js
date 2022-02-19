const dropdownItem = require('./dropdown-item')

module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep('ul', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['dropdown-menu'] })
  if (opts.dark) opts.class.push('dropdown-menu-dark')
  if (opts.leftAlignResponsive === true) opts.leftAlignResponsive = 'lg'
  if (opts.rightAlignResponsive === true) opts.rightAlignResponsive = 'lg'

  if (opts.rightAlign) opts.class.push('dropdown-menu-end')
  else if (opts.rightAlignResponsive) opts.class.push(`dropdown-menu-${opts.rightAlignResponsive}-end`)
  else if (opts.leftAlignResponsive) opts.class.push('dropdown-menu-end', `dropdown-menu-${opts.leftAlignResponsive}-start`)
  _.each(opts.content, (c, idx) => {
    if (_.isPlainObject(c)) opts.content[idx] = dropdownItem.call(this, c)
    else if (c === '-') opts.content[idx] = dropdownItem.call(this, c)
  })
  return util.write(_.omit(opts, ['dark', 'rightAlign', 'rightAlignResponsive', 'leftAlignResponsive']))
}
