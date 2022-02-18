const colors = require('./_color.json')
const misc = require('./_misc')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper

  opts = util.prep('nav', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['breadcrumb'] })
  opts.ariaLabel = 'breadcrumb'
  const olOpts = util.filterOpts('list', opts)
  olOpts.class = util.normalizeArray(olOpts.class, { common: ['breadcrumb'] })
  const itemOpts = util.filterOpts('item', opts)
  const items = []
  _.each(opts.content, (c, idx) => {
    const isActive = idx === opts.content.length - 1
    if (_.isPlainObject(c)) {
      c = isActive ? c.label : misc.call(this, 'a', c.label, { href: c.href || '#' })
    }
    const o = _.merge(_.cloneDeep(itemOpts), { class: ['breadcrumb-item'] })
    if (isActive) {
      o.class.push('active')
      o.ariaCurrent = 'page'
    }
    items.push(misc.call(this, 'li', c, o))
  })
  const olEl = misc.call(this, 'ol', items, olOpts)
  opts.content = [olEl]
  if (opts.divider) opts.style._bsBreadcrumbDivider = opts.divider.startsWith('url(') ? opts.divider : `'${opts.divider}'`
  return util.write(_.omit(opts, ['divider']))
}
