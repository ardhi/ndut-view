const colors = require('./_color.json')
const button = require('./button')
const closeButton = require('./close-button')
const icon = require('./icon')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper

  opts = util.prep('div', content, opts)
  opts.class = util.normalizeArray(opts.class, { common: ['alert'] })
  opts.role = 'alert'
  if (opts.color && colors.includes(opts.color)) opts.class.push(`alert-${opts.color}`)
  if (opts.dismissible) {
    opts.class.push('alert-dismissible fade show')
    opts.content.push(closeButton.call(this, { dataBsDismiss: 'alert' }))
  }
  if (opts.icon) {
    iconEl = icon.call(this, opts.icon)
    opts.content.unshift(iconEl)
  }
  return util.write(_.omit(opts, ['color', 'dismissible', 'icon']))
}
