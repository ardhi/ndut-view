const colors = require('./_color.json')

module.exports = function (content, opts = {}, ext = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper
  opts = util.prep(opts.el || 'button', content, opts)
  const ttOpts = util.filterOpts('tooltip', opts)
  if (opts.label) opts.content = [opts.label]
  ext.common = ext.common || ['btn']
  opts.class = util.normalizeArray(opts.class, { common: ext.common })
  if (opts.active) opts.class.push('active')
  if (opts.noWrap) opts.class.push('text-nowrap')
  if (opts.el === 'a') {
    opts.role = 'button'
    opts.href = opts.href || '#'
    if (opts.disabled) {
      delete opts.disabled
      delete opts.href
      opts.class.push('disabled')
      opts.ariaDisabled = 'true'
      opts.tabIndex = '-1'
    }
  } else {
    opts.type = opts.type || 'button'
  }
  if (opts.tooltip) {
    opts.dataBsToggle = 'tooltip'
    opts.title = opts.tooltip
    opts.dataBsPlacement = ttOpts.placement
  }
  if (_.isPlainObject(opts.content)) opts.content = []
  return util.write(_.omit(opts, ['noWrap', 'active', 'label', 'tooltip']))
}
