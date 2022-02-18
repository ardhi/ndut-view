const button = require('./button')

module.exports = function (content, opts = {}) {
  const { _ } = this.ndut.helper
  const { util } = this.ndutView.helper

  opts = util.prep(null, content, opts)
  opts.ariaLabel = opts.ariaLabel || 'Close'
  if (opts.white) opts.class.push('btn-close-white')
  return button.call(this, [], _.omit(opts, ['white']), { common: ['btn-close'] })
}
