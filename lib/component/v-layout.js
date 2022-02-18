const label = require('./label')

module.exports = function (content, opts = {}, ext = {}) {
  const { util } = this.ndutView.helper
  opts = util.prep('div', content, opts)
  opts.class = util.normalizeArray(opts.class, { default: 'mb-3' })
  const labelOpts = util.filterOpts('label', opts)
  labelOpts.class.unshift('form-label')
  const labelEl = label.call(this, labelOpts)
  opts.content.unshift(labelEl)
  return util.write(opts)
}
