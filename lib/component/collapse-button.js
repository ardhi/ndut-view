const misc = require('./_misc')
const button = require('./button')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper

  opts = util.prep(null, content, opts)
  if (opts.tag === 'a') opts.href = '#' + opts.targetId
  else opts.dataBsTarget = '#' + opts.targetId
  opts.dataBsToggle = 'collapse'
  opts.ariaExpanded = false
  opts.ariaControls = opts.targetId
  return button.call(this, null, _.omit(opts, ['targetId']))
}
